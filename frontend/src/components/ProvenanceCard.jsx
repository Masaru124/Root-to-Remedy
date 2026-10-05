import React from 'react';
import StatusBadge from './StatusBadge';
import { MapPin, ShieldCheck, FileText, Calendar, Sprout, TestTube2, Factory, Truck, ExternalLink } from 'lucide-react';

export default function ProvenanceCard({ data }) {
  if (!data || (!data.verified && !data.product && !data.batch)) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ color: 'var(--danger-primary)', marginBottom: '0.5rem' }}>Provenance Record Not Found</h3>
        <p style={{ color: 'var(--text-muted)' }}>This product code could not be verified on the ledger.</p>
      </div>
    );
  }

  const { product, batch } = data;
  const isApproved = batch?.status === 'APPROVED';

  // Construct Google Maps link for GPS pin
  const mapsUrl = (batch?.gpsLat && batch?.gpsLng)
    ? `https://www.google.com/maps/search/?api=1&query=${batch.gpsLat},${batch.gpsLng}`
    : null;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Verification Header Banner */}
      <div className="glass-card" style={{
        borderColor: isApproved ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)',
        background: isApproved
          ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0%, rgba(18, 24, 36, 0.9) 100%)'
          : 'linear-gradient(180deg, rgba(239, 68, 68, 0.12) 0%, rgba(18, 24, 36, 0.9) 100%)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600 }}>
              Verified Blockchain Record
            </span>
            <h2 style={{ fontSize: '1.6rem', marginTop: '0.2rem' }}>
              {product ? product.productName : batch?.herbName}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--emerald-light)', fontFamily: 'monospace' }}>
                ID: {product ? product.productId : batch?.batchId}
              </span>
              <StatusBadge status={batch?.status} />
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: isApproved ? 'var(--emerald-light)' : '#fca5a5', fontWeight: 700, fontSize: '0.9rem' }}>
              <ShieldCheck size={20} /> {isApproved ? 'Authenticity & Purity Verified' : 'Purity Verification Failed'}
            </div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
              Ledger Source of Truth
            </span>
          </div>
        </div>
      </div>

      {/* Main Provenance Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        
        {/* Farm & Origin Card */}
        <div className="glass-card">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald-light)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
            <Sprout size={18} /> Farm Origin & Botanical Info
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Herb Name & Species</span>
              <strong>{batch?.herbName}</strong> <em style={{ color: 'var(--text-muted)' }}>({batch?.species})</em>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Harvest Date</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} color="var(--emerald-light)" /> {batch?.harvestDate}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Soil & Farming Type</span>
              <span>{batch?.soilType}</span>
            </div>
            {mapsUrl && (
              <div style={{ marginTop: '0.4rem' }}>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-emerald" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'inline-flex' }}>
                  <MapPin size={14} /> View GPS Location Pin ({batch.gpsLat}, {batch.gpsLng}) <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Lab Testing Card */}
        <div className="glass-card">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald-light)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
            <TestTube2 size={18} /> Lab Analysis & Purity Report
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Purity Result</span>
              <strong style={{ fontSize: '1.2rem', color: (batch?.labReport?.purity >= 95) ? 'var(--emerald-light)' : 'var(--danger-primary)' }}>
                {batch?.labReport?.purity ? `${batch.labReport.purity}% Purity` : 'Pending'}
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>
                (Threshold rule: Purity ≥ 95% AND Contamination == 0)
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Contamination Flag</span>
              <span>{batch?.labReport?.contamination === 0 ? '0 (Clean / Zero Toxins)' : batch?.labReport?.contamination || 'N/A'}</span>
            </div>
            {batch?.labReport?.ipfsHash && (
              <div style={{ marginTop: '0.4rem' }}>
                <a href={`https://gateway.pinata.cloud/ipfs/${batch.labReport.ipfsHash}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'inline-flex' }}>
                  <FileText size={14} /> View IPFS Lab Certificate (CID: {batch.labReport.ipfsHash.substring(0, 10)}...) <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Supply Chain Timeline */}
      <div className="glass-card" style={{ marginTop: '1.5rem' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald-light)', marginBottom: '1.5rem' }}>
          <Truck size={18} /> Immutable Supply Chain Journey
        </h4>
        <div className="timeline-track">
          
          <div className="timeline-step active">
            <div className="timeline-icon"><Sprout size={16} /></div>
            <div>
              <h5 style={{ fontSize: '1rem', color: '#fff' }}>1. Harvest & Registration</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Batch registered by farmer on Hyperledger Fabric ledger.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {batch?.createdAt ? new Date(batch.createdAt).toLocaleString() : batch?.harvestDate}
              </span>
            </div>
          </div>

          <div className={`timeline-step ${batch?.labReport?.uploadedAt ? 'active' : ''}`}>
            <div className="timeline-icon"><TestTube2 size={16} /></div>
            <div>
              <h5 style={{ fontSize: '1rem', color: '#fff' }}>2. Lab Purity Verification</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {batch?.labReport?.uploadedAt
                  ? `Lab PDF uploaded to IPFS. Status evaluated to ${batch.status}.`
                  : 'Pending lab testing.'}
              </p>
            </div>
          </div>

          {product && (
            <div className="timeline-step active">
              <div className="timeline-icon"><Factory size={16} /></div>
              <div>
                <h5 style={{ fontSize: '1rem', color: '#fff' }}>3. Product Manufacturing</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Finished product "{product.productName}" created from approved batch. QR payload encoded.
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {new Date(product.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {batch?.transportHistory && batch.transportHistory.map((t, idx) => (
            <div key={idx} className="timeline-step active">
              <div className="timeline-icon"><Truck size={16} /></div>
              <div>
                <h5 style={{ fontSize: '1rem', color: '#fff' }}>Transport Update ({t.location})</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Status: {t.status} | Temperature: {t.temperature}°C
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {new Date(t.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
