const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadLabReport } = require('../controllers/labController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Lab role uploads test report PDF
router.post('/upload-lab', authenticateToken, requireRole('lab', 'admin'), upload.single('reportPdf'), uploadLabReport);

module.exports = router;
