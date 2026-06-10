import pkg from '@prisma/client';
import bcrypt from 'bcrypt';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();


async function main() {
  // Criptografa a senha "123456"
  const senhaCriptografada = await bcrypt.hash('123456', 10);

  // Cria o administrador no banco de dados
  const admin = await prisma.usuario.create({
    data: {
      nome: 'Administrador Chefe',
      cpf: '11122233344',
      email: 'admin@cnhfacil.com',
      senha: senhaCriptografada,
      telefone: '61999999999',
      cargo: 'ADMIN',
      status_usuario: 'ativo'
    }
  });

  console.log('✅ Admin criado com sucesso! E-mail:', admin.email);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });