import db from '../config/db.js';

export const getAllTratamientos = async () => {
  const [rows] = await db.query(`
    SELECT t.*, d.diagnostico, d.observaciones
    FROM tratamiento t
    LEFT JOIN diagnostico d ON t.id_diagnostico = d.id_diagnostico
  `);
  return rows;
};

export const createTratamiento = async (data) => {
  const { id_diagnostico, medicamento, dosis, 
          frecuencia, duracion, indicaciones } = data;

  const [result] = await db.query(
    `INSERT INTO tratamiento 
      (id_diagnostico, medicamento, dosis, frecuencia, duracion, indicaciones)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id_diagnostico, medicamento, dosis, frecuencia, duracion, indicaciones]
  );
  return { id: result.insertId, id_diagnostico, medicamento, 
           dosis, frecuencia, duracion, indicaciones };
};