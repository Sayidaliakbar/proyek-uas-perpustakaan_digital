const db = require('../config/db');

// Menambahkan data peminjaman
function addPeminjaman(req, res) {
  const { id_buku, tanggal_pinjam, tanggal_kembali } = req.body;
  const query = 'INSERT INTO peminjaman (id_anggota, id_buku, tanggal_pinjam, tanggal_kembali) VALUES (?, ?, ?, ?)';
  db.query(query, [req.user.id, id_buku, tanggal_pinjam, tanggal_kembali], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan data peminjaman', error: err });
    res.status(201).json({ message: 'Peminjaman berhasil ditambahkan', id: result.insertId });
  });
}

// Mengambil detail peminjaman berdasarkan ID
function getPeminjamanById(req, res) {
  const { id } = req.params;
  const query = 'SELECT * FROM peminjaman WHERE id_peminjaman = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil detail peminjaman', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    res.json(results[0]);
  });
}

// Memperbarui data peminjaman berdasarkan ID
function updatePeminjaman(req, res) {
  const { id } = req.params;
  const { id_buku, tanggal_pinjam, tanggal_kembali } = req.body;
  const query = 'UPDATE peminjaman SET id_buku = ?, tanggal_pinjam = ?, tanggal_kembali = ? WHERE id_peminjaman = ?';
  db.query(query, [id_buku, tanggal_pinjam, tanggal_kembali, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal memperbarui data peminjaman', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    res.json({ message: 'Data peminjaman berhasil diperbarui' });
  });
}

// Menghapus data peminjaman berdasarkan ID
function deletePeminjaman(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM peminjaman WHERE id_peminjaman = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus data peminjaman', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    res.json({ message: 'Peminjaman berhasil dihapus' });
  });
}

module.exports = {getPeminjamanById, addPeminjaman, updatePeminjaman, deletePeminjaman,};