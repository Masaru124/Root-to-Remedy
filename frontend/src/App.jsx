import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import FarmerPage from './pages/FarmerPage';
import LabPage from './pages/LabPage';
import ManufacturerPage from './pages/ManufacturerPage';
import ConsumerPage from './pages/ConsumerPage';

// Protected Route Guard Wrapper
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/verify" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1, paddingBottom: '3rem' }}>
            <Routes>
              {/* Public Routes - No Auth Required */}
              <Route path="/" element={<ConsumerPage />} />
              <Route path="/verify" element={<ConsumerPage />} />
              <Route path="/verify/:qrCode" element={<ConsumerPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Role-Gated Routes */}
              <Route
                path="/farmer"
                element={
                  <ProtectedRoute allowedRoles={['farmer', 'admin']}>
                    <FarmerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lab"
                element={
                  <ProtectedRoute allowedRoles={['lab', 'admin']}>
                    <LabPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manufacturer"
                element={
                  <ProtectedRoute allowedRoles={['manufacturer', 'admin']}>
                    <ManufacturerPage />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect to public verify page */}
              <Route path="*" element={<Navigate to="/verify" replace />} />
            </Routes>
          </main>
          
          <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            Root-to-Remedy: Botanical Traceability System &copy; 2026. Hyperledger Fabric & IPFS Provenance Platform.
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
