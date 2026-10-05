const fs = require('fs');
const path = require('path');

function createSimplePdf(lines) {
  const content = lines.map((l, i) => `1 0 0 1 50 ${750 - i * 30} Tm (${l}) Tj`).join('\n');
  const stream = `BT\n/F1 14 Tf\n${content}\nET`;
  const streamLen = Buffer.byteLength(stream);

  return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLen} >>
stream
${stream}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000227 00000 n 
0000000318 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
393
%%EOF`;
}

const outDir = path.join(__dirname, 'test_coas');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// 1. Valid passing CoA
const passLines = [
  'NATIONAL AYUSH TESTING LABORATORY',
  'CERTIFICATE OF ANALYSIS',
  'Batch ID: BATCH-TEST-PASS',
  'Botanical Species: Withania somnifera',
  'Purity: 98.4%',
  'Contamination: 0',
  'Batch Quantity: 10.0 kg',
  'Heavy Metals: Within Permissible Limits',
  'Overall Recommendation: APPROVED FOR COMMERCIAL PROCESSING'
];
fs.writeFileSync(path.join(outDir, 'coa_pass.pdf'), createSimplePdf(passLines));

// 2. Failing CoA (low purity, high contamination)
const failLines = [
  'NATIONAL AYUSH TESTING LABORATORY',
  'CERTIFICATE OF ANALYSIS',
  'Batch ID: BATCH-TEST-FAIL',
  'Botanical Species: Withania somnifera',
  'Purity: 88.5%',
  'Contamination: 0.12',
  'Batch Quantity: 10.0 kg',
  'Heavy Metals: Above Threshold Limits',
  'Overall Recommendation: REJECTED'
];
fs.writeFileSync(path.join(outDir, 'coa_fail.pdf'), createSimplePdf(failLines));

console.log('Sample CoA PDFs generated at:', outDir);
