import alunoRoutes from './routes/alunoRoutes';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import usuarioRoutes from './routes/usuarioRoutes'
import express from 'express';


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/alunos', usuarioRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const port = Number(process.env.PORT ?? 4000)
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`)
})
