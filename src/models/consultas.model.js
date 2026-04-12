import db from '../config/db.js';

// Usa la vista v_consultas
export const getAllConsultas = async () => {
  const [rows] = await db.query('SELECT * FROM v_consultas ORDER BY fecha_consulta DESC');
  return rows;
};

// Usa la vista v_historial para traer todo el detalle
export const getConsultaById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM v_historial WHERE id_consulta = ?', [id]
  );
  return rows[0];
};

// Usa el procedimiento sp_registrar_consulta_completa
export const createConsulta = async (data) => {
  const { id_paciente, fecha_consulta, hora_consulta, consultasalida,
          motivo_consulta, diagnostico, observaciones,
          medicamento, dosis, frecuencia, duracion, indicaciones } = data;

  const [rows] = await db.query(
    'CALL sp_registrar_consulta_completa(?,?,?,?,?,?,?,?,?,?,?,?,@resultado)',
    [id_paciente, fecha_consulta, hora_consulta, consultasalida,
     motivo_consulta, diagnostico || null, observaciones || null,
     medicamento || null, dosis || null, frecuencia || null,
     duracion || null, indicaciones || null]
  );

  const [[out]] = await db.query('SELECT @resultado AS resultado');
  const resultado = out.resultado;

  if (resultado.startsWith('OK:')) {
    const id = parseInt(resultado.split(':')[1]);
    return { id };
  }
  throw new Error(resultado);
};

export const updateConsulta = async (id, data) => {
  const { id_paciente, fecha_consulta, hora_consulta,
          motivo_consulta, consultasalida } = data;

  const [result] = await db.query(
    `UPDATE consultas SET id_paciente=?, fecha_consulta=?, hora_consulta=?,
     motivo_consulta=?, consultasalida=? WHERE id_consulta=?`,
    [id_paciente, fecha_consulta, hora_consulta, motivo_consulta, consultasalida, id]
  );
  return result;
};

// Usa el procedimiento sp_eliminar_consulta
export const deleteConsulta = async (id) => {
  await db.query('CALL sp_eliminar_consulta(?, @resultado)', [id]);
  const [[out]] = await db.query('SELECT @resultado AS resultado');
  return out.resultado;
};

export const getConsultasByPaciente = async (id_paciente) => {
  const [rows] = await db.query(
    'SELECT * FROM v_consultas WHERE id_paciente = ? ORDER BY fecha_consulta DESC',
    [id_paciente]
  );
  return rows;
};