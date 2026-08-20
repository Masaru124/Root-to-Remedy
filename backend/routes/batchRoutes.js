const express = require('express');
const router = express.Router();
const { registerBatch, getAllBatches, getBatchById } = require('../controllers/batchController');
const { getApprovedBatches } = require('../controllers/productController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Farmer registers batch
router.post('/register', authenticateToken, requireRole('farmer', 'admin'), registerBatch);

// Query batches (Lab, Manufacturer, Admin)
router.get('/batch/all', authenticateToken, getAllBatches);
router.get('/batch/approved', authenticateToken, requireRole('manufacturer', 'admin'), getApprovedBatches);
router.get('/batch/:batchId', authenticateToken, getBatchById);

module.exports = router;
