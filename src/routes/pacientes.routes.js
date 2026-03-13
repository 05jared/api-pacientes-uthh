import { Router } from 'express';
import * as ctrl from '../controllers/pacientes.controller.js';

const router = Router();

router.get('/', ctrl.getPacientes);
router.post('/', ctrl.createPaciente);
router.put('/:id', ctrl.updatePaciente);
router.delete('/:id', ctrl.deletePaciente);

export default router;