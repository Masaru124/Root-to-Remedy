const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';
const COA_PDF_PATH = path.resolve(__dirname, 'official_ayush_coa.pdf');
const SS_DIR = path.resolve(__dirname, 'feature_screenshots');

if (!fs.existsSync(SS_DIR)) fs.mkdirSync(SS_DIR, { recursive: true });

async function loginAs(page, roleName) {
  await page.goto(`${BASE_URL}/login`);
  await page.waitForSelector('text=Sign In to Portal');
  
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

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('📸 Capturing feature screenshots...');

  // 1. Farmer Portal Screenshot
  await loginAs(page, 'farmer');
  await page.waitForURL('**/farmer');
  await page.fill('input[name="herbName"]', 'Ashwagandha Roots');
  await page.selectOption('select[name="species"]', 'Withania somnifera');
  await page.fill('input[name="weightKg"]', '10.0');
  await page.waitForTimeout(500);
  
  await page.screenshot({ path: path.join(SS_DIR, '01_farmer_portal_species_weight.png'), fullPage: false });
  console.log('  ✔ Saved 01_farmer_portal_species_weight.png');

  // Submit batch
  await page.click('button[type="submit"]:has-text("Commit Harvest Batch")');
  await page.waitForSelector('text=Harvest Batch Registered On-Chain!');
  const batchIdElement = page.locator('div:has-text("BATCH-")').last();
  const batchId = (await batchIdElement.innerText()).trim();

  await page.screenshot({ path: path.join(SS_DIR, '02_farmer_batch_registered.png'), fullPage: false });
  console.log('  ✔ Saved 02_farmer_batch_registered.png');

  // 2. Lab Portal Screenshot
  await loginAs(page, 'lab');
  await page.waitForURL('**/lab');
  const batchRow = page.locator(`tr:has-text("${batchId}")`);
  await batchRow.waitFor();
  await batchRow.locator('button:has-text("Select")').click();
  await page.waitForTimeout(500);

  await page.screenshot({ path: path.join(SS_DIR, '03_lab_portal_coa_upload.png'), fullPage: false });
  console.log('  ✔ Saved 03_lab_portal_coa_upload.png');

  // Upload CoA PDF
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(COA_PDF_PATH);
  await page.click('button[type="submit"]:has-text("Commit Lab Result to Chain")');
  await page.waitForSelector('text=CoA Verified! Evaluated Status: APPROVED');
  await page.waitForTimeout(500);

  await page.screenshot({ path: path.join(SS_DIR, '04_lab_portal_verified_approved.png'), fullPage: false });
  console.log('  ✔ Saved 04_lab_portal_verified_approved.png');

  // 3. Manufacturer Portal Screenshot
  await loginAs(page, 'manufacturer');
  await page.waitForURL('**/manufacturer');
  await page.selectOption('select.form-select', batchId);
  await page.waitForTimeout(500);

  await page.fill('input[name="productName"]', 'Organic Ashwagandha 500mg Capsules');
  await page.fill('input[name="unitsRequested"]', '500');

  await page.screenshot({ path: path.join(SS_DIR, '05_manufacturer_portal_mass_balance.png'), fullPage: false });
  console.log('  ✔ Saved 05_manufacturer_portal_mass_balance.png');

  // Mint product
  await page.click('button[type="submit"]:has-text("Mint Product")');
  await page.waitForSelector('text=Product Packaging QR Code');
  await page.waitForTimeout(500);

  const prodIdElement = page.locator('div:has-text("PROD-")').last();
  const productId = (await prodIdElement.innerText()).trim();

  await page.screenshot({ path: path.join(SS_DIR, '06_manufacturer_product_minted_qr.png'), fullPage: false });
  console.log('  ✔ Saved 06_manufacturer_product_minted_qr.png');

  // 4. Consumer Provenance Verification Screenshot
  await page.goto(`${BASE_URL}/verify/${productId}`);
  await page.waitForSelector('text=Verified Blockchain Record');
  await page.waitForTimeout(1000);

  await page.screenshot({ path: path.join(SS_DIR, '07_consumer_provenance_audit.png'), fullPage: true });
  console.log('  ✔ Saved 07_consumer_provenance_audit.png');

  console.log('🎉 All feature screenshots captured in:', SS_DIR);
  await browser.close();
}

captureScreenshots().catch(console.error);
