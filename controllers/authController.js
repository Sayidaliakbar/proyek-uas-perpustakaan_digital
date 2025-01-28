const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Login pengguna
function login(req, res) {
  const { email, password } = req.body;

  const query = 'SELECT * FROM anggota WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

    const user = results[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ id: user.id_anggota, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.json({ token });
  });
}

module.exports = { login };
