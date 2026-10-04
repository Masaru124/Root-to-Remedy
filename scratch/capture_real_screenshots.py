import os
import time
from playwright.sync_api import sync_playwright

output_dir = "scratch/real_screenshots"
os.makedirs(output_dir, exist_ok=True)

def capture_all():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1400, "height": 950},
            device_scale_factor=2
        )
        page = context.new_page()

        # 1. Public Landing & Verify Screen
        print("1. Capturing Public Verification Portal (Fig 7.1)...")
        page.goto("http://localhost:3000/verify")
        page.wait_for_selector("input[placeholder*='PROD']", timeout=10000)
        page.wait_for_timeout(1000)
        page.screenshot(path=os.path.join(output_dir, "ui_home_verify.png"), full_page=False)
        print("Captured ui_home_verify.png")

        # 2. Login Gateway
        print("2. Capturing Login Gateway (Fig 7.4)...")
        page.goto("http://localhost:3000/login")
        page.wait_for_selector("button:has-text('Farmer')", timeout=10000)
        page.wait_for_timeout(1000)
        page.screenshot(path=os.path.join(output_dir, "ui_login.png"), full_page=False)
        print("Captured ui_login.png")

        # 3. Farmer / Harvester Dashboard
        print("3. Logging in as Harvester / Farmer (Fig 7.2)...")
        page.locator("button:has-text('Farmer')").click()
        page.wait_for_timeout(500)
        page.locator("button[type='submit']").click()
        page.wait_for_url("**/farmer", timeout=10000)
        page.wait_for_selector("input[name='herbName']", timeout=10000)
        page.wait_for_timeout(1000)
        page.screenshot(path=os.path.join(output_dir, "ui_farmer.png"), full_page=False)
        print("Captured ui_farmer.png")

        # 4. Lab Tech Dashboard
        print("4. Logging in as Certified Lab Analyst (Fig 7.3)...")
        page.goto("http://localhost:3000/login")
        page.wait_for_selector("button:has-text('Lab Tech')", timeout=10000)
        page.locator("button:has-text('Lab Tech')").click()
        page.wait_for_timeout(500)
        page.locator("button[type='submit']").click()
        page.wait_for_url("**/lab", timeout=10000)
        page.wait_for_selector("h2:has-text('Laboratory')", timeout=10000)
        page.wait_for_timeout(1500)
        page.screenshot(path=os.path.join(output_dir, "ui_lab.png"), full_page=False)
        print("Captured ui_lab.png")

        # 5. Manufacturer Dashboard
        print("5. Logging in as Medicine Manufacturer (Fig 7.5)...")
        page.goto("http://localhost:3000/login")
        page.wait_for_selector("button:has-text('Manufacturer')", timeout=10000)
        page.locator("button:has-text('Manufacturer')").click()
        page.wait_for_timeout(500)
        page.locator("button[type='submit']").click()
        page.wait_for_url("**/manufacturer", timeout=10000)
        page.wait_for_selector("h2:has-text('Manufacturer')", timeout=10000)
        page.wait_for_timeout(1500)
        page.screenshot(path=os.path.join(output_dir, "ui_manufacturer.png"), full_page=False)
        print("Captured ui_manufacturer.png")

        # 6. Provenance Screen
        print("6. Capturing Verified Cryptographic Provenance Screen (Fig 7.6)...")
        page.goto("http://localhost:3000/verify/PROD-SAMPLE1")
        page.wait_for_selector("text=Authenticity & Purity Verified", timeout=10000)
        page.wait_for_timeout(1500)
        page.screenshot(path=os.path.join(output_dir, "ui_provenance_modal.png"), full_page=False)
        print("Captured ui_provenance_modal.png")

        browser.close()
        print("SUCCESS: All 6 real application screenshots captured!")

if __name__ == "__main__":
    capture_all()
