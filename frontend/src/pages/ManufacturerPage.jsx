import React, { useEffect, useState } from 'react';
import API from '../services/api';
import StatusBadge from '../components/StatusBadge';
import { Factory, QrCode, Download, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ManufacturerPage() {
  const [approvedBatches, setApprovedBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [productName, setProductName] = useState('Organic Ashwagandha Extract Capsules');
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);
  const [error, setError] = useState('');

  const fetchApprovedBatches = async () => {
    setLoading(true);
    try {
      const res = await API.get('/batch/approved');
      if (res.success) {
        setApprovedBatches(res.data);
        if (res.data.length > 0) {
          setSelectedBatchId(res.data[0].batchId);
        }
      }
    } catch (err) {
      setError('Could not fetch approved batches: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedBatches();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setError('');
    setCreatedProduct(null);

    if (!selectedBatchId) {
      setError('Please select an APPROVED batch.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await API.post('/manufacture', {
        batchId: selectedBatchId,
        productName
      });

      if (res.success) {
        setCreatedProduct(res.data);
      }
    } catch (err) {
      setError(err.message || 'Product creation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="glass-card animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--emerald-glow)', color: 'var(--emerald-light)' }}>
            <Factory size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem' }}>Manufacturer Portal — Product Creation</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Create retail products strictly from lab-APPROVED herb batches & generate packaging QR codes
            </p>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--danger-primary)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <AlertCircle size={16} inline /> {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          
          {/* Creation Form */}
          <div>
            <form onSubmit={handleCreateProduct}>
              <div className="form-group">
                <label>Select Lab-APPROVED Raw Herb Batch</label>
                {loading ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading approved catalog...</p>
                ) : approvedBatches.length === 0 ? (
                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--gold-primary)', padding: '0.8rem', borderRadius: 'var(--radius-sm)', color: 'var(--gold-light)', fontSize: '0.85rem' }}>
                    No APPROVED batches available. Upload a passing lab test in the Lab Portal first.
                  </div>
                ) : (
                  <select
                    className="form-select"
                    value={selectedBatchId}
                    onChange={(e) => setSelectedBatchId(e.target.value)}
                  >
                    {approvedBatches.map((b) => (
                      <option key={b.batchId} value={b.batchId}>
                        {b.batchId} — {b.herbName} (Purity: {b.labReport?.purity}%)
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="form-group">
                <label>Retail Product Commercial Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Organic Ashwagandha Extract Capsules"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || approvedBatches.length === 0}
                style={{ width: '100%', padding: '0.85rem', marginTop: '1rem', fontSize: '0.95rem' }}
              >
                {submitting ? 'Verifying Batch & Generating QR...' : 'Create Product & Render QR Code'}
              </button>
            </form>
          </div>

          {/* Generated QR Code Card */}
          <div style={{ background: 'rgba(11, 15, 23, 0.6)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--emerald-light)' }}>
              Product Packaging QR Code
            </h4>
            
            {createdProduct ? (
              <div className="animate-fade-in">
                <div style={{ background: '#fff', padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'inline-block', margin: '1rem 0' }}>
                  <img src={createdProduct.qrCodeDataUrl} alt="Product QR Code" style={{ width: '180px', height: '180px', display: 'block' }} />
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700, color: 'var(--emerald-light)', marginBottom: '0.2rem' }}>
                  {createdProduct.productId}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {createdProduct.productName}
                </p>
                <a
                  href={createdProduct.qrCodeDataUrl}
                  download={`${createdProduct.productId}_QR.png`}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}
                >
                  <Download size={16} /> Download High-Res PNG QR
                </a>
              </div>
            ) : (
              <div style={{ padding: '2rem 1rem', color: 'var(--text-dim)' }}>
                <QrCode size={48} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.85rem' }}>Select an approved batch and click Create Product to render a downloadable QR image.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
