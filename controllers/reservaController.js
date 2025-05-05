const db = require('../models/db');

exports.getAllReservas = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT r.*, c.nombre AS cliente_nombre
      FROM reservas r
      JOIN cliente c ON r.cliente_id = c.id
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

exports.updateReserva = async (req, res) => {
  const { id } = req.params;
  const { fecha, hora, cliente_id } = req.body;
  const imagen = req.file ? req.file.filename : null;

  if (!fecha || !hora || !cliente_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Construir query dinámico si hay nueva imagen o no
    let query, params;
    if (imagen) {
      query = `
        UPDATE reservas
        SET fecha = $1, hora = $2, cliente_id = $3, imagen = $4
        WHERE id = $5
        RETURNING *`;
      params = [fecha, hora, cliente_id, imagen, id];
    } else {
      query = `
        UPDATE reservas
        SET fecha = $1, hora = $2, cliente_id = $3
        WHERE id = $4
        RETURNING *`;
      params = [fecha, hora, cliente_id, id];
    }

    const result = await db.query(query, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error al actualizar reserva:', err);
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
};

exports.deleteReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM reservas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada', reserva: result.rows[0] });
  } catch (err) {
    console.error('❌ Error al eliminar reserva:', err);
    res.status(500).json({ error: 'Error al eliminar reserva' });
  }
};
