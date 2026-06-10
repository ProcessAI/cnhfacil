import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middlewares
app.use(cors()); // Permite que o Front-end faça requisições sem dar erro de CORS
app.use(express.json()); // Permite ler o corpo das requisições (req.body) em formato JSON

// Rotas
app.use('/api/auth', authRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});