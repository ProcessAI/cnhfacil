import { Router } from 'express';
import { AlunoController } from '../controllers/AlunoController';

const router = Router();

// Ligar as rotas às funções do Controller
router.get('/', AlunoController.listar);           // Puxa todos
router.get('/:id', AlunoController.buscarPorId);   // Puxa só um pelo ID
router.post('/', AlunoController.criar);           // Cria um novo
router.put('/:id', AlunoController.atualizar);     // Atualiza um existente
router.delete('/:id', AlunoController.deletar);    // Apaga um existente

export default router;