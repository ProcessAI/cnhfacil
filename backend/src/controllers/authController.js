import jwt from 'jsonwebtoken';
// DEIXE COMENTADO ATÉ PEGAR O BANCO
// import pkg from '@prisma/client';
// import bcrypt from 'bcrypt';
// const { PrismaClient } = pkg;
// const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'chave_super_secreta_cnhfacil';

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // ==========================================
    // MODO "MOCK" (SEM BANCO) - ATIVO AGORA
    // ==========================================
    if (email === 'admin@cnhfacil.com' && senha === '123456') {
      const token = jwt.sign(
        { id_usuario: 1, cargo: 'ADMIN' },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.json({
        mensagem: 'Login mockado bem-sucedido',
        token,
        usuario: {
          id: 1,
          nome: 'Administrador Chefe (Mock)',
          email: 'admin@cnhfacil.com',
          cargo: 'ADMIN'
        }
      });
    } else {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }
    
    /*
     ==========================================
     MODO REAL (COM BANCO E PRISMA) - DESCOMENTAR ao conseguir conectar ao banco
     ==========================================
    
    const usuario = await prisma.usuario.findUnique({ 
      where: { email: email } 
    });

    if (!usuario) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaValida) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, cargo: usuario.cargo },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      mensagem: 'Login bem-sucedido',
      token,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo
      }
    });
    */

  } catch (erro) {
    console.error('Erro no login:', erro);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
};