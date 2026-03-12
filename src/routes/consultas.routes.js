import { Router } from 'express';
import * as ctrl from '../controllers/consultas.controller.js';

const router = Router();

router.get('/', ctrl.getConsultas);
router.post('/', ctrl.createConsulta);

export default router;
