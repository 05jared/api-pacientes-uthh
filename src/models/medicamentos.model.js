import db from '../config/db.js';

const MedicamentosModel = {
  getAll: async () => {
    const sql = `
      SELECT clave, nombre, stock_inicial, consumo_por_paciente
      FROM medicamentos
    `;
    
    const [rows] = await db.query(sql);
    return rows;
  }
};

export default MedicamentosModel;