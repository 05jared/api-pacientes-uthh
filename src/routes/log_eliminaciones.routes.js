import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/log_eliminaciones.controller.js';

const router = Router();

router.get('/', ctrl.getLogs);
router.delete('/:id', verificarToken, ctrl.deleteLog);

export default router;