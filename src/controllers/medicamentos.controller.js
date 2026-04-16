import MedicamentosModel from '../models/medicamentos.model.js';

const MedicamentosController = {
  getAll: async (req, res) => {
    try {
      const results = await MedicamentosModel.getAll();
      res.json(results);
    } catch (err) {
      console.error('Error al obtener medicamentos:', err);
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
  }
};

export default MedicamentosController;