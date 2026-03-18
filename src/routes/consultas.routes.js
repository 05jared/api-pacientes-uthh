import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/consultas.controller.js';

const router = Router();

router.get('/', ctrl.getConsultas);
router.get('/:id', ctrl.getConsultaById);
router.post('/', verificarToken, ctrl.createConsulta);
router.put('/:id', verificarToken, ctrl.updateConsulta);
router.delete('/:id', verificarToken, ctrl.deleteConsulta);

export default router;