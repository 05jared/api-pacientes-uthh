const db = require('../config/db');

const MedicamentosModel = {
  getAll: (callback) => {
    const sql = `
      SELECT clave, nombre, stock_inicial, consumo_por_paciente
      FROM medicamentos
    `;
    db.query(sql, callback);
  }
};

module.exports = MedicamentosModel;