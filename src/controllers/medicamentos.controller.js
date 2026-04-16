const MedicamentosModel = require('../models/medicamentos.model');

const MedicamentosController = {
  getAll: (req, res) => {
    MedicamentosModel.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener medicamentos:', err);
        return res.status(500).json({ error: 'Error al consultar la base de datos' });
      }
      res.json(results);
    });
  }
};

module.exports = MedicamentosController;