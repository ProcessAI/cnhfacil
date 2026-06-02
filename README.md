# cnhfacil
Portal para conquistar sua CNH

## Estrutura

frontend/
├── public/            → Arquivos estáticos (favicon, imagens)
├── src/
│   ├── components/    → Componentes reutilizáveis (botões, inputs, cards)
│   ├── pages/         → Telas completas (Login, Cadastro, Dashboard)
│   └── App.jsx        → Componente raiz e definição de rotas
└── package.json       → Dependências e scripts do projeto

backend/
├── src/
│   ├── controllers/   → Lógica de negócio de cada rota
│   ├── routes/        → Definição dos endpoints da API
│   └── models/        → Estrutura dos dados (Aluno, Instrutor, Aula)
└── package.json       → Dependências e scripts do projeto

docs/
├── requisitos/
