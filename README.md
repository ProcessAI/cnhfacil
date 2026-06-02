# cnhfacil
Portal para conquistar sua CNH

## Estrutura

```
projeto-cnh/
├── docs/
│   ├── requisitos/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   └── models/
    └── package.json
```

## Legenda

| Pasta/Arquivo | Descrição |
|---|---|
| `docs/requisitos/` | Requisitos funcionais por entidade |
| `frontend/public/` | Arquivos estáticos (favicon, imagens) |
| `frontend/src/components/` | Componentes reutilizáveis (botões, inputs, cards) |
| `frontend/src/pages/` | Telas completas (Login, Cadastro, Dashboard) |
| `frontend/src/App.jsx` | Componente raiz e definição de rotas |
| `backend/src/controllers/` | Lógica de negócio de cada rota |
| `backend/src/routes/` | Definição dos endpoints da API |
| `backend/src/models/` | Estrutura dos dados (Aluno, Instrutor, Aula) |
