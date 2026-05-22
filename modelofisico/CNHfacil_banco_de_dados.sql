-- ======================================================
-- 1. USUARIO ((G4) - Base para Admin, Aluno e Instrutor)
-- ======================================================
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    -- O nivel_acesso define quem é o ADMIN do sistema
    nivel_acesso VARCHAR(30) NOT NULL DEFAULT 'aluno', -- ex: 'admin', 'aluno', 'instrutor'
    telefone VARCHAR(15),
    foto_perfil VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================================================
-- 2. ESPECIALIZAÇÕES (Relacionamento 1:1)
-- ======================================================

-- ALUNO (G3)
CREATE TABLE aluno (
    id_usuario_aluno INT PRIMARY KEY,
    data_nascimento DATE NOT NULL,
    categoria_pretendida VARCHAR(5) NOT NULL,
    status_aluno VARCHAR(20) DEFAULT 'ativo',
    CONSTRAINT fk_aluno_login FOREIGN KEY (id_usuario_aluno) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- INSTRUTOR (G1)
CREATE TABLE instrutor (
    id_usuario_instrutor INT PRIMARY KEY,
    numero_credencial VARCHAR(30) NOT NULL UNIQUE,
    categoria_cnh VARCHAR(5) NOT NULL,
    valor_aula DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_instrutor_login FOREIGN KEY (id_usuario_instrutor) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- ======================================================
-- 3. SIMULADO E QUESTÕES (G2)
-- ======================================================
CREATE TABLE simulado (
    id_simulado SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    nota_minima DECIMAL(5,2) NOT NULL
);

CREATE TABLE questao (
    id_questao SERIAL PRIMARY KEY,
    id_simulado INT NOT NULL,
    enunciado TEXT NOT NULL,
    
    -- Alternativas categorizadas como colunas na mesma tabela
    alternativa_a TEXT NOT NULL,
    alternativa_b TEXT NOT NULL,
    alternativa_c TEXT NOT NULL,
    alternativa_d TEXT NOT NULL,
    
    -- Define qual letra é a correta
    letra_correta CHAR(1) NOT NULL CHECK (letra_correta IN ('A', 'B', 'C', 'D')),
    
    categoria VARCHAR(50), 
    CONSTRAINT fk_questao_simulado FOREIGN KEY (id_simulado) REFERENCES simulado(id_simulado) ON DELETE CASCADE
);
-- ======================================================
-- 4. RELACIONAMENTOS N:N (Tabelas Intermediárias)
-- ======================================================

-- CURSO (G4)
CREATE TABLE curso (
    id_curso SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    carga_horaria INT NOT NULL,
    valor DECIMAL(10,2)
);

-- ALUNO_CURSO (Matrícula) (G4)
CREATE TABLE aluno_curso (
    id_aluno INT NOT NULL,
    id_curso INT NOT NULL,
    data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_aluno, id_curso),
    CONSTRAINT fk_ac_aluno FOREIGN KEY (id_aluno) REFERENCES aluno(id_usuario_aluno),
    CONSTRAINT fk_ac_curso FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
);

-- ALUNO_SIMULADO (Resultados dos testes) (G2)
CREATE TABLE aluno_simulado (
    id_aluno INT NOT NULL,
    id_simulado INT NOT NULL,
    nota_obtida DECIMAL(5,2),
    data_realizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_aluno, id_simulado),
    CONSTRAINT fk_as_aluno FOREIGN KEY (id_aluno) REFERENCES aluno(id_usuario_aluno),
    CONSTRAINT fk_as_simulado FOREIGN KEY (id_simulado) REFERENCES simulado(id_simulado)
);
-- ======================================================
-- 5. VEÍCULOS E AULAS (G1 e G4)
-- ======================================================

--VEÍCULOS (G1)
CREATE TABLE veiculo (
    id_veiculo SERIAL PRIMARY KEY,
    id_instrutor INT NOT NULL,
    placa CHAR(7) UNIQUE NOT NULL,
    marca_modelo VARCHAR(100),
    CONSTRAINT fk_veiculo_instrutor FOREIGN KEY (id_instrutor) REFERENCES instrutor(id_usuario_instrutor)
);

-- AULAS (G4)
CREATE TABLE aula (
    id_aula SERIAL PRIMARY KEY,
    id_curso INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    ordem INT NOT NULL,
    conteudo_texto TEXT,
    url_video VARCHAR(255),
    arquivo_slide VARCHAR(255),
    arquivo_pdf VARCHAR(255),
    material_complementar VARCHAR(255),
    miniatura VARCHAR(255),
    duracao_minutos INT,
    status_aula VARCHAR(20) DEFAULT 'publicada',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_aula_curso FOREIGN KEY (id_curso) REFERENCES curso(id_curso) ON DELETE CASCADE
);