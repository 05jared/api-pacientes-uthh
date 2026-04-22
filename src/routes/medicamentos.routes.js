import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/medicamentos.controller.js';

const router = Router();

router.get('/', ctrl.getMedicamentos);
router.get('/con-datos', ctrl.getMedicamentosConDatos);        // ← primero
router.put('/:clave/stock', verificarToken, ctrl.updateStock); // ← después

export default router;