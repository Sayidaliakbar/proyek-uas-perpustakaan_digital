const express = require('express');
const { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory } = require('../controllers/kategoriController');
const router = express.Router();

router.get('/', getCategories); // mendapatkan semua kategori
router.post('/', addCategory); // menambahkan kategori
router.get('/:id', getCategoryById); // mendapatkan kategori sesuai id
router.put('/:id', updateCategory); // memperbarui kategori sesuai id
router.delete('/:id', deleteCategory); // menghapus kategori

module.exports = router;