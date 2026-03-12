import { Router } from 'express';
import * as ctrl from '../controllers/noticias.controller.js';

const router = Router();

router.get('/', ctrl.getNoticias);
router.post('/', ctrl.createNoticia);

export default router;