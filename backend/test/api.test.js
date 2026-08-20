const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');

describe('Backend REST API Integration Tests', () => {
  let farmerToken;
  let labToken;
  let mfrToken;
  let testBatchId;
  let approvedBatchId;
  let rejectedBatchId;
  let testProductId;

  before(async () => {
    // Obtain farmer token
    const resFarmer = await request(app)
      .post('/api/login')
      .send({ email: 'farmer@herbs.org', password: 'password123', role: 'farmer' });
    farmerToken = resFarmer.body.data.token;

    // Obtain lab token
    const resLab = await request(app)
      .post('/api/login')
      .send({ email: 'lab@ayurveda.com', password: 'password123', role: 'lab' });
    labToken = resLab.body.data.token;

    // Obtain manufacturer token
    const resMfr = await request(app)
      .post('/api/login')
      .send({ email: 'mfr@ayurveda.com', password: 'password123', role: 'manufacturer' });
    mfrToken = resMfr.body.data.token;
  });

  describe('POST /api/login', () => {
    it('should return a valid JWT token on correct credentials', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: 'farmer@herbs.org', password: 'password123' });
      expect(res.status).to.equal(200);
      expect(res.body.success).to.be.true;
      expect(res.body.data.token).to.be.a('string');
    });
  });

  describe('POST /api/register (Farmer Batch Creation)', () => {
    it('should allow Farmer role to register a harvest batch', async () => {
      const res = await request(app)
        .post('/api/register')
        .set('Authorization', `Bearer ${farmerToken}`)
        .send({
          herbName: 'Ashwagandha',
          species: 'Withania somnifera',
          harvestDate: '2026-08-15',
          soilType: 'Organic Red Soil',
          gpsLat: 26.9124,
          gpsLng: 75.7873
        });

      expect(res.status).to.equal(201);
      expect(res.body.success).to.be.true;
      expect(res.body.data.batchId).to.be.a('string');
      expect(res.body.data.status).to.equal('PENDING');
      testBatchId = res.body.data.batchId;
    });

    it('TC8: should reject unauthorized roles from registering a batch', async () => {
      const res = await request(app)
        .post('/api/register')
        .set('Authorization', `Bearer ${labToken}`)
        .send({
          herbName: 'Tulsi',
          species: 'Ocimum sanctum',
          harvestDate: '2026-08-15',
          soilType: 'Loam'
        });

      expect(res.status).to.equal(403);
      expect(res.body.success).to.be.false;
    });
  });

  describe('POST /api/upload-lab (Lab Test Upload)', () => {
    it('TC4: should evaluate batch to APPROVED on purity >= 95 and zero contamination', async () => {
      // Register batch for approval test
      const resBatch = await request(app)
        .post('/api/register')
        .set('Authorization', `Bearer ${farmerToken}`)
        .send({ herbName: 'Shatavari', species: 'Asparagus racemosus', harvestDate: '2026-08-10', soilType: 'Clay' });
      approvedBatchId = resBatch.body.data.batchId;

      const res = await request(app)
        .post('/api/upload-lab')
        .set('Authorization', `Bearer ${labToken}`)
        .field('batchId', approvedBatchId)
        .field('purity', 97.5)
        .field('contamination', 0)
        .attach('reportPdf', Buffer.from('%PDF-1.4 Mock PDF Content'), 'lab_report.pdf');

      expect(res.status).to.equal(200);
      expect(res.body.data.status).to.equal('APPROVED');
      expect(res.body.data.labReport.ipfsHash).to.be.a('string');
    });

    it('TC5: should evaluate batch to REJECTED on purity < 95', async () => {
      // Register batch for rejection test
      const resBatch = await request(app)
        .post('/api/register')
        .set('Authorization', `Bearer ${farmerToken}`)
        .send({ herbName: 'Brahmi', species: 'Bacopa monnieri', harvestDate: '2026-08-10', soilType: 'Wetland' });
      rejectedBatchId = resBatch.body.data.batchId;

      const res = await request(app)
        .post('/api/upload-lab')
        .set('Authorization', `Bearer ${labToken}`)
        .field('batchId', rejectedBatchId)
        .field('purity', 91.0)
        .field('contamination', 0)
        .attach('reportPdf', Buffer.from('%PDF-1.4 Mock PDF Content'), 'lab_report.pdf');

      expect(res.status).to.equal(200);
      expect(res.body.data.status).to.equal('REJECTED');
    });
  });

  describe('POST /api/manufacture (Product Creation & QR)', () => {
    it('should create product and generate QR code for APPROVED batch', async () => {
      const res = await request(app)
        .post('/api/manufacture')
        .set('Authorization', `Bearer ${mfrToken}`)
        .send({
          batchId: approvedBatchId,
          productName: 'Organic Shatavari Extract Capsules'
        });

      expect(res.status).to.equal(201);
      expect(res.body.success).to.be.true;
      expect(res.body.data.productId).to.be.a('string');
      expect(res.body.data.qrCodeDataUrl).to.include('data:image/png;base64');
      testProductId = res.body.data.productId;
    });

    it('TC8/TC9: should REJECT product creation for REJECTED batch', async () => {
      const res = await request(app)
        .post('/api/manufacture')
        .set('Authorization', `Bearer ${mfrToken}`)
        .send({
          batchId: rejectedBatchId,
          productName: 'Failed Brahmi Tonic'
        });

      expect(res.status).to.equal(400);
      expect(res.body.success).to.be.false;
      expect(res.body.error).to.include('Cannot create product');
    });
  });

  describe('GET /api/verify/:qrCode (Public Consumer Verification)', () => {
    it('should return complete provenance record without login requirement', async () => {
      const res = await request(app).get(`/api/verify/${testProductId}`);
      expect(res.status).to.equal(200);
      expect(res.body.success).to.be.true;
      expect(res.body.data.verified).to.be.true;
      expect(res.body.data.product.productId).to.equal(testProductId);
      expect(res.body.data.batch.batchId).to.equal(approvedBatchId);
      expect(res.body.data.batch.status).to.equal('APPROVED');
    });
  });
});
