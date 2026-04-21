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

export const updateStock = async (req, res) => {
  try {
    const { clave } = req.params;
    const { cantidad } = req.body;

    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({ error: 'Cantidad inválida' });
    }

    const result = await MedicamentosModel.updateStock(clave, cantidad);

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'Stock insuficiente o medicamento no encontrado' });
    }

    res.json({ msg: 'Stock actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar stock:', err);
    res.status(500).json({ error: 'Error al actualizar stock' });
  }
};

