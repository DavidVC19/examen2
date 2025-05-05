const db = require('../models/db');

exports.getAllClientes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM cliente');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener clientes:', err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

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
    console.error('❌ Error al registrar cliente:', err);
    res.status(500).json({ error: 'Error al registrar cliente' });
  }
};

exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono } = req.body;
  if (!nombre || !telefono) {
    return res.status(400).json({ error: 'Nombre y teléfono son obligatorios' });
  }
  try {
    const result = await db.query(
      'UPDATE cliente SET nombre = $1, telefono = $2 WHERE id = $3 RETURNING *',
      [nombre, telefono, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error al actualizar cliente:', err);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

exports.deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM cliente WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado', cliente: result.rows[0] });
  } catch (err) {
    console.error('❌ Error al eliminar cliente:', err);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
