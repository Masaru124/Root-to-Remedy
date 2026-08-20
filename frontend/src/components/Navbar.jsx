import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LogOut, ShieldCheck, QrCode, UserCheck } from 'lucide-react';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'rgba(11, 15, 23, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0.9rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--emerald-primary), var(--emerald-dark))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px var(--emerald-glow)'
          }}>
            <Leaf size={22} color="#fff" />
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1 }}>
              Root-to-Remedy
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--emerald-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Botanical Provenance
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link
            to="/verify"
            className={location.pathname === '/verify' ? 'btn btn-outline-emerald' : 'btn btn-secondary'}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            <QrCode size={16} /> Public QR Scanner
          </Link>

          {user && (
            <>
              {user.role === 'farmer' && (
                <Link to="/farmer" style={{ color: location.pathname === '/farmer' ? 'var(--emerald-light)' : 'var(--text-muted)', fontWeight: 600 }}>
                  Farmer Portal
                </Link>
              )}
              {user.role === 'lab' && (
                <Link to="/lab" style={{ color: location.pathname === '/lab' ? 'var(--emerald-light)' : 'var(--text-muted)', fontWeight: 600 }}>
                  Lab Portal
                </Link>
              )}
              {user.role === 'manufacturer' && (
                <Link to="/manufacturer" style={{ color: location.pathname === '/manufacturer' ? 'var(--emerald-light)' : 'var(--text-muted)', fontWeight: 600 }}>
                  Manufacturer Portal
                </Link>
              )}
            </>
          )}
        </div>

        {/* Right User Auth Controls */}
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
                  {user.name}
                </span>
                <span className={`badge badge-${user.role === 'lab' ? 'pending' : user.role === 'manufacturer' ? 'approved' : 'approved'}`} style={{ fontSize: '0.68rem', padding: '0.1rem 0.5rem' }}>
                  <UserCheck size={10} /> {user.role.toUpperCase()}
                </span>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }} title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
              Portal Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
