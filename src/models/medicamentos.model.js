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
    ORDER BY nombre ASC`;
  const [rows] = await db.query(sql);
  return rows;
};

export const updateStock = async (clave, cantidad) => {
  // Primero verificamos que haya suficiente stock
  const [[med]] = await db.query(
    `SELECT stock_inicial FROM medicamentos WHERE clave = ?`,
    [clave]
  );

  if (!med) {
    throw new Error('Medicamento no encontrado');
  }

  if (med.stock_inicial < cantidad) {
    throw new Error('Stock insuficiente');
  }

  const [result] = await db.query(
    `UPDATE medicamentos SET stock_inicial = stock_inicial - ? WHERE clave = ?`,
    [cantidad, clave]
  );
  return result; };