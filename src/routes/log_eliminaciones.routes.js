import { Router } from 'express';
import * as ctrl from '../controllers/logs.controller.js';

const router = Router();

router.get('/', ctrl.getLogs);
router.delete('/:id', ctrl.deleteLog);

export default router;