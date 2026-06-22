import { Request, Response } from 'express'
import { UsuarioService } from '../services/UsuarioService'

export class UsuarioController {
  private service = new UsuarioService()

  async criarAluno(req: Request, res: Response) {
    try {
      const usuario = await this.service.criarAluno(req.body)
      return res.status(201).json(usuario)
    } catch (error) {
      console.error(error)
      return res.status(400).json({
        error: 'Não foi possível criar o aluno',
        details: error instanceof Error ? error.message : String(error),
      })
    }
  }

  async listarAlunosAtivos(_req: Request, res: Response) {
    try {
      const alunos = await this.service.listarAlunosAtivos()
      return res.json(alunos)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: 'Não foi possível listar os alunos',
        details: error instanceof Error ? error.message : String(error),
      })
    }
  }
}
