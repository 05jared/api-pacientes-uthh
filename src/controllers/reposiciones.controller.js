import * as ReposicionesModel from '../models/reposiciones.model.js';

export const getReposiciones = async (req, res) => {
  try {
    const { clave } = req.params;
    const data = await ReposicionesModel.getReposicionesByMedicamento(clave);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createReposicion = async (req, res) => {
  try {
    const { clave_medicamento, cantidad, fecha_reposicion, notas, stock_antes } = req.body; // ← agrega stock_antes

    if (!clave_medicamento || !cantidad || !fecha_reposicion) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    if (cantidad <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
    }

    const result = await ReposicionesModel.createReposicion(req.body); // req.body ya trae stock_antes
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};