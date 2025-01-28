const db = require('../config/db');
const bcrypt = require('bcrypt');

function getMembers(req, res) {
  const query = 'SELECT * FROM anggota';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data anggota', error: err });
    res.json(results);
  });
}

async function registerMember(req, res) {
  const { nama, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO anggota (nama, email, password) VALUES (?, ?, ?)';
  db.query(query, [nama, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal mendaftarkan anggota', error: err });
    res.status(201).json({ message: 'Anggota berhasil terdaftar', id: result.insertId });
  });
}

function getMemberById(req, res) {
  const { id } = req.params;
  const query = 'SELECT * FROM anggota WHERE id_anggota = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil detail anggota', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Anggota tidak ditemukan' });
    res.json(results[0]);
  });
}

async function updateMember(req, res) {
  const { id } = req.params;
  const { nama, email, password } = req.body;

  let hashedPassword = null;
  if (password) hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    UPDATE anggota 
    SET nama = ?, email = ?, password = COALESCE(?, password) 
    WHERE id_anggota = ?`; // Ganti 'id' dengan 'id_anggota'
  
  db.query(query, [nama, email, hashedPassword, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal memperbarui anggota', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Anggota tidak ditemukan' });
    res.json({ message: 'Anggota berhasil diperbarui', affectedRows: result.affectedRows });
  });
}


function deleteMember(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM anggota WHERE id_anggota = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menghapus anggota', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Anggota tidak ditemukan' });
    res.json({ message: 'Anggota berhasil dihapus', affectedRows: result.affectedRows });
  });
}

module.exports = { getMembers, registerMember, getMemberById, updateMember, deleteMember };