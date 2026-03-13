import db from '../config/db.js';

export const getAllTipoPacientes = async () => {
  const [rows] = await db.query('SELECT * FROM tipopacientes');
  return rows;
};

export const createTipoPaciente = async (data) => {
  const { descripcion } = data;

  const [result] = await db.query(
    `INSERT INTO tipopacientes (descripcion) VALUES (?)`,
    [descripcion]
  );
  return { id: result.insertId, descripcion };
};

export const updateTipoPaciente = async (id, data) => {
  const { tipo } = data;

  const [result] = await db.query(
    `UPDATE tipopacientes SET tipo=? WHERE id_tipo=?`,
    [tipo, id]
  );
  return result;
};

export const deleteTipoPaciente = async (id) => {
  const [result] = await db.query(
    'DELETE FROM tipopacientes WHERE id_tipo=?', [id]
  );
  return result;
};