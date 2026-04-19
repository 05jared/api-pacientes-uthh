import db from '../config/db.js';

export const getMedicamentos = async () => {
  const sql = `
    SELECT
      clave,
      nombre,
      stock_inicial,
      consumo_por_paciente,
      proveedor,
      pacientes_por_dia,
      reposiciones_anio
    FROM medicamentos
    ORDER BY nombre ASC
  `;

  const [rows] = await db.query(sql);
  return rows;
};