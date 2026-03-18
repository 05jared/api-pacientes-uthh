import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/noticias.controller.js';

const router = Router();

router.get('/', ctrl.getNoticias);
router.post('/', verificarToken, ctrl.createNoticia);
router.put('/:id', verificarToken, ctrl.updateNoticia);
router.delete('/:id', verificarToken, ctrl.deleteNoticia);

export default router;