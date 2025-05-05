const db = require('./db');

exports.getAll = callback => {
  db.query('SELECT * FROM cliente', callback);
};
