import { Router } from 'express';
import * as ctrl from '../controllers/diagnostico.controller.js';

const router = Router();

router.get('/', ctrl.getDiagnosticos);
router.post('/', ctrl.createDiagnostico);
router.put('/:id', ctrl.updateDiagnostico);
router.delete('/:id', ctrl.deleteDiagnostico);

export default router;