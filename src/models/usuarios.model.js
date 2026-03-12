import db from '../config/db.js';

export const getAllUsuarios = async () => {
  const [rows] = await db.query('SELECT * FROM usuarios');
  return rows;
};

export const createUsuario = async (data) => {
  const { nombre, apellido_paterno, apellido_materno, 
          correo, contrasena, rol } = data;

  const [result] = await db.query(
    `INSERT INTO usuarios 
      (nombre, apellido_paterno, apellido_materno, correo, contrasena, rol)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, apellido_paterno, apellido_materno, correo, contrasena, rol]
  );
  return { id: result.insertId, nombre, apellido_paterno, 
           apellido_materno, correo, rol };
};