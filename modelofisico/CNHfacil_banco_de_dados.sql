-- ======================================================
-- 1. USUARIO ((G4) - Base para Admin, Aluno e Instrutor)
-- ======================================================
CREATE TABLE usuario (
    usuario_id SERIAL PRIMARY KEY, -- PK Padronizada
    usuario_nome VARCHAR(100) NOT NULL,
    usuario_cpf CHAR(11) NOT NULL UNIQUE,
    usuario_email VARCHAR(150) NOT NULL UNIQUE,
    usuario_senha VARCHAR(255) NOT NULL,
    usuario_nivel_acesso VARCHAR(30) NOT NULL DEFAULT 'aluno',
    usuario_telefone VARCHAR(15),
    usuario_foto_perfil VARCHAR(255),
    usuario_criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================================================
-- 2. ESPECIALIZAÇÕES (Relacionamento 1:1)
-- ======================================================

-- ALUNO (G3)
CREATE TABLE aluno (
    aluno_id INT PRIMARY KEY, -- PK que também é FK de usuario
    aluno_data_nascimento DATE NOT NULL,
    aluno_categoria_pretendida VARCHAR(5) NOT NULL,
    aluno_status_aluno VARCHAR(20) DEFAULT 'ativo',
    CONSTRAINT fk_aluno_usuario FOREIGN KEY (aluno_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE
);

-- INSTRUTOR (G1)
CREATE TABLE instrutor (
    instrutor_id INT PRIMARY KEY, -- PK que também é FK de usuario
    instrutor_numero_credencial VARCHAR(30) NOT NULL UNIQUE,
    instrutor_categoria_cnh VARCHAR(5) NOT NULL,
    instrutor_valor_aula DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_instrutor_usuario FOREIGN KEY (instrutor_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE
);

-- ======================================================
-- 3. SIMULADO E QUESTÕES (G2)
-- ======================================================
CREATE TABLE simulado (
    simulado_id SERIAL PRIMARY KEY,
    simulado_titulo VARCHAR(100) NOT NULL,
    simulado_nota_minima DECIMAL(5,2) NOT NULL
);

CREATE TABLE questao (
    questao_id SERIAL PRIMARY KEY,
    simulado_id INT NOT NULL, -- FK apontando para a PK de simulado
    questao_enunciado TEXT NOT NULL,
    
    -- Alternativas
    questao_alternativa_a TEXT NOT NULL,
    questao_alternativa_b TEXT NOT NULL,
    questao_alternativa_c TEXT NOT NULL,
    questao_alternativa_d TEXT NOT NULL,
    
    questao_letra_correta CHAR(1) NOT NULL CHECK (questao_letra_correta IN ('A', 'B', 'C', 'D')),
    questao_categoria VARCHAR(50), 
    CONSTRAINT fk_questao_simulado FOREIGN KEY (simulado_id) REFERENCES simulado(simulado_id) ON DELETE CASCADE
);

-- ======================================================
-- 4. RELACIONAMENTOS N:N (Tabelas Intermediárias)
-- ======================================================

-- CURSO (G4)
CREATE TABLE curso (
    curso_id SERIAL PRIMARY KEY,
    curso_titulo VARCHAR(100) NOT NULL,
    curso_carga_horaria INT NOT NULL,
    curso_valor DECIMAL(10,2)
);

-- ALUNO_CURSO (Matrícula) (G4)
CREATE TABLE aluno_curso (
    aluno_id INT NOT NULL, -- FK apontando para aluno
    curso_id INT NOT NULL, -- FK apontando para curso
    aluno_curso_data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (aluno_id, curso_id),
    CONSTRAINT fk_ac_aluno FOREIGN KEY (aluno_id) REFERENCES aluno(aluno_id),
    CONSTRAINT fk_ac_curso FOREIGN KEY (curso_id) REFERENCES curso(curso_id)
);

-- ALUNO_SIMULADO (Resultados dos testes) (G2)
CREATE TABLE aluno_simulado (
    aluno_id INT NOT NULL,    -- FK apontando para aluno
    simulado_id INT NOT NULL, -- FK apontando para simulado
    aluno_simulado_nota_obtida DECIMAL(5,2),
    aluno_simulado_data_realizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (aluno_id, simulado_id),
    CONSTRAINT fk_as_aluno FOREIGN KEY (aluno_id) REFERENCES aluno(aluno_id),
    CONSTRAINT fk_as_simulado FOREIGN KEY (simulado_id) REFERENCES simulado(simulado_id)
);

-- ======================================================
-- 5. VEÍCULOS E AULAS (G1 e G4)
-- ======================================================

-- VEÍCULOS (G1)
CREATE TABLE veiculo (
    veiculo_id SERIAL PRIMARY KEY,
    instrutor_id INT NOT NULL, -- FK apontando para instrutor
    veiculo_placa CHAR(7) UNIQUE NOT NULL,
    veiculo_marca_modelo VARCHAR(100),
    CONSTRAINT fk_veiculo_instrutor FOREIGN KEY (instrutor_id) REFERENCES instrutor(instrutor_id)
);

-- AULAS (G4)
CREATE TABLE aula (
    aula_id SERIAL PRIMARY KEY,
    curso_id INT NOT NULL, -- FK apontando para curso
    aula_titulo VARCHAR(100) NOT NULL,
    aula_descricao TEXT,
    aula_ordem INT NOT NULL,
    aula_conteudo_texto TEXT,
    aula_url_video VARCHAR(255),
    aula_arquivo_slide VARCHAR(255),
    aula_arquivo_pdf VARCHAR(255),
    aula_material_complementar VARCHAR(255),
    aula_miniatura VARCHAR(255),
    aula_duracao_minutos INT,
    aula_status_aula VARCHAR(20) DEFAULT 'publicada',
    aula_criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    aula_atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_aula_curso FOREIGN KEY (curso_id) REFERENCES curso(curso_id) ON DELETE CASCADE
);
