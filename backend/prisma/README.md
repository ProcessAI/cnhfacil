# Padrão Prisma para o backend

Este diretório centraliza a configuração do Prisma para o backend.

## Estrutura padrão

- `schema.prisma` - modelo do banco de dados e fonte de dados
- `seed.ts` - script de seed para popular dados iniciais
- `README.md` - documentação sobre uso e convenções

## Como usar

1. Copie `.env.example` para `.env`
2. Ajuste `DATABASE_URL`
3. Rode `npm install`
4. Rode `npm run prisma:generate`
5. Rode `npm run prisma:migrate`
6. Rode `npm run prisma:seed`

## Convenções adotadas

- `prisma/schema.prisma` com `generator client` e `datasource db`
- `@prisma/client` em `dependencies`
- `prisma` em `devDependencies`
- seed com `prisma/seed.ts`
- scripts npm para `generate`, `migrate`, `studio`, `format` e `seed`
