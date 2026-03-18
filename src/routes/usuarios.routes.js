import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/', ctrl.getUsuarios);
router.post('/', verificarToken, ctrl.createUsuario);
router.put('/:id', verificarToken, ctrl.updateUsuario);
router.delete('/:id', verificarToken, ctrl.deleteUsuario);

export default router;