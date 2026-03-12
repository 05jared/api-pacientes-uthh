import * as tratamientoModel from '../models/tratamiento.model.js';

export const getTratamientos = async (req, res) => {
  try {
    const tratamientos = await tratamientoModel.getAllTratamientos();
    res.status(200).json(tratamientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTratamiento = async (req, res) => {
  try {
    const { id_diagnostico, medicamento, dosis, 
            frecuencia, duracion, indicaciones } = req.body;

    if (!id_diagnostico || !medicamento || !dosis || 
        !frecuencia || !duracion || !indicaciones) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    const nuevo = await tratamientoModel.createTratamiento(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
