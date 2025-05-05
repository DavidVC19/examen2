const db = require('./db');

exports.getAll = callback => {
  db.query(
    `SELECT reservas.*, cliente.nombre AS cliente_nombre 
     FROM reservas 
     JOIN cliente ON reservas.cliente_id = cliente.id`,
    callback
  );
};
