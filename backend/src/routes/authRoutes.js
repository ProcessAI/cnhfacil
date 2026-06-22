import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// ROTA PÚBLICA: Para fazer o login
router.post('/login', login);

export default router;