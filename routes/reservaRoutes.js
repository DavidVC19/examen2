const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ctrl = require('../controllers/reservaController');

// Multer
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/',          ctrl.getAllReservas);
router.post('/', upload.single('imagen'), ctrl.createReserva);
router.put('/:id', upload.single('imagen'), ctrl.updateReserva);
router.delete('/:id',    ctrl.deleteReserva);

module.exports = router;
