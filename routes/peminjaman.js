const express = require('express');
const { getPeminjaman, getPeminjamanById, addPeminjaman, updatePeminjaman, deletePeminjaman } = require('../controllers/peminjamanController');
const router = express.Router();

router.post('/', addPeminjaman);
router.get('/:id',getPeminjamanById);
router.put('/:id', updatePeminjaman);
router.delete('/:id', deletePeminjaman);

module.exports = router;