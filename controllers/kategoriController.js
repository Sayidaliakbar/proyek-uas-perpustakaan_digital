const db = require('../config/db');

// Mengambil semua kategori
function getCategories(req, res) {
  const query = 'SELECT * FROM kategori';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data kategori', error: err });
    res.json(results);
  });
}

// Menambahkan kategori baru
function addCategory(req, res) {
  const { nama_kategori } = req.body;
  const query = 'INSERT INTO kategori (nama_kategori) VALUES (?)';
  db.query(query, [nama_kategori], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan kategori', error: err });
    res.status(201).json({ message: 'Kategori berhasil ditambahkan', id: result.insertId });
  });
}

// Mengambil detail kategori berdasarkan ID
function getCategoryById(req, res) {
  const { id } = req.params;
  const query = 'SELECT * FROM kategori WHERE id_kategori = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil detail kategori', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    res.json(results[0]);
  });
}

// Memperbarui kategori berdasarkan ID
function updateCategory(req, res) {
  const { id } = req.params;
  const { nama_kategori } = req.body;
  const query = 'UPDATE kategori SET nama_kategori = ? WHERE id_kategori = ?';
  db.query(query, [nama_kategori, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal memperbarui kategori', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    res.json({ message: 'Kategori berhasil diperbarui' });
  });
}

// Menghapus kategori berdasarkan ID
function deleteCategory(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM kategori WHERE id_kategori = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus kategori', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    res.json({ message: 'Kategori berhasil dihapus' });
  });
}

module.exports = { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory };