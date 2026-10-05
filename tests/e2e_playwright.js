const { chromium } = require('playwright');
const path = require('path');
const assert = require('node:assert/strict');

const BASE_URL = 'http://localhost:3000';
const COA_PASS_PATH = path.resolve(__dirname, '../scratch/test_coas/coa_pass.pdf');

async function loginAs(page, roleName) {
  await page.goto(`${BASE_URL}/login`);
  await page.waitForSelector('text=Sign In to Portal');
  
  // Click quick persona button
  if (roleName === 'farmer') {
    await page.click('button:has-text("Farmer")');
  } else if (roleName === 'lab') {
    await page.click('button:has-text("Lab Tech")');
  } else if (roleName === 'manufacturer') {
    await page.click('button:has-text("Manufacturer")');
  }
  
  await page.click('button[type="submit"]:has-text("Sign In")');
  await page.waitForTimeout(500);
}

async function runE2ETests() {
  console.log('====================================================');
  console.log('🚀 Starting Playwright End-to-End Automated Test Suite');
  console.log(`🎯 Target URL: ${BASE_URL}`);
  console.log('====================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let registeredBatchId = '';
  let mintedProductId = '';

  try {
    // -------------------------------------------------------------
    // 1. FARMER BATCH REGISTRATION TEST
    // -------------------------------------------------------------
    console.log('▶ [Test 1] Testing Farmer Login & Batch Registration with Species Monograph...');
    await loginAs(page, 'farmer');
    await page.waitForURL('**/farmer', { timeout: 8000 });
    console.log('  ✔ Logged in as Farmer');

    await page.fill('input[name="herbName"]', 'Ashwagandha Roots');
    await page.selectOption('select[name="species"]', 'Withania somnifera');
    await page.fill('input[name="weightKg"]', '10.0');
    await page.selectOption('select[name="soilType"]', 'Organic Black Loam');
    await page.fill('input[name="gpsLat"]', '26.9124');
    await page.fill('input[name="gpsLng"]', '75.7873');

    // Submit batch to ledger
    await page.click('button[type="submit"]:has-text("Commit Harvest Batch")');

    // Wait for registration confirmation
    await page.waitForSelector('text=Harvest Batch Registered On-Chain!', { timeout: 8000 });
    
    // Extract registered batchId
    const batchIdElement = page.locator('div:has-text("BATCH-")').last();
    registeredBatchId = (await batchIdElement.innerText()).trim();
    assert.match(registeredBatchId, /^BATCH-[A-Za-z0-9_-]+$/, 'Batch ID must follow BATCH-XXXX pattern');
    console.log(`  ✔ Harvest batch registered on ledger with ID: ${registeredBatchId}`);
    console.log('  ✔ Initial Weight recorded as 10.0 kg (10,000,000 mg) under Withania somnifera monograph');

    // -------------------------------------------------------------
    // 2. LABORATORY COA EXTRACTION & QUALITY GATE TEST
    // -------------------------------------------------------------
    console.log('\n▶ [Test 2] Testing Lab Tech Login, CoA Extraction & Quality Gate...');
    await loginAs(page, 'lab');
    await page.waitForURL('**/lab', { timeout: 8000 });
    console.log('  ✔ Logged in as Lab Tech');

    // Find our batch in the table queue
    const batchRow = page.locator(`tr:has-text("${registeredBatchId}")`);
    await batchRow.waitFor({ timeout: 5000 });
    console.log(`  ✔ Found pending batch ${registeredBatchId} in laboratory test queue`);

    // Click Select on the batch row
    await batchRow.locator('button:has-text("Select")').click();
    await page.waitForSelector(`text=${registeredBatchId}`);

    // Upload the official Certificate of Analysis (CoA) PDF
    console.log(`  ⏳ Uploading CoA PDF: ${path.basename(COA_PASS_PATH)}...`);
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(COA_PASS_PATH);

    // Submit lab report
    await page.click('button[type="submit"]:has-text("Commit Lab Result to Chain")');

    // Wait for confirmation message
    await page.waitForSelector('text=CoA Verified! Evaluated Status: APPROVED', { timeout: 10000 });
    const successMsg = await page.locator('text=CoA Verified!').innerText();
    console.log(`  ✔ ${successMsg}`);
    assert.ok(successMsg.includes('Purity: 98.4%'), 'CoA Purity 98.4% must be extracted');
    assert.ok(successMsg.includes('Contamination: 0'), 'CoA Contamination 0 must be extracted');
    assert.ok(successMsg.includes('Tested Qty: 10kg'), 'CoA Quantity 10kg must be extracted');

    // Verify row status changed to APPROVED in the table
    const updatedRow = page.locator(`tr:has-text("${registeredBatchId}")`);
    const statusText = await updatedRow.locator('td:nth-child(3)').innerText();
    assert.equal(statusText.trim(), 'APPROVED', 'Batch status must be updated to APPROVED');
    console.log('  ✔ Ledger status updated to APPROVED in world state');

    // -------------------------------------------------------------
    // 3. MANUFACTURER MASS BALANCE & MINTING TEST
    // -------------------------------------------------------------
    console.log('\n▶ [Test 3] Testing Manufacturer Login, Mass-Balance Verification & QR Minting...');
    await loginAs(page, 'manufacturer');
    await page.waitForURL('**/manufacturer', { timeout: 8000 });
    console.log('  ✔ Logged in as Manufacturer');

    // Select our approved batch from dropdown
    await page.selectOption('select.form-select', registeredBatchId);
    await page.waitForTimeout(500);

    // Verify displayed remaining biomass
    const biomassText = await page.locator('text=Remaining Biomass:').locator('..').innerText();
    console.log(`  ✔ Batch Verified in Manufacturer Portal: ${biomassText.replace('\n', ' ')}`);
    assert.ok(biomassText.includes('10.00 kg'), 'Available biomass must start at 10.00 kg');

    // Fill Product Name and Units
    await page.fill('input[name="productName"]', 'Organic Ashwagandha 500mg Capsules');
    await page.fill('input[name="unitsRequested"]', '500');

    // Mint Product
    await page.click('button[type="submit"]:has-text("Mint Product")');

    // Wait for Product QR Code generation
    await page.waitForSelector('text=Product Packaging QR Code', { timeout: 8000 });
    await page.waitForSelector('img[alt="Product QR Code"]', { timeout: 8000 });

    const prodIdElement = page.locator('div:has-text("PROD-")').last();
    mintedProductId = (await prodIdElement.innerText()).trim();
    assert.match(mintedProductId, /^PROD-[A-Za-z0-9_-]+$/, 'Product ID must follow PROD-XXXX pattern');
    console.log(`  ✔ Product successfully minted on-chain with ID: ${mintedProductId}`);

    // Verify mass-balance deduction details on the product card
    const productCardText = await page.locator('text=Units:').locator('..').innerText();
    console.log(`  ✔ On-Chain Mass Balance Accounting:\n    ${productCardText.split('\n').join('\n    ')}`);
    assert.ok(productCardText.includes('Units: 500'), 'Units produced must be 500');
    assert.ok(productCardText.includes('Biomass Consumed: 0.294 kg'), '500 units @ 500mg (85% yield) must consume 0.294 kg');

    // -------------------------------------------------------------
    // 4. CONSUMER / PUBLIC PROVENANCE VERIFICATION TEST
    // -------------------------------------------------------------
    console.log('\n▶ [Test 4] Testing Public Consumer Provenance Verification...');
    await page.goto(`${BASE_URL}/verify/${mintedProductId}`);

    // Wait for Provenance Record to load
    await page.waitForSelector('text=Verified Blockchain Record', { timeout: 8000 });
    console.log('  ✔ Consumer Provenance Page loaded successfully');

    // Verify Provenance details inside card
    const cardContent = await page.locator('body').innerText();
    assert.ok(cardContent.includes(mintedProductId), 'Must display Product ID');
    assert.ok(cardContent.includes('Withania somnifera'), 'Must display Botanical Species');
    assert.ok(cardContent.includes('98.4%'), 'Must display Authenticated CoA Purity');
    assert.ok(cardContent.includes('Organic Black Loam'), 'Must display Farm Soil Type');
    assert.ok(cardContent.includes('Authenticity & Purity Verified'), 'Must display verified status banner');
    console.log('  ✔ Complete provenance audit trail verified (Farmer -> Lab CoA -> Manufacturer -> Consumer)');

    console.log('\n====================================================');
    console.log('🎉 ALL PLAYWRIGHT E2E TESTS PASSED SUCCESSFULLY! (4/4)');
    console.log('====================================================\n');
  } catch (error) {
    console.error('\n❌ Playwright E2E Test Failed:', error);
    await page.screenshot({ path: 'scratch/playwright_failure.png', fullPage: true });
    console.error('Screenshot saved to scratch/playwright_failure.png');
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runE2ETests();
