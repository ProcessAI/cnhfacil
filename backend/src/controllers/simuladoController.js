import { PrismaClient } from '@prisma/client';
import { questoes as questoesMock, historicoSimulados } from '../dadosMockados.js';

const prisma = new PrismaClient();

const normalizeString = (value) =>
    value?.toString()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[^a-z0-9]/gi, '')
        .toLowerCase() || '';

// Embaralha array (Fisher-Yates)
const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

// -------------------------------------------------------
// POST /api/simulados/gerar   (rota canonica)
// POST /api/simulados/iniciar (alias - mesmo handler)
// -------------------------------------------------------
export const gerarSimulado = async (req, res) => {
    const { tipo, materia, quantidade } = req.body;
    const qtd = Number(quantidade) || 10;

    const materiaAliases = {
        legislacao: 'Legislação de Trânsito',
        defensiva: 'Direção Defensiva',
        socorros: 'Primeiros Socorros',
        ambiente: 'Meio Ambiente e Cidadania',
        mecanica: 'Mecânica Básica',
        geral: 'Geral',
    };

    const materiaBusca = materia
        ? materiaAliases[normalizeString(materia)] || materia
        : materia;

    try {
        // Tenta buscar questões do banco
        let questoesBanco = await prisma.questao.findMany();

        // Fallback para mockados se o banco estiver vazio
        if (questoesBanco.length === 0) {
            questoesBanco = questoesMock.map(q => ({
                questao_id: q.id,
                questao_enunciado: q.text,
                questao_alternativa_a: q.options[0],
                questao_alternativa_b: q.options[1],
                questao_alternativa_c: q.options[2],
                questao_alternativa_d: q.options[3],
                questao_letra_correta: ['a', 'b', 'c', 'd'][q.correctAnswer],
                questao_categoria: q.theme,
                simulado_id: null,
            }));
        }

        // Filtra por matéria se necessário
        if ((tipo === 'materia' || tipo === 'desafio') && materiaBusca) {
            const buscaNormalizada = normalizeString(materiaBusca);
            questoesBanco = questoesBanco.filter(q => {
                const categoria = normalizeString(q.questao_categoria || q.theme || '');
                return categoria === buscaNormalizada
                    || categoria.includes(buscaNormalizada)
                    || buscaNormalizada.includes(categoria)
            });
        }

        if (questoesBanco.length === 0) {
            return res.status(400).json({ erro: 'Não foram encontradas questões para os critérios informados.' });
        }

        const embaralhadas = shuffleArray(questoesBanco).slice(0, qtd);

        // Remove gabarito antes de enviar ao frontend
        const questoesSanitizadas = embaralhadas.map(q => ({
            id: q.questao_id,
            text: q.questao_enunciado,
            theme: q.questao_categoria,
            options: [
                q.questao_alternativa_a,
                q.questao_alternativa_b,
                q.questao_alternativa_c,
                q.questao_alternativa_d,
            ],
        }));

        return res.json({
            simuladoId: Math.floor(Math.random() * 1000000),
            tipo: tipo || 'geral',
            materia: tipo === 'materia' ? materia : 'Geral',
            quantidadeQuestoes: questoesSanitizadas.length,
            questoes: questoesSanitizadas,
        });
    } catch (erro) {
        console.error('Erro ao gerar simulado:', erro);
        return res.status(500).json({ erro: 'Erro ao gerar o simulado.' });
    }
};

// -------------------------------------------------------
// POST /api/simulados/enviar  (rota original, mantida)
// POST /api/simulado/finalizar (alias para o frontend)
// -------------------------------------------------------
export const enviarSimulado = async (req, res) => {
    const { respostas, materia } = req.body;

    if (!respostas || !Array.isArray(respostas)) {
        return res.status(400).json({ erro: 'O corpo da requisição deve conter a lista de respostas em formato array.' });
    }

    try {
        // Busca questões do banco para corrigir
        const ids = respostas.map(r => Number(r.questionId));
        let questoesBanco = await prisma.questao.findMany({
            where: { questao_id: { in: ids } },
        });

        // Fallback para mockados se o banco não tiver as questões
        if (questoesBanco.length === 0) {
            questoesBanco = questoesMock
                .filter(q => ids.includes(q.id))
                .map(q => ({
                    questao_id: q.id,
                    questao_enunciado: q.text,
                    questao_alternativa_a: q.options[0],
                    questao_alternativa_b: q.options[1],
                    questao_alternativa_c: q.options[2],
                    questao_alternativa_d: q.options[3],
                    questao_letra_correta: ['a', 'b', 'c', 'd'][q.correctAnswer],
                    questao_categoria: q.theme,
                }));
        }

        let acertos = 0;
        const total = respostas.length;
        const letras = ['a', 'b', 'c', 'd'];

        const feedback = respostas.map(resp => {
            const questao = questoesBanco.find(q => q.questao_id === Number(resp.questionId));
            if (!questao) return { questionId: resp.questionId, erro: 'Questão não encontrada.' };

            const indexCorreta = letras.indexOf(questao.questao_letra_correta);
            const correto = indexCorreta === resp.selectedOption;
            if (correto) acertos++;

            return {
                questionId: questao.questao_id,
                theme: questao.questao_categoria,
                text: questao.questao_enunciado,
                options: [
                    questao.questao_alternativa_a,
                    questao.questao_alternativa_b,
                    questao.questao_alternativa_c,
                    questao.questao_alternativa_d,
                ],
                userOption: resp.selectedOption,
                correctOption: indexCorreta,
                wasCorrect: correto,
            };
        });

        const notaPercent = total > 0 ? Math.round((acertos / total) * 100) : 0;
        const aprovado = notaPercent >= 70;

        // Agrega acertos/total por categoria a partir do feedback questão a questão
        const porCategoria = {};
        feedback.forEach(f => {
            if (f.erro) return;
            const cat = (f.theme || 'Geral').trim();
            if (!porCategoria[cat]) porCategoria[cat] = { acertos: 0, total: 0 };
            porCategoria[cat].total++;
            if (f.wasCorrect) porCategoria[cat].acertos++;
        });

        // Tenta persistir no banco de dados se o usuário estiver autenticado
        const usuarioId = req.usuarioId ? Number(req.usuarioId) : null;
        if (usuarioId) {
            try {
                // Mapeia alias da URL (ex: 'legislacao') para o nome completo da categoria
                const materiaAliasesEnviar = {
                    legislacao: 'Legislação de Trânsito',
                    defensiva: 'Direção Defensiva',
                    socorros: 'Primeiros Socorros',
                    ambiente: 'Meio Ambiente e Cidadania',
                    mecanica: 'Mecânica Básica',
                    geral: 'Geral',
                };
                const categoriaSimulado = materiaAliasesEnviar[normalizeString(materia)] || materia || 'Geral';
                // Busca ou cria um registro de Simulado com o nome exato da categoria
                let simuladoDb = await prisma.simulado.findFirst({
                    where: { simulado_titulo: categoriaSimulado }
                });
                if (!simuladoDb) {
                    simuladoDb = await prisma.simulado.create({
                        data: {
                            simulado_titulo: categoriaSimulado,
                            simulado_nota_minima: 70,
                        }
                    });
                }
                // Garante que o aluno existe na tabela aluno
                const alunoExistente = await prisma.aluno.findUnique({ where: { aluno_id: usuarioId } });
                if (!alunoExistente) {
                    await prisma.aluno.create({
                        data: { aluno_id: usuarioId, aluno_data_nascimento: new Date('2000-01-01'), aluno_categoria_pretendida: 'B' }
                    });
                }
                await prisma.alunoSimulado.upsert({
                    where: { aluno_id_simulado_id: { aluno_id: usuarioId, simulado_id: simuladoDb.simulado_id } },
                    update: {
                        aluno_simulado_nota_obtida: notaPercent,
                        aluno_simulado_acertos: acertos,
                        aluno_simulado_total: total,
                        aluno_simulado_data_realizacao: new Date(),
                        aluno_simulado_tentativas: { increment: 1 },
                    },
                    create: {
                        aluno_id: usuarioId,
                        simulado_id: simuladoDb.simulado_id,
                        aluno_simulado_nota_obtida: notaPercent,
                        aluno_simulado_acertos: acertos,
                        aluno_simulado_total: total,
                        aluno_simulado_tentativas: 1,
                        aluno_simulado_data_realizacao: new Date(),
                    }
                });

                // Persiste acertos/total por categoria (acumulativo)
                for (const [cat, stats] of Object.entries(porCategoria)) {
                    await prisma.alunoCategoriaDesempenho.upsert({
                        where: { aluno_id_categoria: { aluno_id: usuarioId, categoria: cat } },
                        update: {
                            acertos: { increment: stats.acertos },
                            total:   { increment: stats.total },
                        },
                        create: {
                            aluno_id: usuarioId,
                            categoria: cat,
                            acertos: stats.acertos,
                            total: stats.total,
                        },
                    });
                }
            } catch (errDb) {
                // Fallback: salva em memória se o banco falhar
                const nextId = historicoSimulados.length > 0
                    ? Math.max(...historicoSimulados.map(h => h.id)) + 1
                    : 1;
                historicoSimulados.push({
                    id: nextId,
                    data: new Date().toLocaleDateString('pt-BR'),
                    acertos,
                    total,
                    notaPercent,
                    categoria: materia || 'Geral',
                });
                console.warn('Fallback in-memory: não foi possível persistir simulado no banco.', errDb.message);
            }
        } else {
            // Sem autenticação: salva em memória
            const nextId = historicoSimulados.length > 0
                ? Math.max(...historicoSimulados.map(h => h.id)) + 1
                : 1;
            historicoSimulados.push({
                id: nextId,
                data: new Date().toLocaleDateString('pt-BR'),
                acertos,
                total,
                notaPercent,
                categoria: materia || 'Geral',
            });
        }

        return res.json({
            mensagem: aprovado
                ? 'Parabéns, você foi aprovado no simulado!'
                : 'Infelizmente você não atingiu a nota mínima para aprovação.',
            acertos,
            total,
            notaPercent,
            aprovado,
            feedback,
        });
    } catch (erro) {
        console.error('Erro ao enviar simulado:', erro);
        return res.status(500).json({ erro: 'Erro ao corrigir o simulado.' });
    }
};

