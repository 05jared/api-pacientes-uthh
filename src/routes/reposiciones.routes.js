import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/reposiciones.controller.js';

const router = Router();

router.get('/:clave',  verificarToken, ctrl.getReposiciones);
router.post('/',       verificarToken, ctrl.createReposicion);

export default router;