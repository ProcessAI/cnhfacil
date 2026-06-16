import { Router } from 'express'
import { UsuarioController } from '../controllers/UsuarioController'

const router = Router()
const controller = new UsuarioController()

router.post('/', controller.criarAluno.bind(controller))
router.get('/', controller.listarAlunosAtivos.bind(controller))

export default router
