/**
 * Shared Business Rules Engine for Root-to-Remedy
 * Used by both Hyperledger Fabric Chaincode and Backend Mock Ledger Adapter.
 */

/**
 * Deterministically evaluates lab test results.
 * @param {number} purity - Lab reported purity percentage (e.g. 96.5)
 * @param {number} contamination - Contamination flag/count (0 for clean, >0 for contaminated)
 * @returns {'APPROVED' | 'REJECTED'}
 */
function evaluateLabResult(purity, contamination) {
  const purityNum = Number(purity);
  const contaminationNum = Number(contamination);

  if (isNaN(purityNum) || isNaN(contaminationNum)) {
    throw new Error('Purity and contamination must be valid numeric values.');
  }

  if (purityNum >= 95 && contaminationNum === 0) {
    return 'APPROVED';
  } else {
    return 'REJECTED';
  }
}

/**
 * Enforces product manufacturing prerequisites.
 * @param {string} batchStatus - Status of the referenced batch ('PENDING' | 'APPROVED' | 'REJECTED')
 * @returns {boolean}
 */
function canCreateProduct(batchStatus) {
  if (batchStatus !== 'APPROVED') {
    throw new Error(`Cannot create product from a batch with status '${batchStatus}'. Batch must be APPROVED.`);
  }
  return true;
}

module.exports = {
  evaluateLabResult,
  canCreateProduct
};
