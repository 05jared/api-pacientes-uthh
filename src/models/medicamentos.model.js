import db from '../config/db.js';

export const getMedicamentos = async () => {
  const sql = `
    SELECT clave, nombre, stock_inicial, consumo_por_paciente
    FROM medicamentos
  `;
  
  const [rows] = await db.query(sql);
  return rows;
};