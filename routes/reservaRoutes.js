const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const reservaController = require('../controllers/reservaController');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/', reservaController.getAllReservas);
router.post('/', upload.single('imagen'), reservaController.createReserva);
router.delete('/:id', reservaController.deleteReserva);

module.exports = router;
