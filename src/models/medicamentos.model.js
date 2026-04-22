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

  if (cantidad > 0 && med.stock_inicial < cantidad) {
    throw new Error('Stock insuficiente');
  }

  const [result] = await db.query(
    `UPDATE medicamentos SET stock_inicial = stock_inicial - ? WHERE clave = ?`,
    [cantidad, clave]
  );
  return result;
};

export const getPacientesPorDiaReal = async () => {
  const [rows] = await db.query(`
    SELECT
      m.clave,
      m.nombre,
      m.stock_inicial,
      m.proveedor,
      m.reposiciones_anio,
      COALESCE(
        GREATEST(
          ROUND(AVG(t.dosis), 0),
          1
        ),
        m.consumo_por_paciente
      ) AS consumo_por_paciente,
      COALESCE(
        GREATEST(
          ROUND(
            COUNT(c.id_consulta) /
            GREATEST(DATEDIFF(MAX(c.fecha_consulta), MIN(c.fecha_consulta)), 1)
          , 0),
          1
        ),
        m.pacientes_por_dia
      ) AS pacientes_por_dia,
      COUNT(c.id_consulta) AS total_consultas
    FROM medicamentos m
    LEFT JOIN tratamiento t ON m.nombre = t.medicamento
    LEFT JOIN diagnostico d ON t.id_diagnostico = d.id_diagnostico
    LEFT JOIN consultas c ON d.id_consulta = c.id_consulta
    GROUP BY m.clave, m.nombre, m.stock_inicial, m.consumo_por_paciente,
             m.proveedor, m.reposiciones_anio, m.pacientes_por_dia
  `);
  return rows;
};