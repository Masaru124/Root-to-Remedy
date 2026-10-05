const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function generateOfficialCoAPdf() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Certificate of Analysis - National AYUSH Testing Laboratory</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a202c; margin: 0; padding: 24px; font-size: 12px; line-height: 1.4; }
    .header { border-bottom: 2px solid #2b6cb0; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
    .lab-title { font-size: 18px; font-weight: bold; color: #2b6cb0; text-transform: uppercase; letter-spacing: 0.5px; }
    .lab-sub { font-size: 10px; color: #718096; margin-top: 2px; }
    .badge-nabl { background: #ebf8ff; color: #2b6cb0; border: 1px solid #bee3f8; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 10px; }
    .doc-title { text-align: center; font-size: 15px; font-weight: bold; text-decoration: underline; margin: 16px 0; letter-spacing: 1px; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #f7fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; margin-bottom: 16px; }
    .meta-row { display: flex; justify-content: space-between; padding: 2px 0; }
    .meta-label { font-weight: 600; color: #4a5568; }
    .meta-val { font-family: monospace; font-weight: 700; color: #1a202c; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    th { background: #edf2f7; color: #2d3748; text-align: left; padding: 6px 8px; border: 1px solid #cbd5e0; font-size: 11px; }
    td { padding: 6px 8px; border: 1px solid #e2e8f0; font-size: 11px; }
    .pass-tag { color: #22543d; background: #c6f6d5; padding: 2px 6px; border-radius: 3px; font-weight: bold; font-size: 10px; display: inline-block; }
    .section-head { font-size: 12px; font-weight: bold; color: #2d3748; margin: 12px 0 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; }
    .summary-box { background: #f0fff4; border: 1px solid #9ae6b4; padding: 10px; border-radius: 6px; margin-bottom: 16px; }
    .summary-title { font-weight: bold; color: #22543d; font-size: 12px; margin-bottom: 4px; }
    .signatures { display: flex; justify-content: space-between; margin-top: 30px; padding-top: 15px; }
    .sig-block { text-align: center; width: 180px; }
    .sig-line { border-top: 1px solid #a0aec0; margin-top: 35px; padding-top: 4px; font-weight: 600; font-size: 11px; color: #4a5568; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="lab-title">National Pharmacopoeial Analytical Laboratory</div>
      <div class="lab-sub">Accredited by NABL (ISO/IEC 17025:2017) & Recognized by Ministry of AYUSH, Govt. of India</div>
      <div class="lab-sub">Central Drug Testing Facility, Sector-62, Institutional Area, New Delhi - 110001</div>
    </div>
    <div class="badge-nabl">NABL CERT: TC-8492</div>
  </div>

  <div class="doc-title">CERTIFICATE OF ANALYSIS (CoA)</div>

  <div class="meta-grid">
    <div class="meta-row"><span class="meta-label">Sample Name:</span> <span>Ashwagandha Dried Root Churna</span></div>
    <div class="meta-row"><span class="meta-label">Report Number:</span> <span class="meta-val">NPAL/AYUSH/2026/0842</span></div>
    <div class="meta-row"><span class="meta-label">Botanical Species:</span> <span><em>Withania somnifera</em> (L.) Dunal</span></div>
    <div class="meta-row"><span class="meta-label">Batch Quantity:</span> <span class="meta-val">10.0 kg</span></div>
    <div class="meta-row"><span class="meta-label">Monograph Reference:</span> <span>Ayurvedic Pharmacopoeia of India (API Vol. I)</span></div>
    <div class="meta-row"><span class="meta-label">Date of Analysis:</span> <span>04-Oct-2026</span></div>
  </div>

  <div class="section-head">1. Quantitative Physicochemical & Active Marker Analysis</div>
  <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Test Method</th>
        <th>Pharmacopoeial Specification</th>
        <th>Observed Value</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Botanical Purity & Assay</strong></td>
        <td>HPTLC Densitometry</td>
        <td>&ge; 95.0% Botanical Identity</td>
        <td><strong>Purity: 98.4%</strong></td>
        <td><span class="pass-tag">CONFORMS</span></td>
      </tr>
      <tr>
        <td>Withanolide Content (A + D)</td>
        <td>HPLC-UV (227 nm)</td>
        <td>&ge; 0.50% w/w</td>
        <td>0.82% w/w</td>
        <td><span class="pass-tag">CONFORMS</span></td>
      </tr>
      <tr>
        <td>Loss on Drying (LOD)</td>
        <td>Gravimetric (105&deg;C)</td>
        <td>&le; 10.0% w/w</td>
        <td>6.4% w/w</td>
        <td><span class="pass-tag">CONFORMS</span></td>
      </tr>
      <tr>
        <td>Total Ash Content</td>
        <td>Muffle Furnace (550&deg;C)</td>
        <td>&le; 7.0% w/w</td>
        <td>4.8% w/w</td>
        <td><span class="pass-tag">CONFORMS</span></td>
      </tr>
      <tr>
        <td>Acid-Insoluble Ash</td>
        <td>API Part-I Appendix 2</td>
        <td>&le; 1.0% w/w</td>
        <td>0.42% w/w</td>
        <td><span class="pass-tag">CONFORMS</span></td>
      </tr>
    </tbody>
  </table>

  <div class="section-head">2. Contaminant, Heavy Metals & Safety Profiling</div>
  <table>
    <thead>
      <tr>
        <th>Safety Parameter</th>
        <th>Analytical Method</th>
        <th>Permissible AYUSH Limit</th>
        <th>Detected Value</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Foreign Organic Contamination</strong></td>
        <td>Visual / Microscopy (USP 561)</td>
        <td>Nil (0.00)</td>
        <td><strong>Contamination: 0</strong></td>
        <td><span class="pass-tag">COMPLIANT</span></td>
      </tr>
      <tr>
        <td>Lead (Pb)</td>
        <td>ICP-MS (EPA 6020B)</td>
        <td>&le; 10.0 ppm</td>
        <td>0.45 ppm</td>
        <td><span class="pass-tag">COMPLIANT</span></td>
      </tr>
      <tr>
        <td>Arsenic (As)</td>
        <td>ICP-MS (EPA 6020B)</td>
        <td>&le; 3.0 ppm</td>
        <td>0.12 ppm</td>
        <td><span class="pass-tag">COMPLIANT</span></td>
      </tr>
      <tr>
        <td>Aflatoxins (B1, B2, G1, G2)</td>
        <td>LC-MS/MS</td>
        <td>&le; 5.0 ppb</td>
        <td>Not Detected (&lt;0.5 ppb)</td>
        <td><span class="pass-tag">COMPLIANT</span></td>
      </tr>
      <tr>
        <td>Total Microbial Plate Count</td>
        <td>Pour Plate Method</td>
        <td>&le; 10^5 CFU/g</td>
        <td>3.2 x 10^2 CFU/g</td>
        <td><span class="pass-tag">COMPLIANT</span></td>
      </tr>
    </tbody>
  </table>

  <div class="summary-box">
    <div class="summary-title">&#10004; FINAL PHARMACOPOEIAL OPINION: APPROVED FOR MEDICINAL EXTRACTION</div>
    <div>
      The submitted raw herb batch complies with all analytical monographs laid down in the <strong>Ayurvedic Pharmacopoeia of India (API)</strong> and WHO Good Agricultural and Collection Practices (GACP). The raw biomass is certified <strong>APPROVED</strong> for commercial capsule and extract manufacturing.
    </div>
  </div>

  <div class="signatures">
    <div class="sig-block">
      <div class="sig-line">Dr. P. K. Sharma<br><small>Lead Analytical Chemist</small></div>
    </div>
    <div class="sig-block">
      <div class="sig-line">Dr. V. N. Raghunathan<br><small>Quality Assurance Director</small></div>
    </div>
    <div class="sig-block">
      <div class="sig-line">Official Seal & Signature<br><small>Govt. Approved Testing Lab</small></div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  const outPath = path.resolve(__dirname, '../scratch/official_ayush_coa.pdf');
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' }
  });

  console.log('✅ Official AYUSH Certificate of Analysis generated at:', outPath);
  await browser.close();
}

generateOfficialCoAPdf();
