const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (ej. imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar rutas
const reservaRoutes = require('./routes/reservaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const db = require('./models/db'); // Conexión a PostgreSQL

// Rutas de la API
app.use('/api/reservas', reservaRoutes);
app.use('/api/clientes', clienteRoutes);

// ✅ Ruta para probar la conexión a PostgreSQL
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
