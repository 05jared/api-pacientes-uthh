import db from '../config/db.js';

export const getAllConsultas = async () => {
  const [rows] = await db.query(`
    SELECT c.*, p.nombre, p.apellido_paterno, p.apellido_materno
    FROM consultas c
    LEFT JOIN pacientess p ON c.id_paciente = p.id_paciente
  `);
  return rows;
};

export const createConsulta = async (data) => {
  const { id_paciente, fecha_consulta, hora_consulta, 
          motivo_consulta, consultasalida } = data;

  const [result] = await db.query(
    `INSERT INTO consultas 
      (id_paciente, fecha_consulta, hora_consulta, motivo_consulta, consultasalida)
     VALUES (?, ?, ?, ?, ?)`,
    [id_paciente, fecha_consulta, hora_consulta, motivo_consulta, consultasalida]
  );
  return { id: result.insertId, id_paciente, fecha_consulta, 
           hora_consulta, motivo_consulta, consultasalida };
};
