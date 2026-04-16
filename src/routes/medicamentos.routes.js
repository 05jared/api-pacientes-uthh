import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/medicamentos.controller.js';

const router = Router();

router.get('/', ctrl.getMedicamentos);

export default router;