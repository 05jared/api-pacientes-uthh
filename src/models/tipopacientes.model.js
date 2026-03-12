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
