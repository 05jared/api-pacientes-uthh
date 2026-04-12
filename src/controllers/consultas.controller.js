import * as consultaModel from '../models/consultas.model.js';

export const getConsultas = async (req, res) => {
  try {
    const { id_paciente } = req.query;
    const consultas = id_paciente
      ? await consultaModel.getConsultasByPaciente(id_paciente)
      : await consultaModel.getAllConsultas();
    res.status(200).json(consultas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConsultaById = async (req, res) => {
  try {
    const { id } = req.params;
    const consulta = await consultaModel.getConsultaById(id);
    if (!consulta) return res.status(404).json({ msg: 'Consulta no encontrada' });
    res.status(200).json(consulta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createConsulta = async (req, res) => {
  try {
    const { id_paciente, fecha_consulta, hora_consulta, motivo_consulta } = req.body;

    if (!id_paciente || !fecha_consulta || !hora_consulta || !motivo_consulta) {
      return res.status(400).json({ msg: 'Faltan datos obligatorios' });
    }

    const nuevo = await consultaModel.createConsulta(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await consultaModel.updateConsulta(id, req.body);
    res.status(200).json({ msg: 'Consulta actualizada', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await consultaModel.deleteConsulta(id);
    res.status(200).json({ msg: 'Consulta eliminada', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

