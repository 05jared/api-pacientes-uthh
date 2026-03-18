import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/pacientes.controller.js';

const router = Router();

router.get('/', ctrl.getPacientes);
router.get('/:id', ctrl.getPacienteById);
router.post('/', verificarToken, ctrl.createPaciente);
router.put('/:id', verificarToken, ctrl.updatePaciente);
router.delete('/:id', verificarToken, ctrl.deletePaciente);

export default router;