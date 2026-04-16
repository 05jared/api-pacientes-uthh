import * as MedicamentosModel from '../models/medicamentos.model.js';

export const getMedicamentos = async (req, res) => {
  try {
    const results = await MedicamentosModel.getMedicamentos();
    res.json(results);
  } catch (err) {
    console.error('Error al obtener medicamentos:', err);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
};