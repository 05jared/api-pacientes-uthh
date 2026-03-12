import { Router } from 'express';
import * as ctrl from '../controllers/tratamiento.controller.js';

const router = Router();

router.get('/', ctrl.getTratamientos);
router.post('/', ctrl.createTratamiento);

export default router;