const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/clienteController');

router.get('/',    ctrl.getAllClientes);
router.post('/',   ctrl.createCliente);
router.put('/:id', ctrl.updateCliente);
router.delete('/:id', ctrl.deleteCliente);

module.exports = router;
