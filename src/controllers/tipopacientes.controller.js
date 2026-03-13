import * as tipoPacienteModel from '../models/tipopacientes.model.js';

export const getTipoPacientes = async (req, res) => {
  try {
    const tipos = await tipoPacienteModel.getAllTipoPacientes();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTipoPaciente = async (req, res) => {
  try {
    const { descripcion } = req.body;

    if (!descripcion) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    const nuevo = await tipoPacienteModel.createTipoPaciente(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateTipoPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tipoPacienteModel.updateTipoPaciente(id, req.body);
    res.status(200).json({ msg: "Tipo de paciente actualizado", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTipoPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tipoPacienteModel.deleteTipoPaciente(id);
    res.status(200).json({ msg: "Tipo de paciente eliminado", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};