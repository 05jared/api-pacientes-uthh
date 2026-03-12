import * as logModel from '../models/log_eliminaciones.model.js';

export const getLogs = async (req, res) => {
  try {
    const logs = await logModel.getAllLogs();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLog = async (req, res) => {
  try {
    const { tipo, id_registro, descripcion, usuario_sesion } = req.body;

    if (!tipo || !id_registro || !descripcion) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    const nuevo = await logModel.createLog(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};