import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import * as usuarioModel from '../models/usuarios.model.js';

/* ── Verifica el token de reCAPTCHA con Google ── */
const verificarCaptcha = async (token) => {
  const secret = '6LeaEpEsAAAAADQBU-pHqg23C1gHHJkTDf_T6ZbZ';
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );
  return data.success;
};

export const login = async (req, res) => {
  try {
    const { correo, contrasena, recaptchaToken } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    if (!recaptchaToken) {
      return res.status(400).json({ message: 'Token de reCAPTCHA requerido' });
    }

    const captchaValido = await verificarCaptcha(recaptchaToken);
    if (!captchaValido) {
      return res.status(403).json({ message: 'Verificación de seguridad fallida' });
    }

    const usuario = await usuarioModel.findUsuarioByCorreo(correo);
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id_usuarios, correo: usuario.correo, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: {
        id_usuarios:      usuario.id_usuarios,
        nombre:           usuario.nombre,
        apellido_paterno: usuario.apellido_paterno,
        apellido_materno: usuario.apellido_materno,
        correo:           usuario.correo,
        rol:              usuario.rol
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error en el proceso de login' });
  }
};