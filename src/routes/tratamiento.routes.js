import { Router } from 'express';
import * as ctrl from '../controllers/tratamiento.controller.js';

const router = Router();

router.get('/', ctrl.getTratamientos);
router.post('/', ctrl.createTratamiento);
router.put('/:id', ctrl.updateTratamiento);
router.delete('/:id', ctrl.deleteTratamiento);

export default router;