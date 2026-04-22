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
  const [[med]] = await db.query(
    `SELECT stock_inicial FROM medicamentos WHERE clave = ?`,
    [clave]
  );

  if (!med) throw new Error('Medicamento no encontrado');

  // Si cantidad es positiva = restar, verificar stock suficiente
  if (cantidad > 0 && med.stock_inicial < cantidad) {
    throw new Error('Stock insuficiente');
  }

  const [result] = await db.query(
    `UPDATE medicamentos SET stock_inicial = stock_inicial - ? WHERE clave = ?`,
    [cantidad, clave] // cantidad negativa = devuelve stock automáticamente
  );
  return result;
};

export const getPacientesPorDiaReal = async () => {
  const [rows] = await db.query(`
    SELECT
      m.clave,
      m.nombre,
      m.stock_inicial,
      m.consumo_por_paciente,
      m.proveedor,
      m.reposiciones_anio,
      COALESCE(
        ROUND(
          COUNT(c.id_consulta) /
          GREATEST(DATEDIFF(MAX(c.fecha_consulta), MIN(c.fecha_consulta)), 1)
        , 2),
        m.pacientes_por_dia
      ) AS pacientes_por_dia
    FROM medicamentos m
    LEFT JOIN tratamiento t ON m.nombre = t.medicamento
    LEFT JOIN diagnostico d ON t.id_diagnostico = d.id_diagnostico
    LEFT JOIN consultas c ON d.id_consulta = c.id_consulta
    GROUP BY m.clave, m.nombre, m.stock_inicial, m.consumo_por_paciente,
             m.proveedor, m.reposiciones_anio, m.pacientes_por_dia
  `);
  return rows;
};