const express = require('express');
const router = express.Router();
const { verifyProduct } = require('../controllers/verifyController');

// Public route - NO authentication middleware
router.get('/verify/:qrCode', verifyProduct);

module.exports = router;
