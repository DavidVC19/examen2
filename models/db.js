const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // importante para Render
  },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 20000,
  max: 20
});

pool.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos PostgreSQL');
  }
});

module.exports = pool;
