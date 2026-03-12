import { Router } from 'express';
import * as ctrl from '../controllers/diagnostico.controller.js';

const router = Router();

router.get('/', ctrl.getDiagnosticos);
router.post('/', ctrl.createDiagnostico);

export default router;