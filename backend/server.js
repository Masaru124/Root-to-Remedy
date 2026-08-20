require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { getFabricGateway } = require('./config/fabricConnection');

const authRoutes = require('./routes/authRoutes');
const batchRoutes = require('./routes/batchRoutes');
const labRoutes = require('./routes/labRoutes');
const productRoutes = require('./routes/productRoutes');
const verifyRoutes = require('./routes/verifyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB (graceful fallback)
connectDB();

// Initialize Fabric Gateway driver
getFabricGateway();

// Mount Routes
app.use('/api', authRoutes);
app.use('/api', batchRoutes);
app.use('/api', labRoutes);
app.use('/api', productRoutes);
app.use('/api', verifyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'Root-to-Remedy Traceability API',
    fabricMode: process.env.FABRIC_MODE || 'mock',
    ipfsMode: process.env.IPFS_MODE || 'pinata',
    timestamp: new Date().toISOString()
  });
});

// Global 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Root-to-Remedy Backend] Running on http://localhost:${PORT}`);
  });
}

module.exports = app;
