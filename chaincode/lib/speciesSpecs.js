'use strict';
/**
 * Pharmacopoeial Species Specifications
 * Sourced from the Ayurvedic Pharmacopoeia of India (API), Ministry of AYUSH, Govt. of India.
 * Standard Churna Capsule Formulation (Mesh 85, Size 0/1 Capsules).
 * Integer milligram and percentage values ensure deterministic ledger arithmetic.
 */
const SPECIES_SPECS = Object.freeze({
  'Withania somnifera': Object.freeze({
    commonName: 'Ashwagandha',
    monographRef: 'API Part-I, Vol. I, Monograph 8',
    dosageMg: 500,  // Standard 500 mg Size '0' capsule
    yieldPct: 85    // 85.0% net churna recovery (max 10% LOD + 5% fibrous core rejection)
  }),
  'Curcuma longa': Object.freeze({
    commonName: 'Turmeric (Haridra)',
    monographRef: 'API Part-I, Vol. I, Monograph 23',
    dosageMg: 500,  // Standard 500 mg capsule
    yieldPct: 80    // 80.0% net rhizome recovery
  }),
  'Bacopa monnieri': Object.freeze({
    commonName: 'Brahmi',
    monographRef: 'API Part-I, Vol. II, Monograph 11',
    dosageMg: 300,  // Standard 300 mg Size '1' capsule
    yieldPct: 75    // 75.0% foliar recovery
  }),
  'Ocimum sanctum': Object.freeze({
    commonName: 'Tulsi',
    monographRef: 'API Part-I, Vol. II, Monograph 65',
    dosageMg: 400,  // Standard 400 mg capsule
    yieldPct: 70    // 70.0% leaf processing recovery
  }),
  'Azadirachta indica': Object.freeze({
    commonName: 'Neem',
    monographRef: 'API Part-I, Vol. II, Monograph 49',
    dosageMg: 500,  // Standard 500 mg capsule
    yieldPct: 75    // 75.0% bark/leaf recovery
  }),
  'Phyllanthus emblica': Object.freeze({
    commonName: 'Amla',
    monographRef: 'API Part-I, Vol. I, Monograph 4',
    dosageMg: 500,  // Standard 500 mg capsule
    yieldPct: 80    // 80.0% deseeded pericarp recovery
  }),
  'Tinospora cordifolia': Object.freeze({
    commonName: 'Giloy (Guduchi)',
    monographRef: 'API Part-I, Vol. I, Monograph 17',
    dosageMg: 500,  // Standard 500 mg capsule
    yieldPct: 78    // 78.0% stem wood separation recovery
  })
});

module.exports = { SPECIES_SPECS };
