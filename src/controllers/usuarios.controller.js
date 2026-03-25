import * as usuarioModel from '../models/usuarios.model.js';

const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function validarUsuario({ nombre, apellido_paterno, apellido_materno, correo, contrasena, rol }, esEdicion = false) {

  if (!nombre || !regexNombre.test(nombre)) {
    return "Nombre inválido (solo letras, mínimo 2 caracteres)";
  }

  if (!apellido_paterno || !regexNombre.test(apellido_paterno)) {
    return "Apellido paterno inválido";
  }

if (apellido_materno && !regexNombre.test(apellido_materno)) {
  return "Apellido materno inválido";
}

  if (!correo || !regexCorreo.test(correo)) {
    return "Correo inválido";
  }

  if (!rol) {
    return "El rol es obligatorio";
  }


  if (!esEdicion && !contrasena) {
    return "La contraseña es obligatoria";
  }

  if (contrasena && !regexPassword.test(contrasena)) {
    return "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo";
  }

  return null;
}

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
    const error = validarUsuario(req.body, false);
    if (error) return res.status(400).json({ error });

    // Verificar correo duplicado
    const existe = await usuarioModel.findUsuarioByCorreo(req.body.correo);
    if (existe) return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });

    const nuevo = await usuarioModel.createUsuario(req.body);
    res.status(201).json(nuevo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const error = validarUsuario(req.body, true);
    if (error) {
      return res.status(400).json({ error });
    }

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