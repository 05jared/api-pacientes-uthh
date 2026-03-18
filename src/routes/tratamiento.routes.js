import { Router } from 'express';
import verificarToken from '../middleware/auth.middleware.js';
import * as ctrl from '../controllers/tratamiento.controller.js';

const router = Router();

router.get('/', ctrl.getTratamientos);
router.post('/', verificarToken, ctrl.createTratamiento);
router.put('/:id', verificarToken, ctrl.updateTratamiento);
router.delete('/:id', verificarToken, ctrl.deleteTratamiento);

export default router;