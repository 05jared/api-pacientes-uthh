import * as diagnosticoModel from "../models/diagnostico.model.js";

export const getDiagnosticos = async (req, res) => {
  try {
    const diagnosticos = await diagnosticoModel.getAllDiagnosticos();
    res.status(200).json(diagnosticos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDiagnostico = async (req, res) => {
  try {
    const { id_consulta, diagnostico, observaciones } = req.body;

    if (!id_consulta || !diagnostico || !observaciones) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    const nuevo = await diagnosticoModel.createDiagnostico(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
