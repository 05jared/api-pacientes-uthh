import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/diagnostico.controller.js';

const router = Router();

router.get('/', ctrl.getDiagnosticos);
router.post('/', verificarToken, ctrl.createDiagnostico);
router.put('/:id', verificarToken, ctrl.updateDiagnostico);
router.delete('/:id', verificarToken, ctrl.deleteDiagnostico);

export default router;