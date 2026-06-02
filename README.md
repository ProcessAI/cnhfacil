# cnhfacil
Portal para conquistar sua CNH

## Estrutura

projeto-cnh/
├── docs/
│   ├── requisitos/
│   │   ├── cadastro-aluno.md
│   │   ├── cadastro-instrutor.md
│   │   └── cadastro-curso-aula.md
│   ├── modelo-conceitual.md
│   ├── modelo-fisico.md
│   ├── regras-obtencao-cnh.md
│   └── proposta-designer.md
├── frontend/
│   ├── public/            → Arquivos estáticos (favicon, imagens)
│   ├── src/
│   │   ├── components/    → Componentes reutilizáveis (botões, inputs, cards)
│   │   ├── pages/         → Telas completas (Login, Cadastro, Dashboard)
│   │   └── App.jsx        → Componente raiz e definição de rotas
│   └── package.json       → Dependências e scripts do projeto
└── backend/
    ├── src/
    │   ├── controllers/   → Lógica de negócio de cada rota
    │   ├── routes/        → Definição dos endpoints da API
    │   └── models/        → Estrutura dos dados (Aluno, Instrutor, Aula)
    └── package.json       → Dependências e scripts do projeto
