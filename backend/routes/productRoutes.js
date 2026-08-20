const express = require('express');
const router = express.Router();
const { createProduct, updateTransport } = require('../controllers/productController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Manufacturer creates product (triggers QR generation)
router.post('/manufacture', authenticateToken, requireRole('manufacturer', 'admin'), createProduct);

// Transport log update
router.post('/update-transport', authenticateToken, updateTransport);

module.exports = router;
