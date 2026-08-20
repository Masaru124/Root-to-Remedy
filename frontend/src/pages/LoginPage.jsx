import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Sprout, TestTube2, Factory, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/login', { email, password, role });
      if (res.success) {
        loginUser(res.data.user, res.data.token);
        // Redirect by role
        if (res.data.user.role === 'farmer') navigate('/farmer');
        else if (res.data.user.role === 'lab') navigate('/lab');
        else if (res.data.user.role === 'manufacturer') navigate('/manufacturer');
        else navigate('/verify');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('password123');
    setRole(demoRole);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '4rem auto 2rem', padding: '0 1rem' }}>
      <div className="glass-card animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--emerald-light)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
            Root-to-Remedy Ecosystem
          </span>
          <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem' }}>Sign In to Portal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            Select your organization role to manage botanical batches.
          </p>
        </div>

        {/* Quick Demo Preset Personas */}
        <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚡ Fast Demo Persona Login:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <button
              type="button"
              className={`btn ${role === 'farmer' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 0.2rem', fontSize: '0.75rem', flexDirection: 'column' }}
              onClick={() => handleQuickDemo('farmer@herbs.org', 'farmer')}
            >
              <Sprout size={16} /> Farmer
            </button>

            <button
              type="button"
              className={`btn ${role === 'lab' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 0.2rem', fontSize: '0.75rem', flexDirection: 'column' }}
              onClick={() => handleQuickDemo('lab@ayurveda.com', 'lab')}
            >
              <TestTube2 size={16} /> Lab Tech
            </button>

            <button
              type="button"
              className={`btn ${role === 'manufacturer' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 0.2rem', fontSize: '0.75rem', flexDirection: 'column' }}
              onClick={() => handleQuickDemo('mfr@ayurveda.com', 'manufacturer')}
            >
              <Factory size={16} /> Manufacturer
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--danger-primary)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontSize: '1rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
