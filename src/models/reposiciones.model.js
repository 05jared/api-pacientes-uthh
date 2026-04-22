import db from '../config/db.js';

export const getReposicionesByMedicamento = async (clave) => {
  const [rows] = await db.query(
    `SELECT * FROM reposiciones WHERE clave_medicamento = ? ORDER BY fecha_reposicion DESC`,
    [clave]
  );
  return rows;
};

export const createReposicion = async (data) => {
  const { clave_medicamento, cantidad, fecha_reposicion, notas, stock_antes } = data; // ← agrega stock_antes

  // 1. Insertar la reposición
  const [result] = await db.query(
    `INSERT INTO reposiciones (clave_medicamento, cantidad, fecha_reposicion, notas, stock_antes)
     VALUES (?, ?, ?, ?, ?)`,                                    // ← agrega columna y valor
    [clave_medicamento, cantidad, fecha_reposicion, notas || null, stock_antes ?? null]
  );

  // 2. Sumar al stock_inicial del medicamento
  await db.query(
    `UPDATE medicamentos SET stock_inicial = stock_inicial + ? WHERE clave = ?`,
    [cantidad, clave_medicamento]
  );

  return { id: result.insertId, clave_medicamento, cantidad, fecha_reposicion };
};
export const getTotalReposiciones = async (clave) => {
  const [[row]] = await db.query(
    `SELECT COALESCE(SUM(cantidad), 0) AS total FROM reposiciones WHERE clave_medicamento = ?`,
    [clave]
  );
  return row.total;
};