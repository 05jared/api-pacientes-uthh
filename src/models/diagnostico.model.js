import db from '../config/db.js';

export const getAllDiagnosticos = async () => {
  const [rows] = await db.query(`
    SELECT d.*, c.fecha_consulta, c.motivo_consulta
    FROM diagnostico d
    LEFT JOIN consultas c ON d.id_consulta = c.id_consulta
  `);
  return rows;
};

export const createDiagnostico = async (data) => {
  const { id_consulta, diagnostico, observaciones } = data;

  const [result] = await db.query(
    `INSERT INTO diagnostico 
      (id_consulta, diagnostico, observaciones)
     VALUES (?, ?, ?)`,
    [id_consulta, diagnostico, observaciones]
  );
  return { id: result.insertId, id_consulta, diagnostico, observaciones };
};
export const updateDiagnostico = async (id, data) => {
  const { id_consulta, diagnostico, observaciones } = data;

  const [result] = await db.query(
    `UPDATE diagnostico SET id_consulta=?, diagnostico=?, observaciones=?
     WHERE id_diagnostico=?`,
    [id_consulta, diagnostico, observaciones, id]
  );
  return result;
};

export const deleteDiagnostico = async (id) => {
  const [result] = await db.query(
    'DELETE FROM diagnostico WHERE id_diagnostico=?', [id]
  );
  return result;
};
