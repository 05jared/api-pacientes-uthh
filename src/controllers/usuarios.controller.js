import * as usuarioModel from '../models/usuarios.model.js';

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, 
            correo, contrasena, rol } = req.body;

    if (!nombre || !apellido_paterno || !apellido_materno || 
        !correo || !contrasena || !rol) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    const nuevo = await usuarioModel.createUsuario(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usuarioModel.updateUsuario(id, req.body);
    res.status(200).json({ msg: "Usuario actualizado", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usuarioModel.deleteUsuario(id);
    res.status(200).json({ msg: "Usuario eliminado", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};