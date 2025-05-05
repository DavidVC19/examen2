const db = require('../models/db');

exports.getAllReservas = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT reservas.*, cliente.nombre AS cliente_nombre
      FROM reservas
      JOIN cliente ON reservas.cliente_id = cliente.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener reservas:', err);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

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
    console.error('❌ Error al registrar reserva:', err);
    res.status(500).json({ error: 'Error al registrar reserva' });
  }
};

exports.deleteReserva = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM reservas WHERE id = $1', [id]);
    res.json({ message: 'Reserva eliminada' });
  } catch (err) {
    console.error('❌ Error al eliminar reserva:', err);
    res.status(500).json({ error: 'Error al eliminar reserva' });
  }
};
