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

exports.deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM cliente WHERE id = $1', [id]);
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    console.error('❌ Error al eliminar cliente:', err);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
