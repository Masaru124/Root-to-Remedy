'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const HerbContract = require('../lib/herbContract');
const { evaluateLabResult, canCreateProduct } = require('../lib/rules');

describe('HerbContract & Rules Engine Unit Tests', () => {
  let contract;
  let ctx;
  let stub;

  beforeEach(() => {
    contract = new HerbContract();
    stub = {
      getState: sinon.stub(),
      putState: sinon.stub().resolves()
    };
    ctx = { stub };
  });

  describe('Shared Rules Engine', () => {
    it('TC4: Purity >= 95 and contamination == 0 should yield APPROVED', () => {
      const res1 = evaluateLabResult(95, 0);
      const res2 = evaluateLabResult(99.2, 0);
      expect(res1).to.equal('APPROVED');
      expect(res2).to.equal('APPROVED');
    });

    it('TC5: Purity < 95 or contamination > 0 should yield REJECTED', () => {
      const res1 = evaluateLabResult(94.9, 0);
      const res2 = evaluateLabResult(98, 1);
      expect(res1).to.equal('REJECTED');
      expect(res2).to.equal('REJECTED');
    });

    it('TC8/TC9: Block product creation if batch is not APPROVED', () => {
      expect(() => canCreateProduct('PENDING')).to.throw(/Cannot create product/);
      expect(() => canCreateProduct('REJECTED')).to.throw(/Cannot create product/);
      expect(canCreateProduct('APPROVED')).to.be.true;
    });
  });

  describe('RegisterBatch', () => {
    it('should register a new batch successfully', async () => {
      stub.getState.withArgs('BATCH-001').resolves(null);

      const resStr = await contract.RegisterBatch(
        ctx, 'BATCH-001', 'Ashwagandha', '26.9124', '75.7873', 'Withania somnifera', '2026-08-01', 'Organic Loam'
      );

      const res = JSON.parse(resStr);
      expect(res.batchId).to.equal('BATCH-001');
      expect(res.status).to.equal('PENDING');
      expect(stub.putState.calledOnce).to.be.true;
    });

    it('should reject duplicate batch registration', async () => {
      stub.getState.withArgs('BATCH-001').resolves(Buffer.from(JSON.stringify({ batchId: 'BATCH-001' })));

      try {
        await contract.RegisterBatch(ctx, 'BATCH-001', 'Ashwagandha', '26.9', '75.7', 'Species', '2026-08-01', 'Soil');
        expect.fail('Should have thrown error');
      } catch (err) {
        expect(err.message).to.include('already exists');
      }
    });
  });

  describe('UploadLabReport', () => {
    it('should update batch status to APPROVED on passing lab test', async () => {
      const mockBatch = {
        batchId: 'BATCH-001',
        status: 'PENDING',
        labReport: {}
      };
      stub.getState.withArgs('BATCH-001').resolves(Buffer.from(JSON.stringify(mockBatch)));

      const resStr = await contract.UploadLabReport(ctx, 'BATCH-001', 'QmIpfsHash123', 97.5, 0);
      const res = JSON.parse(resStr);

      expect(res.status).to.equal('APPROVED');
      expect(res.labReport.ipfsHash).to.equal('QmIpfsHash123');
      expect(res.labReport.purity).to.equal(97.5);
    });

    it('should update batch status to REJECTED on failing purity threshold', async () => {
      const mockBatch = {
        batchId: 'BATCH-002',
        status: 'PENDING',
        labReport: {}
      };
      stub.getState.withArgs('BATCH-002').resolves(Buffer.from(JSON.stringify(mockBatch)));

      const resStr = await contract.UploadLabReport(ctx, 'BATCH-002', 'QmIpfsHash456', 91.0, 0);
      const res = JSON.parse(resStr);

      expect(res.status).to.equal('REJECTED');
    });
  });

  describe('CreateProduct', () => {
    it('should allow product creation from an APPROVED batch', async () => {
      const approvedBatch = { batchId: 'BATCH-001', status: 'APPROVED' };
      stub.getState.withArgs('PROD-100').resolves(null);
      stub.getState.withArgs('BATCH-001').resolves(Buffer.from(JSON.stringify(approvedBatch)));

      const resStr = await contract.CreateProduct(ctx, 'PROD-100', 'BATCH-001', 'Organic Ashwagandha Powder');
      const res = JSON.parse(resStr);

      expect(res.productId).to.equal('PROD-100');
      expect(res.batchId).to.equal('BATCH-001');
    });

    it('should reject product creation from a REJECTED batch', async () => {
      const rejectedBatch = { batchId: 'BATCH-002', status: 'REJECTED' };
      stub.getState.withArgs('PROD-101').resolves(null);
      stub.getState.withArgs('BATCH-002').resolves(Buffer.from(JSON.stringify(rejectedBatch)));

      try {
        await contract.CreateProduct(ctx, 'PROD-101', 'BATCH-002', 'Failed Product');
        expect.fail('Should have thrown approval error');
      } catch (err) {
        expect(err.message).to.include('Cannot create product');
      }
    });
  });

  describe('UpdateTransport', () => {
    it('should append transport history entry without overwriting previous logs', async () => {
      const mockBatch = {
        batchId: 'BATCH-001',
        transportHistory: [{ temperature: 22, location: 'Farm', timestamp: '2026-08-01' }]
      };
      stub.getState.withArgs('BATCH-001').resolves(Buffer.from(JSON.stringify(mockBatch)));

      await contract.UpdateTransport(ctx, 'BATCH-001', 20, 'Lab Facility', 'In Transit');

      const savedBatch = JSON.parse(stub.putState.firstCall.args[1].toString());
      expect(savedBatch.transportHistory).to.have.lengthOf(2);
      expect(savedBatch.transportHistory[1].location).to.equal('Lab Facility');
    });
  });

  describe('VerifyProduct', () => {
    it('should return full composite verification object for valid product QR', async () => {
      const product = { docType: 'product', productId: 'PROD-100', batchId: 'BATCH-001' };
      const batch = { docType: 'batch', batchId: 'BATCH-001', status: 'APPROVED' };

      stub.getState.withArgs('PROD-100').resolves(Buffer.from(JSON.stringify(product)));
      stub.getState.withArgs('BATCH-001').resolves(Buffer.from(JSON.stringify(batch)));

      const resStr = await contract.VerifyProduct(ctx, 'PROD-100');
      const res = JSON.parse(resStr);

      expect(res.verified).to.be.true;
      expect(res.product.productId).to.equal('PROD-100');
      expect(res.batch.batchId).to.equal('BATCH-001');
    });
  });
});
