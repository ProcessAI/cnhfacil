# CNHFácil

Plataforma de preparação para o exame teórico da CNH. Alunos assistem vídeo-aulas, fazem simulados por tema e acompanham seu desempenho em tempo real. Instrutores são cadastrados pela própria plataforma e vinculados a veículos da frota.

> Repositório: https://github.com/ProcessAI/cnhfacil

---

## Sumário

- [Stack](#stack)
- [Estrutura do repositório](#estrutura-do-repositório)
- [1. Pré-requisitos](#1-pré-requisitos)
- [2. Baixando o projeto](#2-baixando-o-projeto)
- [3. Configurando e rodando o Backend](#3-configurando-e-rodando-o-backend)
- [4. Configurando e rodando o Frontend](#4-configurando-e-rodando-o-frontend)
- [5. Testando se funcionou](#5-testando-se-funcionou)
- [6. Para quem vai desenvolver](#6-para-quem-vai-desenvolver)
- [Conteúdo inicial do banco (seed)](#conteúdo-inicial-do-banco-seed)
- [Endpoints da API](#endpoints-da-api)
- [Scripts disponíveis](#scripts-disponíveis)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Troubleshooting](#troubleshooting)
- [Contribuindo](#contribuindo)

---

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | Node.js 18+ · Express 4 · Prisma ORM |
| Banco | PostgreSQL 14+ |
| Frontend | React 18 · Vite 5 · React Router 6 |
| Auth | JWT (Bearer token, 8 h) · bcryptjs |
| Docs | Swagger UI (`/api-docs`) |

## Estrutura do repositório

```
cnhfacil/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Modelos do banco
│   │   ├── seed.js              # Dados iniciais (usuários, cursos, questões)
│   │   └── migrations/          # Histórico de migrations
│   └── src/
│       ├── controllers/         # Lógica de negócio
│       ├── routes/              # Definição dos endpoints
│       ├── middlewares/         # Verificação de token JWT
│       ├── dadosMockados.js     # Fallback quando banco está vazio
│       └── index.js             # Entrada do servidor
└── frontend/
    └── src/
        ├── app/                 # App.jsx + rotas
        ├── components/          # PrivateRoute, Topbar
        ├── context/             # AuthContext (estado de autenticação)
        ├── layouts/             # MainLayout (sidebar + outlet)
        ├── pages/               # Uma pasta por tela
        └── services/api.js      # Cliente Axios com interceptores
```

---

## 1. Pré-requisitos

Antes de configurar o projeto, você precisa ter 3 ferramentas instaladas. Os passos abaixo cobrem **Windows, macOS e Linux**.

| Ferramenta | Versão mínima | Pra quê serve |
|---|---|---|
| **Git** | qualquer recente | baixar o código do repositório |
| **Node.js** | 18 ou superior | rodar o backend (Express) e o frontend (React/Vite) |
| **PostgreSQL** | 14 ou superior | banco de dados onde tudo é salvo |

### 1.1 Git

**Windows**
1. Baixe em https://git-scm.com/download/win
2. Execute o instalador, pode deixar todas as opções padrão (next, next, next, install)
3. Abra o **Git Bash** ou o **PowerShell/Terminal** pra confirmar: `git --version`

**macOS**
1. Abra o Terminal e digite `git --version` — se não tiver, o macOS oferece pra instalar as "Command Line Tools" automaticamente
2. Alternativa: via [Homebrew](https://brew.sh): `brew install git`

**Linux**
- Ubuntu/Debian: `sudo apt update && sudo apt install git`
- Fedora: `sudo dnf install git`
- Arch: `sudo pacman -S git`

### 1.2 Node.js (18+)

**Windows**
1. Baixe o instalador LTS em https://nodejs.org
2. Execute e siga o assistente (padrão já serve)
3. Confirme no terminal: `node -v` e `npm -v`

**macOS**
- Baixe em https://nodejs.org (instalador `.pkg`), ou
- Via Homebrew: `brew install node`

**Linux**
- Recomendado usar o **nvm** (gerenciador de versões), pra evitar versão antiga do repositório oficial:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  source ~/.bashrc
  nvm install 18
  nvm use 18
  ```

> Confirme sempre com `node -v` (precisa ser ≥ 18) e `npm -v`.

### 1.3 PostgreSQL (14+)

**Windows**
1. Baixe em https://www.postgresql.org/download/windows/
2. No instalador, defina uma senha para o usuário `postgres` — **anote essa senha**, você vai usar depois
3. Pode manter a porta padrão `5432`
4. Ao final, o serviço do PostgreSQL já fica rodando em segundo plano

**macOS**
- Via Homebrew (mais simples):
  ```bash
  brew install postgresql@14
  brew services start postgresql@14
  ```
- Ou baixe o instalador gráfico em https://postgresapp.com

**Linux**
- Ubuntu/Debian:
  ```bash
  sudo apt update
  sudo apt install postgresql postgresql-contrib
  sudo systemctl start postgresql
  sudo systemctl enable postgresql
  ```
- Defina uma senha pro usuário `postgres`:
  ```bash
  sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'sua_senha'"
  ```

> **Alternativa via Docker** (qualquer SO, se já tiver Docker instalado):
> ```bash
> docker run --name pg-cnhfacil -e POSTGRES_PASSWORD=sua_senha -p 5432:5432 -d postgres:14
> ```

---

## 2. Baixando o projeto

```bash
git clone https://github.com/ProcessAI/cnhfacil.git
cd cnhfacil
```

Isso cria a pasta `cnhfacil` com duas partes: `backend/` e `frontend/`.

---

## 3. Configurando e rodando o Backend

```bash
cd backend
npm install
```

Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

Edite `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/cnhfacil"
PORT=3000
JWT_SECRET="uma_chave_longa_e_aleatoria"
NODE_ENV=development
```

> Troque `SUA_SENHA` pela senha definida na instalação do PostgreSQL (passo 1.3).

Gere o cliente Prisma e aplique as migrations + seed (primeira vez):

```bash
npm run prisma:generate
npm run prisma:deploy
```

Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

✅ Backend disponível em **http://localhost:3000**
✅ Documentação Swagger em **http://localhost:3000/api-docs**

> Deixe esse terminal aberto rodando — você vai precisar de um **segundo terminal** pra rodar o frontend.

---

## 4. Configurando e rodando o Frontend

Abra um **novo terminal**:

```bash
cd cnhfacil/frontend
npm install
cp .env.example .env
npm run dev
```

O valor padrão de `VITE_API_URL` no `.env` já funciona localmente (aponta para `http://localhost:3000/api`).

✅ Frontend disponível em **http://localhost:5173**

---

## 5. Testando se funcionou

Acesse **http://localhost:5173** e entre com um dos usuários de teste criados pelo seed:

| Perfil | E-mail | Senha |
|---|---|---|
| Admin | admin@cnhfacil.com | admin123 |
| Aluno | aluno@cnhfacil.com | aluno123 |

Instrutores são cadastrados pela tela de **Cadastro**, selecionando "Sou Instrutor".

---

## 6. Para quem vai desenvolver

Além dos passos acima, é útil saber:

- **Swagger**: http://localhost:3000/api-docs — teste os endpoints da API sem precisar do frontend.
- **Hot reload**: tanto `npm run dev` do backend (nodemon) quanto do frontend (Vite) recarregam automaticamente ao salvar arquivos.
- **Mudou o `schema.prisma`?**
  ```bash
  npm run prisma:migrate     # cria uma nova migration
  npm run prisma:generate    # regenera o cliente do Prisma
  ```
- **Resetar apenas os dados de teste** (sem recriar o banco):
  ```bash
  npm run prisma:seed
  ```
- **Onde editar o quê:**
  - `backend/src/controllers/` → regras de negócio
  - `backend/src/routes/` → endpoints da API
  - `backend/src/middlewares/` → validação do token JWT
  - `frontend/src/pages/` → uma pasta por tela
  - `frontend/src/services/api.js` → cliente Axios (chamadas pra API)
- **Fluxo de contribuição** — veja a seção [Contribuindo](#contribuindo).

### Resumo rápido (depois de instalar Git/Node/Postgres)

```bash
git clone https://github.com/ProcessAI/cnhfacil.git
cd cnhfacil/backend
npm install
cp .env.example .env        # edite a senha do Postgres aqui
npm run prisma:generate
npm run prisma:deploy
npm run dev                 # deixa rodando

# em outro terminal:
cd cnhfacil/frontend
npm install
cp .env.example .env
npm run dev
```

Depois acesse **http://localhost:5173** 🚗

---

## Conteúdo inicial do banco (seed)

5 cursos teóricos com aulas em vídeo e texto:
- Legislação de Trânsito (5 aulas)
- Direção Defensiva (5 aulas)
- Noções de Mecânica (4 aulas)
- Meio Ambiente e Cidadania (4 aulas)
- Primeiros Socorros (4 aulas)

50 questões distribuídas em 5 módulos temáticos de simulado.

---

## Endpoints da API

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/login` | Login — retorna token JWT e dados do usuário |
| POST | `/api/auth/registro` | Cadastro de aluno ou instrutor |

### Perfil e Dashboard

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/perfil` | ✔ | Dados do perfil autenticado |
| PUT | `/api/perfil` | ✔ | Atualiza nome, e-mail, telefone ou senha |
| GET | `/api/perfil/dashboard` | ✔ | Métricas de progresso do aluno |
| GET | `/api/desempenho` | ✔ | Histórico de simulados e desempenho por matéria |

### Cursos e Aulas

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/aulas/cursos` | ✔ | Lista cursos com progresso do aluno |
| GET | `/api/aulas/curso/:id` | ✔ | Aulas de um curso com status (done/available/locked) |
| POST | `/api/aulas/:id/concluir` | ✔ | Marca aula como concluída |

### Simulados

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/simulados` | — | Lista simulados disponíveis |
| POST | `/api/simulados/iniciar` | — | Gera simulado (tipo: geral/desafio/materia) |
| POST | `/api/simulados/finalizar` | — | Corrige respostas e persiste resultado |

### Admin

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/admin/alunos` | ✔ | Lista todos os alunos com progresso |
| GET | `/api/admin/stats` | ✔ | Total de questões, alunos e data de atualização |

### Outros

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/questoes` | — | Lista questões (filtra por `?tema=`) |
| GET | `/api/instrutores` | ✔ | Lista instrutores cadastrados |
| GET | `/api/veiculos` | ✔ | Lista veículos da frota |

---

## Scripts disponíveis

### Backend (`cd backend`)

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia com nodemon (hot reload) |
| `npm start` | Inicia em modo produção |
| `npm run prisma:generate` | Regenera o cliente Prisma após mudanças no schema |
| `npm run prisma:migrate` | Cria nova migration (desenvolvimento) |
| `npm run prisma:deploy` | Aplica migrations + seed (primeira vez / CI) |
| `npm run prisma:seed` | Reexecuta apenas o seed |

### Frontend (`cd frontend`)

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento (Vite) |
| `npm run build` | Gera build de produção em `dist/` |
| `npm run preview` | Serve o build localmente para testar |

---

## Variáveis de ambiente

Copie os arquivos `.env.example` e preencha conforme seu ambiente. **Nunca versione o `.env` real.**

| Arquivo | Variável | Descrição |
|---|---|---|
| `backend/.env` | `DATABASE_URL` | String de conexão PostgreSQL |
| `backend/.env` | `PORT` | Porta do servidor (padrão: 3000) |
| `backend/.env` | `JWT_SECRET` | Chave para assinar tokens JWT |
| `backend/.env` | `NODE_ENV` | `development` ou `production` |
| `frontend/.env` | `VITE_API_URL` | URL base da API (padrão: `http://localhost:3000/api`) |

---

## Troubleshooting

**Cannot connect to database**
Verifique se o PostgreSQL está rodando e se `DATABASE_URL` está correto no `backend/.env`.

**Port 3000 already in use**
Troque o valor de `PORT` no `backend/.env` e ajuste `VITE_API_URL` no `frontend/.env`.

**`prisma generate` falhou**
Certifique-se de estar dentro da pasta `backend/` e que `npm install` foi executado.

**Tela de Admin não aparece no menu**
O link Admin só aparece para usuários com `usuario_nivel_acesso = 'admin'`. Use as credenciais de admin do seed ou atualize o campo diretamente no banco.

---

## Contribuindo

Este projeto usa um fluxo baseado em branches e Pull Requests:

1. Crie um branch a partir do `main`: `git checkout -b minha-feature`
2. Faça commits com mensagens claras
3. Abra um PR para `main` descrevendo o que foi alterado
4. Aguarde revisão antes do merge
