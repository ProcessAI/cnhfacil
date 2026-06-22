import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const AlunoController = {
  // 1. LISTAR: Busca todos os alunos trazendo junto os dados de Usuário
  async listar(req: Request, res: Response) {
    try {
      const alunos = await prisma.aluno.findMany({
        include: {
          usuario: true // Traz junto nome, email, cpf, etc.
        }
      });
      return res.status(200).json(alunos);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar alunos' });
    }
  },

  // 2. BUSCAR POR ID: Busca um aluno específico pelo ID
  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const aluno = await prisma.aluno.findUnique({
        where: { aluno_id: Number(id) },
        include: { usuario: true }
      });

      if (!aluno) {
        return res.status(404).json({ erro: 'Aluno não encontrado' });
      }

      return res.status(200).json(aluno);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar aluno' });
    }
  },

  // 3. CRIAR: Cadastra o Usuário e o Aluno ao mesmo tempo na mesma tacada
  async criar(req: Request, res: Response) {
    try {
      const { 
        usuario_nome, 
        usuario_cpf, 
        usuario_email, 
        usuario_senha, 
        usuario_telefone,
        aluno_data_nascimento,
        aluno_categoria_pretendida
      } = req.body;

      // O Prisma permite criar o Usuário e o Aluno juntos para garantir a consistência
      const novoAluno = await prisma.aluno.create({
        data: {
          aluno_data_nascimento: new Date(aluno_data_nascimento), // Garante o formato de data
          aluno_categoria_pretendida,
          aluno_status_aluno: "ativo",
          usuario: {
            create: {
              usuario_nome,
              usuario_cpf,
              usuario_email,
              usuario_senha,
              usuario_nivel_acesso: "aluno", // Padrão para essa rota
              usuario_telefone
            }
          }
        },
        include: {
          usuario: true
        }
      });

      return res.status(201).json(novoAluno);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao cadastrar aluno' });
    }
  },

  // 4. ATUALIZAR: Atualiza os dados do Aluno e do Usuário vinculado
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { usuario_nome, usuario_email, usuario_telefone, aluno_categoria_pretendida, aluno_status_aluno } = req.body;

      const alunoAtualizado = await prisma.aluno.update({
        where: { aluno_id: Number(id) },
        data: {
          aluno_categoria_pretendida,
          aluno_status_aluno,
          usuario: {
            update: {
              usuario_nome,
              usuario_email,
              usuario_telefone
            }
          }
        },
        include: { usuario: true }
      });

      return res.status(200).json(alunoAtualizado);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao atualizar aluno' });
    }
  },

  // 5. DELETAR: Apaga o aluno (O onDelete: Cascade no schema vai apagar o Usuário automaticamente)
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.aluno.delete({
        where: { aluno_id: Number(id) }
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao deletar aluno' });
    }
  }
};