import db from '../config/db.js';

export const getAllNoticias = async () => {
  const [rows] = await db.query('SELECT * FROM noticias');
  return rows;
};

export const createNoticia = async (data) => {
  const { titulo, descripcion, imagen, enlace } = data;

  const [result] = await db.query(
    `INSERT INTO noticias 
      (titulo, descripcion, imagen, enlace)
     VALUES (?, ?, ?, ?)`,
    [titulo, descripcion, imagen, enlace]
  );
  return { id: result.insertId, titulo, descripcion, imagen, enlace };
};