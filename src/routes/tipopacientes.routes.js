import { Router } from 'express';
import * as ctrl from '../controllers/tipopacientes.controller.js';

const router = Router();

router.get('/', ctrl.getTipoPacientes);
router.post('/', ctrl.createTipoPaciente);
router.put('/:id', ctrl.updateTipoPaciente);
router.delete('/:id', ctrl.deleteTipoPaciente);

export default router;