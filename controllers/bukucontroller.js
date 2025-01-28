const db = require('../config/db');
const { validationResult } = require('express-validator');

// Mengambil semua buku
function getBooks(req, res) {
  const query = 'SELECT * FROM buku';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data buku', error: err });
    res.json(results);
  });
}

// Menambahkan buku baru
function addBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { judul, penulis, kategori_id, tahun_terbit, stok } = req.body;
  const query =
    'INSERT INTO buku (judul, penulis, kategori_id, tahun_terbit, stok) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [judul, penulis, kategori_id, tahun_terbit, stok], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal menambahkan buku', error: err });
    }
    res.status(201).json({ message: 'Buku berhasil ditambahkan', data: { id: result.insertId } });
  });
}

// Mengambil detail buku berdasarkan ID
function getBookById(req, res) {
  const { id } = req.params;
  const query = 'SELECT * FROM buku WHERE id_buku = ?';

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil detail buku', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json(results[0]);
  });
}

// Menghapus buku berdasarkan ID
function deleteBook(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM buku WHERE id_buku = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus buku', error: err });
    res.json({ message: 'Buku berhasil dihapus', affectedRows: result.affectedRows });
  });
}

// Memperbarui buku berdasarkan ID
function updateBook(req, res) {
  const { id } = req.params;
  const { judul, penulis, kategori_id, tahun_terbit, stok, id_buku } = req.body;
  const query =
    'UPDATE buku SET judul = ?, penulis = ?, kategori_id = ?, tahun_terbit = ?, stok = ? WHERE id_buku = ?';

  db.query(query, [judul, penulis, kategori_id, tahun_terbit, stok, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal memperbarui buku', error: err });
    res.json({ message: 'Buku berhasil diperbarui', affectedRows: result.affectedRows });
  });
}

// Ekspor modul
module.exports = { getBooks, addBook, updateBook, deleteBook, getBookById };