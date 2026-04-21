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

export const updateStock = async (clave, cantidad) => {
  const [result] = await db.query(
    `UPDATE medicamentos SET stock_inicial = stock_inicial - ? WHERE clave = ? AND stock_inicial >= ?`,
    [cantidad, clave, cantidad]
  );
  return result;
};

