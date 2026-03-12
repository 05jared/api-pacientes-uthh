import { Router } from 'express';
import * as ctrl from '../controllers/pacientes.controller.js';

const router = Router();

router.get('/', ctrl.getPacientes);
router.post('/', ctrl.createPaciente);

export default router;