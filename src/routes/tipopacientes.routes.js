import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/tipopacientes.controller.js';

const router = Router();

router.get('/', ctrl.getTipoPacientes);
router.post('/', verificarToken, ctrl.createTipoPaciente);
router.put('/:id', verificarToken, ctrl.updateTipoPaciente);
router.delete('/:id', verificarToken, ctrl.deleteTipoPaciente);

export default router;