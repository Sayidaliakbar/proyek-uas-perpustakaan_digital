const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Memuat variabel lingkungan dari file .env

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'perpustakaan_digital', // nama databes ini harus sesuai dengan yang ada di database xampp
});

// Tes koneksi
db.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err);
    process.exit(1); // Keluar jika koneksi gagal
  }
  console.log('Terhubung ke database perpustakaan digital.');
});

module.exports = db;
