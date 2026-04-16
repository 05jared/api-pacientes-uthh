const express = require('express');
const router = express.Router();
const MedicamentosController = require('../controllers/medicamentos.controller');
const { verificarToken } = require('../middleware/auth.middleware');

router.get('/', verificarToken, MedicamentosController.getAll);

module.exports = router;