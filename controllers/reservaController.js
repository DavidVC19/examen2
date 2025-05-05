const db = require('../models/db');

// Obtener todas las reservas con datos del cliente
exports.getAllReservas = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT reservas.*, cliente.nombre AS cliente_nombre
      FROM reservas
      JOIN cliente ON reservas.cliente_id = cliente.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una reserva
exports.createReserva = async (req, res) => {
  const { fecha, hora, cliente_id } = req.body;
  const imagen = req.file ? req.file.filename : null;

  if (!fecha || !hora || !cliente_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const result = await db.query(
      'INSERT INTO reservas (fecha, hora, cliente_id, imagen) VALUES ($1, $2, $3, $4) RETURNING *',
      [fecha, hora, cliente_id, imagen]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
