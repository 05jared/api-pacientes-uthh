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

export const updatePaciente = async (id, data) => {
  const { nombre, apellido_materno, apellido_paterno, tipopaciente,
          matricula_o_numero_trabajador, fecha_nacimiento, sexo,
          correo, telefono, direccion, Grupo, Cuatrimestre, Carrera } = data;

  const [result] = await db.query(
    `UPDATE pacientess SET nombre=?, apellido_materno=?, apellido_paterno=?,
     tipopaciente=?, matricula_o_numero_trabajador=?, fecha_nacimiento=?,
     sexo=?, correo=?, telefono=?, direccion=?, Grupo=?, Cuatrimestre=?, Carrera=?
     WHERE id_paciente=?`,
    [nombre, apellido_materno, apellido_paterno, tipopaciente,
     matricula_o_numero_trabajador, fecha_nacimiento, sexo,
     correo, telefono, direccion, Grupo, Cuatrimestre, Carrera, id]
  );
  return result;
};

export const deletePaciente = async (id) => {
  const [result] = await db.query(
    'DELETE FROM pacientess WHERE id_paciente=?', [id]
  );
  return result;
};