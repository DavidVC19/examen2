const db = require('../models/db');

// Obtener todos los clientes
exports.getAllClientes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM cliente');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear cliente
exports.createCliente = async (req, res) => {
  const { nombre, telefono } = req.body;

  if (!nombre || !telefono) {
    return res.status(400).json({ error: 'Nombre y teléfono son obligatorios' });
  }

  try {
    const result = await db.query(
      'INSERT INTO cliente (nombre, telefono) VALUES ($1, $2) RETURNING *',
      [nombre, telefono]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
