const express = require('express');
const { getBooks, addBook, updateBook,getBookById, deleteBook } = require('../controllers/bukuController');
const router = express.Router();

router.get('/', getBooks); // Mendapatkan semua buku
router.post('/', addBook); // Menambahkan buku baru
router.get('/:id', getBookById); // Mendapatkan detail buku berdasarkan ID
router.put('/:id', updateBook); // Memperbarui buku berdasarkan ID
router.delete('/:id', deleteBook); // Menghapus buku berdasarkan ID

module.exports = router;