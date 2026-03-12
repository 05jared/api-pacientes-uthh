import db from '../config/db.js';

export const getAllPacientes = async () => {
  const [rows] = await db.query(`
    SELECT p.*, t.descripcion AS tipo_paciente
    FROM pacientess p
    LEFT JOIN tipopacientes t ON p.tipopaciente = t.idtipopacientes
  `);
  return rows;
};

export const createPaciente = async (data) => {
  const { nombre, apellido_materno, apellido_paterno, tipopaciente,
          matricula_o_numero_trabajador, fecha_nacimiento, sexo,
          correo, telefono, direccion, Grupo, Cuatrimestre, Carrera } = data;

  const [result] = await db.query(
    `INSERT INTO pacientess 
      (nombre, apellido_materno, apellido_paterno, tipopaciente,
       matricula_o_numero_trabajador, fecha_nacimiento, sexo,
       correo, telefono, direccion, Grupo, Cuatrimestre, Carrera)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellido_materno, apellido_paterno, tipopaciente,
     matricula_o_numero_trabajador, fecha_nacimiento, sexo,
     correo, telefono, direccion, Grupo, Cuatrimestre, Carrera]
  );
  return { id: result.insertId, nombre, apellido_materno, apellido_paterno,
           tipopaciente, matricula_o_numero_trabajador, fecha_nacimiento,
           sexo, correo, telefono, direccion, Grupo, Cuatrimestre, Carrera };
};
