import React, { useState } from 'react';
import API from '../services/api';
import { Sprout, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FarmerPage() {
  const [formData, setFormData] = useState({
    herbName: 'Ashwagandha',
    species: 'Withania somnifera',
    harvestDate: new Date().toISOString().split('T')[0],
    soilType: 'Organic Black Loam',
    gpsLat: '26.9124',
    gpsLng: '75.7873'
  });

  const [loading, setLoading] = useState(false);
  const [geoLocating, setGeoLocating] = useState(false);
  const [registeredBatch, setRegisteredBatch] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData({
          ...formData,
          gpsLat: pos.coords.latitude.toFixed(4),
          gpsLng: pos.coords.longitude.toFixed(4)
        });
        setGeoLocating(false);
      },
      (err) => {
        setError('Could not retrieve location: ' + err.message);
        setGeoLocating(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/register', formData);
      if (res.success) {
        setRegisteredBatch(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to register batch.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="glass-card animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--emerald-glow)', color: 'var(--emerald-light)' }}>
            <Sprout size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem' }}>Farmer Portal — Batch Registration</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Register new raw herb harvest on Hyperledger Fabric ledger
            </p>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--danger-primary)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <AlertCircle size={16} inline /> {error}
          </div>
        )}

        {registeredBatch ? (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--emerald-primary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <CheckCircle2 size={48} color="var(--emerald-light)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#fff', fontSize: '1.4rem' }}>Harvest Batch Registered On-Chain!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
              Hand off this unique Batch ID to the testing laboratory:
            </p>
            <div style={{ background: '#0b0f17', padding: '1rem', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '1.5rem', color: 'var(--emerald-light)', letterSpacing: '0.08em', display: 'inline-block' }}>
              {registeredBatch.batchId}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <button onClick={() => setRegisteredBatch(null)} className="btn btn-primary">
                Register Another Harvest Batch
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Herb Common Name</label>
                <input
                  type="text"
                  name="herbName"
                  className="form-input"
                  required
                  value={formData.herbName}
                  onChange={handleChange}
                  placeholder="e.g. Ashwagandha"
                />
              </div>

              <div className="form-group">
                <label>Botanical Species</label>
                <input
                  type="text"
                  name="species"
                  className="form-input"
                  required
                  value={formData.species}
                  onChange={handleChange}
                  placeholder="e.g. Withania somnifera"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Harvest Date</label>
                <input
                  type="date"
                  name="harvestDate"
                  className="form-input"
                  required
                  value={formData.harvestDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Soil / Cultivation Type</label>
                <select name="soilType" className="form-select" value={formData.soilType} onChange={handleChange}>
                  <option value="Organic Black Loam">Organic Black Loam</option>
                  <option value="Red Sandy Loam">Red Sandy Loam</option>
                  <option value="Mountain Soil">Mountain Soil</option>
                  <option value="Alluvial Soil">Alluvial Soil</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ margin: 0 }}>Farm GPS Coordinates</label>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="btn btn-outline-emerald"
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                >
                  <MapPin size={14} /> {geoLocating ? 'Locating...' : 'Use My GPS Location'}
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="number"
                  step="any"
                  name="gpsLat"
                  className="form-input"
                  placeholder="Latitude (e.g. 26.9124)"
                  value={formData.gpsLat}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  step="any"
                  name="gpsLng"
                  className="form-input"
                  placeholder="Longitude (e.g. 75.7873)"
                  value={formData.gpsLng}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '1rem' }}
            >
              {loading ? 'Submitting to Blockchain...' : 'Commit Harvest Batch to Ledger'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
