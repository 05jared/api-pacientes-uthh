import { Router } from 'express';
import * as ctrl from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/', ctrl.getUsuarios);
router.post('/', ctrl.createUsuario);
router.put('/:id', ctrl.updateUsuario);
router.delete('/:id', ctrl.deleteUsuario);

export default router;