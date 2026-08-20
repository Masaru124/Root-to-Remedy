import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, Search } from 'lucide-react';

export default function QRScanner({ onScanSuccess }) {
  const [manualInput, setManualInput] = useState('');
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    let scanner = null;
    if (cameraActive) {
      scanner = new Html5QrcodeScanner(
        "qr-reader-container",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => {
          onScanSuccess(decodedText);
          setCameraActive(false);
          scanner.clear();
        },
        (error) => {
          // Camera scan attempt error ignored
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [cameraActive, onScanSuccess]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onScanSuccess(manualInput.trim());
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <Search size={22} color="var(--emerald-light)" /> Scan Product QR Code
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Scan the QR code on your product packaging or enter the Product / Batch ID manually.
      </p>

      {cameraActive ? (
        <div>
          <div id="qr-reader-container" style={{ width: '100%', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}></div>
          <button
            onClick={() => setCameraActive(false)}
            className="btn btn-secondary"
            style={{ marginTop: '1rem' }}
          >
            Cancel Camera Scan
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setCameraActive(true)}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.9rem', marginBottom: '1.5rem', fontSize: '1rem' }}
          >
            <Camera size={20} /> Open Device Camera Scanner
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Or enter manually</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          </div>

          <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. PROD-100, PROD-SAMPLE1, or BATCH-SAMPLE1"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">
              Verify
            </button>
          </form>

          <div style={{ marginTop: '1rem', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.4rem' }}>
              💡 Quick-click sample identifiers:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['PROD-100', 'PROD-SAMPLE1', 'BATCH-SAMPLE1'].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onScanSuccess(id)}
                  className="btn btn-secondary"
                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontFamily: 'monospace' }}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
