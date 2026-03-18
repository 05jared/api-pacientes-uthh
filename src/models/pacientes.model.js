import db from '../config/db.js';

// Usa la vista v_pacientes
export const getAllPacientes = async () => {
  const [rows] = await db.query('SELECT * FROM v_pacientes ORDER BY nombre ASC');
  return rows;
};

export const getPacienteById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM v_pacientes WHERE id_paciente = ?', [id]
  );
  return rows[0];
};

// Usa el procedimiento sp_registrar_paciente
export const createPaciente = async (data) => {
  const { nombre, apellido_materno, apellido_paterno, tipopaciente,
          matricula_o_numero_trabajador, fecha_nacimiento, sexo,
          correo, telefono, direccion, Grupo, Cuatrimestre, Carrera } = data;

  await db.query(
    'CALL sp_registrar_paciente(?,?,?,?,?,?,?,?,?,?,?,?,?,@resultado)',
    [nombre, apellido_paterno, apellido_materno, tipopaciente,
     matricula_o_numero_trabajador, fecha_nacimiento, sexo,
     correo, telefono, direccion, Grupo, Cuatrimestre, Carrera]
  );

  const [[out]] = await db.query('SELECT @resultado AS resultado');
  const resultado = out.resultado;

  if (resultado.startsWith('ERROR')) throw new Error(resultado);
  return { mensaje: resultado };
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

export const findUsuarioByCorreo = async (correo) => {
  const [rows] = await db.query(
    'SELECT * FROM usuarios WHERE correo = ?', [correo]
  );
  return rows[0];
};