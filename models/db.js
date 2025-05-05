const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,          // Dirección del host
  user: process.env.DB_USER,          // Nombre de usuario
  password: process.env.DB_PASSWORD,  // Contraseña
  database: process.env.DB_NAME,      // Nombre de la base de datos
  port: 5432,                         // Puerto de PostgreSQL
  connectionTimeoutMillis: 10000,     // Aumenta el tiempo de espera para la conexión
  idleTimeoutMillis: 20000,           // Aumenta el tiempo de espera cuando la conexión está inactiva
  max: 20                             // Limita el número de conexiones
});

pool.connect((err, client) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos PostgreSQL');
  }
});

module.exports = pool;
