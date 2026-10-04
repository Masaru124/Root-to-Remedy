'use strict';
/**
 * Parses fixed-structure analytical Certificate of Analysis (CoA) PDFs.
 * Enforces fail-closed validation: exactly one occurrence of each field must be present.
 * Template lines (case-insensitive):
 *   Purity: 98.2%
 *   Contamination: 0 (or 0.00)
 *   Batch Quantity: 10 kg
 */

const FIELDS = {
  purity: {
    value: /\bpurity\s*[:=]\s*(\d+(?:\.\d+)?)\s*%/gi,
    label: /\bpurity\b/gi,
    name: 'Purity'
  },
  contamination: {
    value: /\bcontamination\s*[:=]\s*(\d+(?:\.\d+)?)(?![\d.])/gi,
    label: /\bcontamination\b/gi,
    name: 'Contamination'
  },
  coaWeightKg: {
    value: /\bbatch\s+quantity\s*[:=]\s*(\d+(?:\.\d+)?)\s*kg\b/gi,
    label: /\bbatch\s+quantity\b/gi,
    name: 'Batch Quantity'
  }
};

function extractMetrics(text) {
  if (!text || text.trim().length < 40) {
    throw new Error('CoA has no readable text layer (scanned images are unsupported).');
  }

  const out = {};
  for (const [key, f] of Object.entries(FIELDS)) {
    const labelCount = (text.match(f.label) || []).length;
    const values = [...text.matchAll(f.value)].map(m => m[1]);

    if (labelCount !== 1 || values.length !== 1) {
      throw new Error(`CoA must contain exactly one parsable "${f.name}" line (found ${labelCount} label(s), ${values.length} value(s)).`);
    }

    const parsedNum = parseFloat(values[0]);
    if (!Number.isFinite(parsedNum)) {
      throw new Error(`Invalid numeric value for "${f.name}": "${values[0]}"`);
    }
    out[key] = parsedNum;
  }

  if (out.purity > 100) {
    throw new Error('Purity above 100% is invalid.');
  }

  return out;
}

async function parseCoAPdf(buffer) {
  const pdfParse = require('pdf-parse');
  const data = await pdfParse(buffer);
  return extractMetrics(data.text);
}

module.exports = { extractMetrics, parseCoAPdf };
