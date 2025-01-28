const express = require('express');
const { getMembers, registerMember, getMemberById, updateMember, deleteMember } = require('../controllers/anggotaController');
const router = express.Router();

router.get('/', getMembers); // Mendapatkan semua anggota
router.post('/', registerMember); // Registrasi anggota baru
router.get('/:id', getMemberById); // Mendapatkan anggota berdasarkan ID
router.put('/:id', updateMember); // Memperbarui anggota berdasarkan ID
router.delete('/:id', deleteMember); // Menghapus anggota berdasarkan ID

module.exports = router;
