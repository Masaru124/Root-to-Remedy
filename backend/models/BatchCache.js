const mongoose = require('mongoose');

const batchCacheSchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: true,
    unique: true
  },
  herbName: String,
  species: String,
  gpsLat: Number,
  gpsLng: Number,
  harvestDate: String,
  soilType: String,
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  labReport: {
    ipfsHash: String,
    purity: Number,
    contamination: Number,
    uploadedAt: String
  },
  transportHistory: Array,
  createdBy: String,
  syncedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BatchCache', batchCacheSchema);
