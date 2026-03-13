import { Router } from 'express';
import * as ctrl from '../controllers/consultas.controller.js';

const router = Router();

router.get('/', ctrl.getConsultas);
router.post('/', ctrl.createConsulta);
router.put('/:id', ctrl.updateConsulta);
router.delete('/:id', ctrl.deleteConsulta);

export default router;