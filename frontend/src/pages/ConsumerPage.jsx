import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import QRScanner from '../components/QRScanner';
import ProvenanceCard from '../components/ProvenanceCard';
import { ShieldCheck, Search, ArrowLeft } from 'lucide-react';

export default function ConsumerPage() {
  const { qrCode: urlQrCode } = useParams();
  const navigate = useNavigate();

  const [activeCode, setActiveCode] = useState(urlQrCode || '');
  const [provenanceData, setProvenanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProvenance = async (code) => {
    if (!code) return;
    setLoading(true);
    setError('');
    try {
      const res = await API.get(`/verify/${code}`);
      if (res.success) {
        setProvenanceData(res.data);
      }
    } catch (err) {
      setError(err.message || 'No provenance record found on ledger.');
      setProvenanceData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlQrCode) {
      setActiveCode(urlQrCode);
      fetchProvenance(urlQrCode);
    }
  }, [urlQrCode]);

  const handleScanSuccess = (scannedCode) => {
    setActiveCode(scannedCode);
    navigate(`/verify/${scannedCode}`);
    fetchProvenance(scannedCode);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1rem', borderRadius: '50px', background: 'var(--emerald-glow)', color: 'var(--emerald-light)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
          <ShieldCheck size={16} /> Public Tamper-Evident Verification
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Botanical Supply Chain Provenance
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Scan a product QR code or enter a batch ID to inspect origin GPS, lab purity certificates, and transport history on the Hyperledger Fabric ledger.
        </p>
      </div>

      {/* Scanner Control */}
      {!provenanceData && (
        <div style={{ marginBottom: '2rem' }}>
          <QRScanner onScanSuccess={handleScanSuccess} />
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--emerald-light)' }}>
            Querying Hyperledger Fabric Ledger...
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem', maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ color: 'var(--danger-primary)', marginBottom: '0.5rem' }}>Record Verification Failed</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
          <button onClick={() => { setProvenanceData(null); setError(''); navigate('/verify'); }} className="btn btn-secondary">
            <Search size={16} /> Try Another QR Code
          </button>
        </div>
      )}

      {/* Render Provenance Results */}
      {provenanceData && !loading && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button onClick={() => { setProvenanceData(null); navigate('/verify'); }} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
              <ArrowLeft size={16} /> Scan Another Code
            </button>
          </div>
          <ProvenanceCard data={provenanceData} />
        </div>
      )}

    </div>
  );
}
