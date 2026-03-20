import db from '../config/db.js';
import bcrypt from 'bcryptjs';

export const getAllUsuarios = async () => {
  const [rows] = await db.query('SELECT * FROM usuarios');
  return rows;
};

export const createUsuario = async (data) => {
  const { nombre, apellido_paterno, apellido_materno,
          correo, contrasena, rol } = data;

  // Hashear antes de insertar
  const contrasenaHash = await bcrypt.hash(contrasena, 10);

  const [result] = await db.query(
    `INSERT INTO usuarios 
      (nombre, apellido_paterno, apellido_materno, correo, contrasena, rol)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, apellido_paterno, apellido_materno, correo, contrasenaHash, rol]
  );
  return { id: result.insertId, nombre, apellido_paterno,
           apellido_materno, correo, rol };
};

export const updateUsuario = async (id, data) => {
  const { nombre, apellido_paterno, apellido_materno,
          correo, contrasena, rol } = data;

  // Si viene contraseña nueva, hashearla; si no, dejar la que ya está
  if (contrasena) {
    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    const [result] = await db.query(
      `UPDATE usuarios SET nombre=?, apellido_paterno=?, apellido_materno=?,
       correo=?, contrasena=?, rol=? WHERE id_usuarios=?`,
      [nombre, apellido_paterno, apellido_materno, correo, contrasenaHash, rol, id]
    );
    return result;
  } else {
    const [result] = await db.query(
      `UPDATE usuarios SET nombre=?, apellido_paterno=?, apellido_materno=?,
       correo=?, rol=? WHERE id_usuarios=?`,
      [nombre, apellido_paterno, apellido_materno, correo, rol, id]
    );
    return result;
  }
};

export const deleteUsuario = async (id) => {
  const [result] = await db.query(
    'DELETE FROM usuarios WHERE id_usuarios=?', [id]
  );
  return result;
};

export const findUsuarioByCorreo = async (correo) => {
  const [rows] = await db.query(
    'SELECT * FROM usuarios WHERE correo = ?', [correo]
  );
  return rows[0];
};