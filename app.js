const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Load Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Koneksi ke Database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'perpustakaan_digital',
});

db.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err);
    process.exit(1);
  }
  console.log('Terhubung ke database MySQL.');
});

// Routes
const bukuRoutes = require('./routes/buku');
const kategoriRoutes = require('./routes/kategori');
const anggotaRoutes = require('./routes/anggota');
const peminjamanRoutes = require('./routes/peminjaman');
const authRoutes = require('./routes/auth');

app.use('/buku', bukuRoutes); // Endpoint untuk Buku
app.use('/kategori', kategoriRoutes); // Endpoint untuk Kategori
app.use('/anggota', anggotaRoutes); // Endpoint untuk Anggota
app.use('/peminjaman', peminjamanRoutes); // Endpoint untuk Peminjaman
app.use('/auth', authRoutes); // Daftarkan endpoint login


// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});