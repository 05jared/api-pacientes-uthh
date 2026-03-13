import * as pacienteModel from '../models/pacientes.model.js';

export const getPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteModel.getAllPacientes();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPaciente = async (req, res) => {
  try {
    const { nombre, apellido_materno, apellido_paterno, tipopaciente,
            matricula_o_numero_trabajador, fecha_nacimiento, sexo,
            correo, telefono, direccion, Grupo, Cuatrimestre, Carrera } = req.body;

    if (!nombre || !apellido_materno || !apellido_paterno || !tipopaciente ||
        !matricula_o_numero_trabajador || !fecha_nacimiento || !sexo ||
        !correo || !telefono || !direccion || !Grupo || !Cuatrimestre || !Carrera) {
      return res.status(400).json({ msg: "Todos los datos son obligatorios" });
    }

    const nuevo = await pacienteModel.createPaciente(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pacienteModel.updatePaciente(id, req.body);
    res.status(200).json({ msg: "Paciente actualizado", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pacienteModel.deletePaciente(id);
    res.status(200).json({ msg: "Paciente eliminado", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};