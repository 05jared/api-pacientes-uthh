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

    console.log('→ updateStock llamado con clave:', clave, '| cantidad:', cantidad);

    if (!cantidad || Number(cantidad) <= 0) {
      return res.status(400).json({ error: 'Cantidad inválida' });
    }

    await MedicamentosModel.updateStock(clave, Number(cantidad));

    res.json({ msg: 'Stock actualizado correctamente' });

  } catch (err) {
    console.error('Error al actualizar stock:', err.message);

    if (err.message === 'Medicamento no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === 'Stock insuficiente') {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: 'Error al actualizar stock' });
  }};