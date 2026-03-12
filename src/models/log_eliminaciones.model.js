import db from '../config/db.js';

export const getAllLogs = async () => {
  const [rows] = await db.query('SELECT * FROM log_eliminaciones');
  return rows;
};

export const createLog = async (data) => {
  const { tipo, id_registro, descripcion, usuario_sesion } = data;

  const [result] = await db.query(
    `INSERT INTO log_eliminaciones 
      (tipo, id_registro, descripcion, usuario_sesion)
     VALUES (?, ?, ?, ?)`,
    [tipo, id_registro, descripcion, usuario_sesion]
  );
  return { id: result.insertId, tipo, id_registro, descripcion, usuario_sesion };
};