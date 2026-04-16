import { Router } from 'express';
import MedicamentosController from '../controllers/medicamentos.controller.js';
import { verificarToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verificarToken, MedicamentosController.getAll);

export default router;