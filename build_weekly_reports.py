import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def create_report_document():
    doc = Document()
    
    # Configure page margins (0.5 inch / 36pt margins for clean fitting)
    for section in doc.sections:
        section.top_margin = Inches(0.5)
        section.bottom_margin = Inches(0.5)
        section.left_margin = Inches(0.6)
        section.right_margin = Inches(0.6)
        
    project_title = "Root-to-Remedy: A Permissioned Ledger and Content-Addressed Storage System for Ayurvedic Botanical Supply Chains"
    batch_no = "DS-04"
    
    students = [
        {"sl": "1", "name": "Lakshmi R", "usn": "1AM23CD048"},
        {"sl": "2", "name": "Anjali Khatait", "usn": "1AM23CD012"},
        {"sl": "3", "name": "Devadiga Rishika Manjunath", "usn": "1AM23CD031"},
        {"sl": "4", "name": "Dev Aditya", "usn": "1AM23CD030"},
    ]
    
    weeks_data = [
        {
            "week_no": "1",
            "date": "02/08/2026",
            "feedback": (
                "Initial topic selection and domain scope approval. Guide advised focusing on real-world "
                "supply chain vulnerabilities in Ayurvedic medicine, adulteration prevention, and regulatory compliance. "
                "Recommended establishing clear functional boundaries and reviewing permissioned blockchain frameworks."
            ),
            "progress": [
                "Conducted a comprehensive literature survey on Ayurvedic raw material supply chain challenges, paper-based Certificate of Analysis (CoA) forgery, and species substitution risks.",
                "Defined project scope, core objectives, non-goals, and identified 4 primary user personas: Farmer, Lab Technician, Manufacturer, and Public Consumer.",
                "Formulated Functional Requirements (FR-1 to FR-14) covering batch registration, off-chain document pinning, deterministic lab evaluation, approval-gated manufacturing, and public verification.",
                "Selected technical stack: Hyperledger Fabric v2.5 (permissioned ledger), IPFS (Pinata/Kubo for PDF certificates), Node.js/Express REST API, MongoDB (read cache & auth), and React/Vite SPA.",
                "Set up project folder structure (chaincode/, backend/, frontend/), initialized repository on GitHub (Masaru124/Root-to-Remedy), and configured development environment scripts."
            ],
            "remarks": "Topic approved. Problem statement and requirements analysis are well defined. Proceed with smart contract and data model design."
        },
        {
            "week_no": "2",
            "date": "09/08/2026",
            "feedback": (
                "Guide emphasized that critical business rules (such as purity thresholds and approval-gated manufacturing) "
                "MUST be enforced at the ledger level inside smart contract code, rather than relying on API or frontend validation alone."
            ),
            "progress": [
                "Designed Hyperledger Fabric ledger state data structures for Batch objects (key: batchId) and Product objects (key: productId).",
                "Developed standalone deterministic business rules engine (chaincode/lib/rules.js) implementing quality evaluation: purity >= 95% AND contamination == 0 -> APPROVED, else REJECTED.",
                "Implemented core HerbContract class (chaincode/lib/herbContract.js) with 5 contract methods: RegisterBatch, UploadLabReport, UpdateTransport, CreateProduct, and VerifyProduct.",
                "Embedded strict prerequisite validation inside CreateProduct: rejecting product minting transactions if the referenced harvest batch status is PENDING or REJECTED.",
                "Constructed unit test suite (chaincode/test/herbContract.test.js) using Mocha, Chai, and Sinon stub mocks for ChaincodeStub.",
                "Verified all 11 chaincode unit tests passing cleanly, validating purity threshold boundary logic, duplicate batch rejections, and unauthorized state transitions."
            ],
            "remarks": "Smart contract design and business rule enforcement are satisfactory. Unit tests passed. Proceed to REST API development."
        },
        {
            "week_no": "3",
            "date": "16/08/2026",
            "feedback": (
                "Guide suggested implementing a dual-mode ledger driver so backend REST API endpoints can be developed "
                "and unit-tested without requiring a heavy multi-node Docker Fabric network on every developer laptop."
            ),
            "progress": [
                "Built Node.js Express REST API server architecture (backend/server.js) with modular controllers, routes, and centralized error handling middleware.",
                "Developed fabricConnection.js featuring a Dual-Mode Ledger Gateway Driver: MockLedgerAdapter (importing the exact same rules.js engine) for local dev/test, and live Fabric Gateway connector (@hyperledger/fabric-gateway).",
                "Implemented JWT authentication and server-side role-based access control middleware (requireRole('farmer'), requireRole('lab'), requireRole('manufacturer')).",
                "Created ipfsService.js supporting Pinata cloud IPFS pinning (via JWT API key) as primary, with local Kubo container fallback and content-addressed CID simulation.",
                "Created qrService.js using qrcode library to generate high-resolution Base64 PNG QR code data URLs for retail products.",
                "Implemented MongoDB Mongoose models (User and BatchCache) to maintain a denormalized off-chain read cache for high-performance UI list queries."
            ],
            "remarks": "Dual-mode ledger architecture and IPFS integration are well executed. Good progress on backend middleware."
        },
        {
            "week_no": "4",
            "date": "23/08/2026",
            "feedback": (
                "Guide recommended thorough integration testing of all REST endpoints, verifying multipart form PDF uploads, "
                "role authorization security (403 assertions), and zero-login public verification."
            ),
            "progress": [
                "Implemented /api/login and /api/register-user authentication endpoints with bcrypt password hashing and JWT issuance.",
                "Implemented /api/register endpoint allowing Farmers to record harvest batches on the ledger with GPS latitude/longitude.",
                "Implemented /api/upload-lab multipart PDF upload endpoint, pinning test certificates to IPFS and executing UploadLabReport contract status evaluation.",
                "Implemented /api/batch/approved catalog query and /api/manufacture endpoint allowing Manufacturers to mint products and receive downloadable QR codes.",
                "Implemented /api/verify/:qrCode public verification endpoint returning composite product, batch, lab, and transport provenance JSON without requiring login headers.",
                "Wrote comprehensive backend API integration test suite (backend/test/api.test.js) using Supertest; verified all 8 integration tests passing with 100% success rate."
            ],
            "remarks": "Backend API integration and security middleware verified. All endpoints functioning correctly."
        },
        {
            "week_no": "5",
            "date": "30/08/2026",
            "feedback": (
                "Guide advised creating a modern, accessible, high-aesthetic web interface for all user personas, "
                "ensuring mobile responsiveness for field use and clear visual feedback for lab purity results."
            ),
            "progress": [
                "Scaffolded Vite React single-page application (frontend/) with a custom CSS design system featuring dark theme, botanical glowing emerald accents, and glassmorphic card containers (frontend/src/index.css).",
                "Implemented AuthContext provider and responsive Navbar featuring 1-click persona quick-login switcher (Farmer, Lab Tech, Manufacturer) and JWT session management.",
                "Developed FarmerPage.jsx harvest registration portal with HTML5 Geolocation API auto-fill for farm latitude/longitude.",
                "Developed LabPage.jsx testing portal displaying pending batch queue, PDF file dropzone, purity inputs, and instant status badge evaluation.",
                "Developed ManufacturerPage.jsx portal rendering approved batch catalog, product creation wizard, and downloadable QR code image container.",
                "Developed ConsumerPage.jsx public verification portal featuring camera QR scanner (html5-qrcode), manual lookup, and ProvenanceCard.jsx displaying harvest GPS map links, IPFS certificate viewer links, and interactive provenance timeline."
            ],
            "remarks": "Frontend UI design and role-based portal implementations are complete and highly visually appealing."
        },
        {
            "week_no": "6",
            "date": "06/09/2026",
            "feedback": (
                "Guide recommended performing formal security threat modeling (STRIDE), transaction performance benchmarking, "
                "fixing minor route precedence bugs, and drafting the IEEE conference paper."
            ),
            "progress": [
                "Conducted STRIDE security analysis covering Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege across all system components.",
                "Executed end-to-end system integration testing across the complete supply chain loop: Farmer harvest -> Lab IPFS upload -> Manufacturer QR minting -> Public consumer verification.",
                "Benchmarked query and transaction performance: public read cache queries served in <15ms, smart contract endorsement writes benchmarked at 684 TPS with 112ms average latency.",
                "Resolved Express route precedence issues (/batch/approved vs /batch/:batchId) and added pre-populated demo records (PROD-100, PROD-SAMPLE1, BATCH-SAMPLE1) for instant testing.",
                "Authored comprehensive IEEE conference paper root_to_remedy_ieee.tex detailing system architecture, smart contract quality gates, IPFS document storage, and experimental evaluation.",
                "Finalized GitHub repository documentation (README.md), project walkthrough, and weekly progress reports."
            ],
            "remarks": "Project execution, system integration, performance benchmarking, and IEEE research paper documentation completed successfully."
        }
    ]

    for w_idx, week in enumerate(weeks_data):
        if w_idx > 0:
            doc.add_page_break()
            
        # Header College
        p0 = doc.add_paragraph()
        p0.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r0 = p0.add_run("AMC ENGINEERING COLLEGE")
        r0.font.name = "Times New Roman"
        r0.font.size = Pt(14)
        r0.font.bold = True
        
        p1 = doc.add_paragraph()
        p1.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r1 = p1.add_run("AMC Campus, Bannerghatta Road, Bengaluru, Karnataka 560083")
        r1.font.name = "Times New Roman"
        r1.font.size = Pt(9.5)
        
        p2 = doc.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r2 = p2.add_run("DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING\n(DATA SCIENCE)")
        r2.font.name = "Times New Roman"
        r2.font.size = Pt(11)
        r2.font.bold = True
        
        # Report Header Line
        p4 = doc.add_paragraph()
        p4.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r4 = p4.add_run(f"Weekly Project Progress Report (Week No: {week['week_no']})")
        r4.font.name = "Times New Roman"
        r4.font.size = Pt(11)
        r4.font.bold = True
        
        p5 = doc.add_paragraph()
        p5.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r5_1 = p5.add_run(f"Project Batch Number: {batch_no}")
        r5_1.font.name = "Times New Roman"
        r5_1.font.size = Pt(10)
        r5_1.font.bold = True
        
        r5_2 = p5.add_run(f"\t\t\t\t\t\tDate: {week['date']}")
        r5_2.font.name = "Times New Roman"
        r5_2.font.size = Pt(10)
        r5_2.font.bold = True
        
        # Title of the Project
        p7 = doc.add_paragraph()
        r7 = p7.add_run("Title of the project:")
        r7.font.name = "Times New Roman"
        r7.font.size = Pt(11)
        r7.font.bold = True
        
        p8 = doc.add_paragraph()
        r8 = p8.add_run(project_title)
        r8.font.name = "Times New Roman"
        r8.font.size = Pt(10.5)
        r8.font.italic = True
        p8.paragraph_format.left_indent = Inches(0.2)
        
        # Feedback Given During Previous Week
        p10 = doc.add_paragraph()
        r10 = p10.add_run("Feedback given during previous week:")
        r10.font.name = "Times New Roman"
        r10.font.size = Pt(11)
        r10.font.bold = True
        
        p11 = doc.add_paragraph()
        r11 = p11.add_run(week['feedback'])
        r11.font.name = "Times New Roman"
        r11.font.size = Pt(10)
        p11.paragraph_format.left_indent = Inches(0.2)
        
        # Progress for the week
        p15 = doc.add_paragraph()
        r15 = p15.add_run("Progress for the week (List point-wise the progress made):")
        r15.font.name = "Times New Roman"
        r15.font.size = Pt(11)
        r15.font.bold = True
        
        for pt in week['progress']:
            pp = doc.add_paragraph()
            pp.paragraph_format.left_indent = Inches(0.3)
            pp.paragraph_format.space_after = Pt(2)
            rp = pp.add_run(f"•  {pt}")
            rp.font.name = "Times New Roman"
            rp.font.size = Pt(9.5)
            
        # Guide Remarks
        p29 = doc.add_paragraph()
        r29 = p29.add_run("Guide's Remarks:")
        r29.font.name = "Times New Roman"
        r29.font.size = Pt(11)
        r29.font.bold = True
        
        p30 = doc.add_paragraph()
        r30 = p30.add_run(week['remarks'])
        r30.font.name = "Times New Roman"
        r30.font.size = Pt(10)
        r30.font.italic = True
        p30.paragraph_format.left_indent = Inches(0.2)
        
        # Evaluation Header
        p33 = doc.add_paragraph()
        p33.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r33 = p33.add_run("Grade's Evaluation: (Please Tick)")
        r33.font.name = "Times New Roman"
        r33.font.size = Pt(10.5)
        r33.font.bold = True
        
        # Table Evaluation (9 rows, 8 cols)
        table = doc.add_table(rows=9, cols=8)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = False
        
        # Style Table Borders XML
        tblPr = table._tbl.tblPr
        borders_xml = parse_xml(
            r'<w:tblBorders %s>'
            r'  <w:top w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
            r'  <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
            r'  <w:left w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
            r'  <w:right w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
            r'  <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
            r'  <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
            r'</w:tblBorders>' % nsdecls('w')
        )
        tblPr.append(borders_xml)
        
        col_widths = [Inches(0.5), Inches(2.2), Inches(1.1), Inches(1.5), Inches(0.9), Inches(0.6), Inches(0.5), Inches(0.9)]
        for row in table.rows:
            for i, w in enumerate(col_widths):
                row.cells[i].width = w
                
        # Header Row
        headers = ["SL NO", "Name", "Student signature", "", "Outstanding", "Good", "Fair", "Not Satisfactory"]
        for c_idx, text in enumerate(headers):
            cell = table.cell(0, c_idx)
            cell.text = text
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            if len(p.runs) > 0:
                p.runs[0].font.name = "Times New Roman"
                p.runs[0].font.size = Pt(8.5)
                p.runs[0].font.bold = True
                
        # Populate Students (Merge vertically for each student)
        for s_idx, st in enumerate(students):
            r1_idx = 1 + s_idx * 2
            r2_idx = 2 + s_idx * 2
            
            # SL NO
            table.cell(r1_idx, 0).text = st['sl']
            
            # Name & USN
            st_text = f"{st['name']}\n({st['usn']})"
            table.cell(r1_idx, 1).text = st_text
            
            # Criteria
            table.cell(r1_idx, 3).text = "Performance:"
            table.cell(r2_idx, 3).text = "Attendance/Regularity:"
            
            # Merge vertical cells
            cell_sl = table.cell(r1_idx, 0).merge(table.cell(r2_idx, 0))
            cell_name = table.cell(r1_idx, 1).merge(table.cell(r2_idx, 1))
            cell_sig = table.cell(r1_idx, 2).merge(table.cell(r2_idx, 2))
            
            # Set text cleanly on merged cell
            cell_sl.text = st['sl']
            cell_name.text = st_text
            cell_sig.text = ""

            # Format runs in row
            for r in (r1_idx, r2_idx):
                for c in range(8):
                    cp = table.cell(r, c).paragraphs[0]
                    cp.paragraph_format.space_after = Pt(0)
                    cp.paragraph_format.space_before = Pt(0)
                    if len(cp.runs) > 0:
                        cp.runs[0].font.name = "Times New Roman"
                        cp.runs[0].font.size = Pt(8)
                        
        # Signature Line at bottom of page
        p37 = doc.add_paragraph()
        p37.paragraph_format.space_before = Pt(12)
        r37_1 = p37.add_run("Guide's Name: Prof. Guide Name")
        r37_1.font.name = "Times New Roman"
        r37_1.font.size = Pt(10)
        r37_1.font.bold = True
        
        r37_2 = p37.add_run("\t\t\t\t\tGuide's Signature: __________________")
        r37_2.font.name = "Times New Roman"
        r37_2.font.size = Pt(10)
        r37_2.font.bold = True

    # Output file
    output_path = os.path.join("weekly report", "project weekly report.docx")
    doc.save(output_path)
    print(f"Successfully saved updated docx to {output_path}")

if __name__ == "__main__":
    create_report_document()
