import * as consultaModel from '../models/consultas.model.js';

export const getConsultas = async (req, res) => {
  try {
    const consultas = await consultaModel.getAllConsultas();
    res.status(200).json(consultas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createConsulta = async (req, res) => {
  try {
    const { id_paciente, fecha_consulta, hora_consulta, 
            motivo_consulta, consultasalida } = req.body;

    if (!id_paciente || !fecha_consulta || !hora_consulta || !motivo_consulta || !consultasalida) 
    {
      return res.status(400).json({ msg: "Faltan datos , todos son obligatorios" });
    }

    const nuevo = await consultaModel.createConsulta(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 