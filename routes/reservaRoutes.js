const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Rutas
router.get('/', reservaController.getAllReservas);
router.post('/', upload.single('imagen'), reservaController.createReserva);

module.exports = router;
