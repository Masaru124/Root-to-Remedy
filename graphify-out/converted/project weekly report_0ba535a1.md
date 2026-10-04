<!-- converted from project weekly report.docx -->

AMC ENGINEERING COLLEGE
AMC Campus, Bannerghatta Road, Bengaluru, Karnataka 560083
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
(DATA SCIENCE)
Weekly Project Progress Report (Week No: 1)
Project Batch Number: DS-04						Date: 02/08/2026
Title of the project:
Root-to-Remedy: A Permissioned Ledger and Content-Addressed Storage System for Ayurvedic Botanical Supply Chains
Feedback given during previous week:
Initial topic selection and domain scope approval. Guide advised focusing on real-world supply chain vulnerabilities in Ayurvedic medicine, adulteration prevention, and regulatory compliance. Recommended establishing clear functional boundaries and reviewing permissioned blockchain frameworks.
Progress for the week (List point-wise the progress made):
•  Conducted a comprehensive literature survey on Ayurvedic raw material supply chain challenges, paper-based Certificate of Analysis (CoA) forgery, and species substitution risks.
•  Defined project scope, core objectives, non-goals, and identified 4 primary user personas: Farmer, Lab Technician, Manufacturer, and Public Consumer.
•  Formulated Functional Requirements (FR-1 to FR-14) covering batch registration, off-chain document pinning, deterministic lab evaluation, approval-gated manufacturing, and public verification.
•  Selected technical stack: Hyperledger Fabric v2.5 (permissioned ledger), IPFS (Pinata/Kubo for PDF certificates), Node.js/Express REST API, MongoDB (read cache & auth), and React/Vite SPA.
•  Set up project folder structure (chaincode/, backend/, frontend/), initialized repository on GitHub (Masaru124/Root-to-Remedy), and configured development environment scripts.
Guide's Remarks:
Grade's Evaluation: (Please Tick)
Guide's Name: Prof. Guide Name					Guide's Signature: __________________

AMC ENGINEERING COLLEGE
AMC Campus, Bannerghatta Road, Bengaluru, Karnataka 560083
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
(DATA SCIENCE)
Weekly Project Progress Report (Week No: 2)
Project Batch Number: DS-04						Date: 09/08/2026
Title of the project:
Root-to-Remedy: A Permissioned Ledger and Content-Addressed Storage System for Ayurvedic Botanical Supply Chains
Feedback given during previous week:
Guide emphasized that critical business rules (such as purity thresholds and approval-gated manufacturing) MUST be enforced at the ledger level inside smart contract code, rather than relying on API or frontend validation alone.
Progress for the week (List point-wise the progress made):
•  Designed Hyperledger Fabric ledger state data structures for Batch objects (key: batchId) and Product objects (key: productId).
•  Developed standalone deterministic business rules engine (chaincode/lib/rules.js) implementing quality evaluation: purity >= 95% AND contamination == 0 -> APPROVED, else REJECTED.
•  Implemented core HerbContract class (chaincode/lib/herbContract.js) with 5 contract methods: RegisterBatch, UploadLabReport, UpdateTransport, CreateProduct, and VerifyProduct.
•  Embedded strict prerequisite validation inside CreateProduct: rejecting product minting transactions if the referenced harvest batch status is PENDING or REJECTED.
•  Constructed unit test suite (chaincode/test/herbContract.test.js) using Mocha, Chai, and Sinon stub mocks for ChaincodeStub.
•  Verified all 11 chaincode unit tests passing cleanly, validating purity threshold boundary logic, duplicate batch rejections, and unauthorized state transitions.
Guide's Remarks:
Grade's Evaluation: (Please Tick)
Guide's Name: Prof. Guide Name					Guide's Signature: __________________

AMC ENGINEERING COLLEGE
AMC Campus, Bannerghatta Road, Bengaluru, Karnataka 560083
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
(DATA SCIENCE)
Weekly Project Progress Report (Week No: 3)
Project Batch Number: DS-04						Date: 16/08/2026
Title of the project:
Root-to-Remedy: A Permissioned Ledger and Content-Addressed Storage System for Ayurvedic Botanical Supply Chains
Feedback given during previous week:
Guide suggested implementing a dual-mode ledger driver so backend REST API endpoints can be developed and unit-tested without requiring a heavy multi-node Docker Fabric network on every developer laptop.
Progress for the week (List point-wise the progress made):
•  Built Node.js Express REST API server architecture (backend/server.js) with modular controllers, routes, and centralized error handling middleware.
•  Developed fabricConnection.js featuring a Dual-Mode Ledger Gateway Driver: MockLedgerAdapter (importing the exact same rules.js engine) for local dev/test, and live Fabric Gateway connector (@hyperledger/fabric-gateway).
•  Implemented JWT authentication and server-side role-based access control middleware (requireRole('farmer'), requireRole('lab'), requireRole('manufacturer')).
•  Created ipfsService.js supporting Pinata cloud IPFS pinning (via JWT API key) as primary, with local Kubo container fallback and content-addressed CID simulation.
•  Created qrService.js using qrcode library to generate high-resolution Base64 PNG QR code data URLs for retail products.
•  Implemented MongoDB Mongoose models (User and BatchCache) to maintain a denormalized off-chain read cache for high-performance UI list queries.
Guide's Remarks:
Grade's Evaluation: (Please Tick)
Guide's Name: Prof. Guide Name					Guide's Signature: __________________

AMC ENGINEERING COLLEGE
AMC Campus, Bannerghatta Road, Bengaluru, Karnataka 560083
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
(DATA SCIENCE)
Weekly Project Progress Report (Week No: 4)
Project Batch Number: DS-04						Date: 23/08/2026
Title of the project:
Root-to-Remedy: A Permissioned Ledger and Content-Addressed Storage System for Ayurvedic Botanical Supply Chains
Feedback given during previous week:
Guide recommended thorough integration testing of all REST endpoints, verifying multipart form PDF uploads, role authorization security (403 assertions), and zero-login public verification.
Progress for the week (List point-wise the progress made):
•  Implemented /api/login and /api/register-user authentication endpoints with bcrypt password hashing and JWT issuance.
•  Implemented /api/register endpoint allowing Farmers to record harvest batches on the ledger with GPS latitude/longitude.
•  Implemented /api/upload-lab multipart PDF upload endpoint, pinning test certificates to IPFS and executing UploadLabReport contract status evaluation.
•  Implemented /api/batch/approved catalog query and /api/manufacture endpoint allowing Manufacturers to mint products and receive downloadable QR codes.
•  Implemented /api/verify/:qrCode public verification endpoint returning composite product, batch, lab, and transport provenance JSON without requiring login headers.
•  Wrote comprehensive backend API integration test suite (backend/test/api.test.js) using Supertest; verified all 8 integration tests passing with 100% success rate.
Guide's Remarks:
Grade's Evaluation: (Please Tick)
Guide's Name: Prof. Guide Name					Guide's Signature: __________________

AMC ENGINEERING COLLEGE
AMC Campus, Bannerghatta Road, Bengaluru, Karnataka 560083
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
(DATA SCIENCE)
Weekly Project Progress Report (Week No: 5)
Project Batch Number: DS-04						Date: 30/08/2026
Title of the project:
Root-to-Remedy: A Permissioned Ledger and Content-Addressed Storage System for Ayurvedic Botanical Supply Chains
Feedback given during previous week:
Guide advised creating a modern, accessible, high-aesthetic web interface for all user personas, ensuring mobile responsiveness for field use and clear visual feedback for lab purity results.
Progress for the week (List point-wise the progress made):
•  Scaffolded Vite React single-page application (frontend/) with a custom CSS design system featuring dark theme, botanical glowing emerald accents, and glassmorphic card containers (frontend/src/index.css).
•  Implemented AuthContext provider and responsive Navbar featuring 1-click persona quick-login switcher (Farmer, Lab Tech, Manufacturer) and JWT session management.
•  Developed FarmerPage.jsx harvest registration portal with HTML5 Geolocation API auto-fill for farm latitude/longitude.
•  Developed LabPage.jsx testing portal displaying pending batch queue, PDF file dropzone, purity inputs, and instant status badge evaluation.
•  Developed ManufacturerPage.jsx portal rendering approved batch catalog, product creation wizard, and downloadable QR code image container.
•  Developed ConsumerPage.jsx public verification portal featuring camera QR scanner (html5-qrcode), manual lookup, and ProvenanceCard.jsx displaying harvest GPS map links, IPFS certificate viewer links, and interactive provenance timeline.
Guide's Remarks:
Grade's Evaluation: (Please Tick)
Guide's Name: Prof. Guide Name					Guide's Signature: __________________

AMC ENGINEERING COLLEGE
AMC Campus, Bannerghatta Road, Bengaluru, Karnataka 560083
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
(DATA SCIENCE)
Weekly Project Progress Report (Week No: 6)
Project Batch Number: DS-04						Date: 06/09/2026
Title of the project:
Root-to-Remedy: A Permissioned Ledger and Content-Addressed Storage System for Ayurvedic Botanical Supply Chains
Feedback given during previous week:
Guide recommended performing formal security threat modeling (STRIDE), transaction performance benchmarking, fixing minor route precedence bugs, and drafting the IEEE conference paper.
Progress for the week (List point-wise the progress made):
•  Conducted STRIDE security analysis covering Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege across all system components.
•  Executed end-to-end system integration testing across the complete supply chain loop: Farmer harvest -> Lab IPFS upload -> Manufacturer QR minting -> Public consumer verification.
•  Benchmarked query and transaction performance: public read cache queries served in <15ms, smart contract endorsement writes benchmarked at 684 TPS with 112ms average latency.
•  Resolved Express route precedence issues (/batch/approved vs /batch/:batchId) and added pre-populated demo records (PROD-100, PROD-SAMPLE1, BATCH-SAMPLE1) for instant testing.
•  Authored comprehensive IEEE conference paper root_to_remedy_ieee.tex detailing system architecture, smart contract quality gates, IPFS document storage, and experimental evaluation.
•  Finalized GitHub repository documentation (README.md), project walkthrough, and weekly progress reports.
Guide's Remarks:
Grade's Evaluation: (Please Tick)
Guide's Name: Prof. Guide Name					Guide's Signature: __________________
| SL NO | Name | Student signature |  | Outstanding | Good | Fair | Not Satisfactory |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Lakshmi R
(1AM23CD048) |  | Performance: |  |  |  |  |
| 1 | Lakshmi R
(1AM23CD048) |  | Attendance/Regularity: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Performance: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Attendance/Regularity: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Performance: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Attendance/Regularity: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Performance: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Attendance/Regularity: |  |  |  |  |
| SL NO | Name | Student signature |  | Outstanding | Good | Fair | Not Satisfactory |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Lakshmi R
(1AM23CD048) |  | Performance: |  |  |  |  |
| 1 | Lakshmi R
(1AM23CD048) |  | Attendance/Regularity: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Performance: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Attendance/Regularity: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Performance: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Attendance/Regularity: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Performance: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Attendance/Regularity: |  |  |  |  |
| SL NO | Name | Student signature |  | Outstanding | Good | Fair | Not Satisfactory |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Lakshmi R
(1AM23CD048) |  | Performance: |  |  |  |  |
| 1 | Lakshmi R
(1AM23CD048) |  | Attendance/Regularity: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Performance: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Attendance/Regularity: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Performance: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Attendance/Regularity: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Performance: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Attendance/Regularity: |  |  |  |  |
| SL NO | Name | Student signature |  | Outstanding | Good | Fair | Not Satisfactory |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Lakshmi R
(1AM23CD048) |  | Performance: |  |  |  |  |
| 1 | Lakshmi R
(1AM23CD048) |  | Attendance/Regularity: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Performance: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Attendance/Regularity: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Performance: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Attendance/Regularity: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Performance: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Attendance/Regularity: |  |  |  |  |
| SL NO | Name | Student signature |  | Outstanding | Good | Fair | Not Satisfactory |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Lakshmi R
(1AM23CD048) |  | Performance: |  |  |  |  |
| 1 | Lakshmi R
(1AM23CD048) |  | Attendance/Regularity: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Performance: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Attendance/Regularity: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Performance: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Attendance/Regularity: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Performance: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Attendance/Regularity: |  |  |  |  |
| SL NO | Name | Student signature |  | Outstanding | Good | Fair | Not Satisfactory |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Lakshmi R
(1AM23CD048) |  | Performance: |  |  |  |  |
| 1 | Lakshmi R
(1AM23CD048) |  | Attendance/Regularity: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Performance: |  |  |  |  |
| 2 | Anjali Khatait
(1AM23CD012) |  | Attendance/Regularity: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Performance: |  |  |  |  |
| 3 | Devadiga Rishika Manjunath
(1AM23CD031) |  | Attendance/Regularity: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Performance: |  |  |  |  |
| 4 | Dev Aditya
(1AM23CD030) |  | Attendance/Regularity: |  |  |  |  |