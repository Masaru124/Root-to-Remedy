import React, { useEffect, useState } from 'react';
import API from '../services/api';
import StatusBadge from '../components/StatusBadge';
import { TestTube2, Upload, FileCheck, AlertCircle, RefreshCw } from 'lucide-react';

export default function LabPage() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const res = await API.get('/batch/all');
      if (res.success) {
        setBatches(res.data);
      }
    } catch (err) {
      setError('Could not load batches: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleLabSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!selectedBatch) {
      setError('Please select a batch from the queue.');
      return;
    }

    if (!pdfFile) {
      setError('Please select an analytical Certificate of Analysis (CoA) PDF.');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('batchId', selectedBatch.batchId);
      formData.append('reportPdf', pdfFile);

      const res = await API.post('/upload-lab', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.success) {
        const purity = res.data.purity ?? res.data.labReport?.purity;
        const contam = res.data.contamination ?? res.data.labReport?.contamination;
        const qty = res.data.coaWeightKg ?? res.data.batchQuantityKg ?? res.data.labReport?.coaWeightMg / 1000000;
        setMessage(`CoA Verified! Evaluated Status: ${res.data.status} (Purity: ${purity}%, Contamination: ${contam}, Tested Qty: ${qty}kg)`);
        setSelectedBatch(null);
        setPdfFile(null);
        fetchBatches();
      }
    } catch (err) {
      setError(err.message || 'Lab report submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <TestTube2 color="var(--emerald-light)" /> Laboratory Analysis Portal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Upload content-addressed IPFS lab report PDFs and evaluate batch purity thresholds
          </p>
        </div>
        <button onClick={fetchBatches} className="btn btn-secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
          <RefreshCw size={14} /> Refresh Queue
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--danger-primary)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
          <AlertCircle size={16} inline /> {error}
        </div>
      )}

      {message && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--emerald-primary)', color: 'var(--emerald-light)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
          <FileCheck size={16} inline /> {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        
        {/* Batches Table List */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Pending Harvest Queue</h3>
          
          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading batches...</p>
          ) : batches.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No registered batches found. Use Farmer Portal to create a batch first.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Batch ID</th>
                    <th>Herb</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((b) => (
                    <tr key={b.batchId} style={{ background: selectedBatch?.batchId === b.batchId ? 'rgba(16, 185, 129, 0.1)' : 'transparent' }}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--emerald-light)' }}>{b.batchId}</td>
                      <td>
                        <strong>{b.herbName}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)' }}>{b.species}</span>
                      </td>
                      <td><StatusBadge status={b.status} /></td>
                      <td>
                        <button
                          onClick={() => setSelectedBatch(b)}
                          className="btn btn-outline-emerald"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lab Testing Form */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Upload & Evaluate Test</h3>

          {selectedBatch ? (
            <form onSubmit={handleLabSubmit}>
              <div style={{ background: 'rgba(11, 15, 23, 0.6)', padding: '0.8rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Target Batch</span>
                <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: 'var(--emerald-light)' }}>
                  {selectedBatch.batchId}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {selectedBatch.herbName} ({selectedBatch.species})
                </div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid var(--border-color)', padding: '0.8rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--emerald-light)', display: 'block', marginBottom: '0.3rem' }}>
                  Automated Cryptographic & Analytical CoA Extraction
                </strong>
                Purity, Contamination, and Batch Quantity are extracted directly from the signed PDF document layer. Values cannot be manually typed or falsified.
                <ul style={{ margin: '0.4rem 0 0 1rem', padding: 0, fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  <li>Purity ≥ 95.0% required for APPROVED status.</li>
                  <li>Contamination count must be exactly 0.</li>
                  <li>Usable ledger biomass will be clamped to min(farmer weight, lab weight).</li>
                </ul>
              </div>

              <div className="form-group">
                <label>Upload Official Certificate of Analysis (CoA PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  className="form-input"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  style={{ padding: '0.5rem' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
                style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}
              >
                {submitting ? 'Uploading to IPFS & Ledger...' : 'Commit Lab Result to Chain'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <Upload size={36} color="var(--text-dim)" style={{ marginBottom: '0.5rem' }} />
              <p>Select a harvest batch from the left queue to upload PDF lab results.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
