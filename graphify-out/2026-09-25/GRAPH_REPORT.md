# Graph Report - Laksh major project  (2026-09-25)

## Corpus Check
- 92 files · ~1,069,135 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 779 nodes · 912 edges · 82 communities (55 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7c272450`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- batchRoutes.js
- herbContract.test.js
- App.jsx
- backend/package.json
- frontend/package.json
- Humanizer: remove AI writing patterns
- chaincode/package.json
- server.js
- labRoutes.js
- labController.js
- 2. Components
- rules/graphify.md
- workflows/graphify.md
- phase 2 report 26_b200624c.md
- report_updated_text_e6981ced.md
- media_updated_caf1833e.md
- phase 2 report 26_original_template_fae11deb.md
- test_save_6761f6d0.md
- Brag Plan: Root-to-Remedy
- Audio reference
- productController.js
- analyze_music_cues.py
- Step 2: Write the brag plan
- /brag
- authController.js
- fabricConnection.js
- Step 4: Validate, render, and deliver
- generate_report_figures.py
- Step 3: Hand off to Hyperframes
- Hyperframes Composition Brief: Root-to-Remedy
- Tone reference
- HerbContract
- SFX Analysis Summary
- Step 1: Inspect the project
- BatchCache.js
- CHAPTER 6
- CHAPTER 1
- CHAPTER 6
- CHAPTER 1
- CHAPTER 6
- CHAPTER 1
- Music Cues: happy-beats-business-moves-vol-10-by-ende-dot-app
- Music Cues: happy-beats-business-moves-vol-11-by-ende-dot-app
- Music Cues: happy-beats-business-moves-vol-12-by-ende-dot-app
- Music Cues: happy-beats-business-moves-vol-1-by-ende-dot-app
- Music Cues: happy-beats-business-moves-vol-9-by-ende-dot-app
- upload.js
- herbContract.js
- MockLedgerAdapter
- devDependencies
- CHAPTER 3
- CHAPTER 3
- CHAPTER 3
- dependencies
- ANNEXURE
- CHAPTER 4
- ANNEXURE
- CHAPTER 4
- ANNEXURE
- CHAPTER 4
- build_full_report.py
- README.md
- LITERATURE SURVEY
- LITERATURE SURVEY
- LITERATURE SURVEY
- brag

## God Nodes (most connected - your core abstractions)
1. `getFabricGateway()` - 15 edges
2. `Brag Plan: Root-to-Remedy` - 14 edges
3. `react` - 13 edges
4. `/brag` - 13 edges
5. `Step 2: Write the brag plan` - 13 edges
6. `analyze_track()` - 12 edges
7. `getMongoStatus()` - 12 edges
8. `lucide-react` - 10 edges
9. `Humanizer: remove AI writing patterns` - 10 edges
10. `HerbContract` - 9 edges

## Surprising Connections (you probably didn't know these)
- `login()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/authController.js → backend/config/db.js
- `register()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/authController.js → backend/config/db.js
- `createProduct()` --calls--> `getFabricGateway()`  [EXTRACTED]
  backend/controllers/productController.js → backend/config/fabricConnection.js
- `updateTransport()` --calls--> `getFabricGateway()`  [EXTRACTED]
  backend/controllers/productController.js → backend/config/fabricConnection.js
- `verifyProduct()` --calls--> `getFabricGateway()`  [EXTRACTED]
  backend/controllers/verifyController.js → backend/config/fabricConnection.js

## Import Cycles
- None detected.

## Communities (82 total, 11 thin omitted)

### Community 0 - "batchRoutes.js"
Cohesion: 0.18
Nodes (17): getMongoStatus(), getFabricGateway(), BatchCache, getAllBatches(), getBatchById(), { getFabricGateway }, { getMongoStatus }, registerBatch() (+9 more)

### Community 1 - "herbContract.test.js"
Cohesion: 0.19
Nodes (9): canCreateProduct(), evaluateLabResult(), chai, { evaluateLabResult, canCreateProduct }, HerbContract, sinon, sinonChai, sinon (+1 more)

### Community 2 - "App.jsx"
Cohesion: 0.17
Nodes (19): App(), ProtectedRoute(), Navbar(), ProvenanceCard(), QRScanner(), StatusBadge(), AuthContext, AuthProvider() (+11 more)

### Community 3 - "backend/package.json"
Cohesion: 0.05
Nodes (39): author, dependencies, axios, bcryptjs, cors, dotenv, express, form-data (+31 more)

### Community 4 - "frontend/package.json"
Cohesion: 0.07
Nodes (26): dependencies, axios, html5-qrcode, lucide-react, react, react-dom, react-router-dom, devDependencies (+18 more)

### Community 5 - "Humanizer: remove AI writing patterns"
Cohesion: 0.05
Nodes (37): 10. Hyphenated pairs everywhere, 11. Passive voice and missing subjects, 12. Overused AI words, 13. Inflated significance, 14. Vague connection or association, 15. Shallow -ing riders, 16. Sales language, 17. Borrowed authority (+29 more)

### Community 6 - "chaincode/package.json"
Cohesion: 0.14
Nodes (13): author, description, engineStrict, chai, mocha, license, main, name (+5 more)

### Community 7 - "server.js"
Cohesion: 0.14
Nodes (13): connectDB(), mongoose, app, authRoutes, batchRoutes, { connectDB }, cors, express (+5 more)

### Community 8 - "labRoutes.js"
Cohesion: 0.22
Nodes (9): authenticateToken(), jwt, requireRole(), { authenticateToken, requireRole }, express, router, upload, { uploadLabReport } (+1 more)

### Community 10 - "labController.js"
Cohesion: 0.20
Nodes (9): BatchCache, { getFabricGateway }, { getMongoStatus }, { uploadToIPFS }, axios, crypto, FormData, uploadToIPFS() (+1 more)

### Community 11 - "2. Components"
Cohesion: 0.17
Nodes (11): 1. System overview, 2.1 React SPA (frontend), 2.2 Express API (backend), 2.3 Hyperledger Fabric (ledger + chaincode), 2.4 IPFS (document storage), 2.5 MongoDB (off-chain cache), 2. Components, 3. Data flow — worked example (register → verify) (+3 more)

### Community 15 - "phase 2 report 26_b200624c.md"
Cohesion: 0.04
Nodes (45): 1.1 Overview, 1.2 Problem Statement, 1.3 Objectives, 1.4 Scope of the Study, 1.5 Disadvantages of Existing Systems, 1.6 Proposed System, 2.1 Literature Survey, 3.1 Functional Requirements (+37 more)

### Community 16 - "report_updated_text_e6981ced.md"
Cohesion: 0.04
Nodes (45): 1.1 Overview, 1.2 Problem Statement, 1.3 Objectives, 1.4 Scope of the Study, 1.5 Disadvantages of Existing Systems, 1.6 Proposed System, 2.1 Literature Survey, 3.1 Functional Requirements (+37 more)

### Community 17 - "media_updated_caf1833e.md"
Cohesion: 0.07
Nodes (28): 2. Split data (70/15/15) with stratification, 3. Copy images into folders, ALGORITHMS, Bachelor of Engineering, Block 2, Block 3, Block 4, CERTIFICATES (+20 more)

### Community 18 - "phase 2 report 26_original_template_fae11deb.md"
Cohesion: 0.07
Nodes (28): 2. Split data (70/15/15) with stratification, 3. Copy images into folders, ALGORITHMS, Bachelor of Engineering, Block 2, Block 3, Block 4, CERTIFICATES (+20 more)

### Community 19 - "test_save_6761f6d0.md"
Cohesion: 0.07
Nodes (28): 2. Split data (70/15/15) with stratification, 3. Copy images into folders, ALGORITHMS, Bachelor of Engineering, Block 2, Block 3, Block 4, CERTIFICATES (+20 more)

### Community 20 - "Brag Plan: Root-to-Remedy"
Cohesion: 0.10
Nodes (19): Audio direction, Brag Plan: Root-to-Remedy, Duration: 20 seconds, Format: landscape — 1920x1080, Hook (first 2-3 seconds), Key moments (the middle), Outro / punchline, Scene 1 — The Hook — 3.5s (+11 more)

### Community 21 - "Audio reference"
Cohesion: 0.12
Nodes (17): Adding SFX elements, Asset paths, Audio-reactive visuals, Audio reference, Available tracks, Beat and cue sources, `casino/` — Card and chip sounds, `impact/` — Impact sounds (+9 more)

### Community 22 - "productController.js"
Cohesion: 0.15
Nodes (14): BatchCache, createProduct(), { generateQR }, { getFabricGateway }, { getMongoStatus }, updateTransport(), { v4: uuidv4 }, { authenticateToken, requireRole } (+6 more)

### Community 23 - "analyze_music_cues.py"
Cohesion: 0.28
Nodes (15): analyze_track(), _as_float(), _compact_times(), _dedupe_cues(), _feature_at(), _finite_round(), _format_cue(), _local_contrast() (+7 more)

### Community 24 - "Step 2: Write the brag plan"
Cohesion: 0.15
Nodes (13): Audio planning, Bias the storyboard toward the user flow, Choosing what to show, Create the output directory, Duration guidance, Handoff posture, Look for interaction and sequential reveal moments, Music cue guidance (+5 more)

### Community 25 - "/brag"
Cohesion: 0.15
Nodes (13): /brag, Creative laws, Invocation dispatch (must happen first), Narration guidance, Output directory, Parsing the invocation, Skill directory, Step 1: Inspect the project (+5 more)

### Community 26 - "authController.js"
Cohesion: 0.18
Nodes (11): bcrypt, { getMongoStatus }, jwt, { JWT_SECRET }, login(), MOCK_USERS, register(), User (+3 more)

### Community 27 - "fabricConnection.js"
Cohesion: 0.18
Nodes (9): { evaluateLabResult, canCreateProduct }, fs, path, { getFabricGateway }, verifyProduct(), express, router, { verifyProduct } (+1 more)

### Community 28 - "Step 4: Validate, render, and deliver"
Cohesion: 0.18
Nodes (11): Bake the poster as frame 0, Example: Taxi for Taxis, Final output structure, Pick the poster frame, Preview, Render, Share copy by tone, Step 4: Validate, render, and deliver (+3 more)

### Community 30 - "Step 3: Hand off to Hyperframes"
Cohesion: 0.22
Nodes (9): Audio asset preparation, Audio-reactive extraction (when music is present), Beat sync (when a cue source is available), Call Hyperframes, Create the composition brief, How to implement, Self-review checklist, Step 3: Hand off to Hyperframes (+1 more)

### Community 31 - "Hyperframes Composition Brief: Root-to-Remedy"
Cohesion: 0.22
Nodes (8): Audio, Creative Direction, Hyperframes Composition Brief: Root-to-Remedy, Objective, Output, Source Material, Storyboard Summary, Visual Identity

### Community 32 - "Tone reference"
Cohesion: 0.25
Nodes (8): `app-store`, `chaotic`, `cinematic`, `deadpan`, `default`, `polished`, Tone reference, `yc-parody`

### Community 34 - "SFX Analysis Summary"
Cohesion: 0.29
Nodes (6): Family Summary, Lower-Risk Picks By Use Case, Safest General Picks, Selection Rules, SFX Analysis Summary, Signal Guide

### Community 36 - "Step 1: Inspect the project"
Cohesion: 0.29
Nodes (7): Color extraction, Font extraction, Rule: nothing secret leaves this step, Step 1: Inspect the project, The 9-question rubric, What to look for, What to skip

### Community 37 - "BatchCache.js"
Cohesion: 0.29
Nodes (5): batchCacheSchema, mongoose, mongoose, userSchema, mongoose

### Community 38 - "CHAPTER 6"
Cohesion: 0.29
Nodes (7): AIM OF TESTING, CHAPTER 6, FUNCTIONAL TESTING, INTEGRATION TESTING, SYSTEM TESTING, TESTING PROCESS, UNIT TESTING

### Community 39 - "CHAPTER 1"
Cohesion: 0.29
Nodes (7): CHAPTER 1, Disadvantages of Existing System, Objectives, Overview, Problem Statement, Proposed System, Scope of the study

### Community 40 - "CHAPTER 6"
Cohesion: 0.29
Nodes (7): AIM OF TESTING, CHAPTER 6, FUNCTIONAL TESTING, INTEGRATION TESTING, SYSTEM TESTING, TESTING PROCESS, UNIT TESTING

### Community 41 - "CHAPTER 1"
Cohesion: 0.29
Nodes (7): CHAPTER 1, Disadvantages of Existing System, Objectives, Overview, Problem Statement, Proposed System, Scope of the study

### Community 42 - "CHAPTER 6"
Cohesion: 0.29
Nodes (7): AIM OF TESTING, CHAPTER 6, FUNCTIONAL TESTING, INTEGRATION TESTING, SYSTEM TESTING, TESTING PROCESS, UNIT TESTING

### Community 43 - "CHAPTER 1"
Cohesion: 0.29
Nodes (7): CHAPTER 1, Disadvantages of Existing System, Objectives, Overview, Problem Statement, Proposed System, Scope of the study

### Community 44 - "Music Cues: happy-beats-business-moves-vol-10-by-ende-dot-app"
Cohesion: 0.33
Nodes (5): Music Cues: happy-beats-business-moves-vol-10-by-ende-dot-app, Reveal Candidates, Strong Cues In Window, Use Policy, Useful Beat Grid

### Community 45 - "Music Cues: happy-beats-business-moves-vol-11-by-ende-dot-app"
Cohesion: 0.33
Nodes (5): Music Cues: happy-beats-business-moves-vol-11-by-ende-dot-app, Reveal Candidates, Strong Cues In Window, Use Policy, Useful Beat Grid

### Community 46 - "Music Cues: happy-beats-business-moves-vol-12-by-ende-dot-app"
Cohesion: 0.33
Nodes (5): Music Cues: happy-beats-business-moves-vol-12-by-ende-dot-app, Reveal Candidates, Strong Cues In Window, Use Policy, Useful Beat Grid

### Community 47 - "Music Cues: happy-beats-business-moves-vol-1-by-ende-dot-app"
Cohesion: 0.33
Nodes (5): Music Cues: happy-beats-business-moves-vol-1-by-ende-dot-app, Reveal Candidates, Strong Cues In Window, Use Policy, Useful Beat Grid

### Community 48 - "Music Cues: happy-beats-business-moves-vol-9-by-ende-dot-app"
Cohesion: 0.33
Nodes (5): Music Cues: happy-beats-business-moves-vol-9-by-ende-dot-app, Reveal Candidates, Strong Cues In Window, Use Policy, Useful Beat Grid

### Community 49 - "upload.js"
Cohesion: 0.33
Nodes (4): multer, storage, upload, multer

### Community 50 - "herbContract.js"
Cohesion: 0.33
Nodes (4): HerbContract, { Contract }, { evaluateLabResult, canCreateProduct }, fabric-contract-api

### Community 52 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, chai, mocha, sinon, sinon-chai

### Community 53 - "CHAPTER 3"
Cohesion: 0.50
Nodes (4): BASIC OPERATIONAL REQUIREMENT, CHAPTER 3, FUNCTIONAL REQUIREMENT, NON FUNCTIONAL REQUIREMENT

### Community 54 - "CHAPTER 3"
Cohesion: 0.50
Nodes (4): BASIC OPERATIONAL REQUIREMENT, CHAPTER 3, FUNCTIONAL REQUIREMENT, NON FUNCTIONAL REQUIREMENT

### Community 55 - "CHAPTER 3"
Cohesion: 0.50
Nodes (4): BASIC OPERATIONAL REQUIREMENT, CHAPTER 3, FUNCTIONAL REQUIREMENT, NON FUNCTIONAL REQUIREMENT

### Community 56 - "dependencies"
Cohesion: 0.67
Nodes (3): dependencies, fabric-contract-api, fabric-shim

### Community 57 - "ANNEXURE"
Cohesion: 0.67
Nodes (3): ANNEXURE, Annexure A: Tools and Models Used, Annexure B: Datasets and Resources

### Community 58 - "CHAPTER 4"
Cohesion: 0.67
Nodes (3): CHAPTER 4, DEVELOPMENT MODEL, FUNDAMENTAL DESIGN CONCEPTS

### Community 59 - "ANNEXURE"
Cohesion: 0.67
Nodes (3): ANNEXURE, Annexure A: Tools and Models Used, Annexure B: Datasets and Resources

### Community 60 - "CHAPTER 4"
Cohesion: 0.67
Nodes (3): CHAPTER 4, DEVELOPMENT MODEL, FUNDAMENTAL DESIGN CONCEPTS

### Community 61 - "ANNEXURE"
Cohesion: 0.67
Nodes (3): ANNEXURE, Annexure A: Tools and Models Used, Annexure B: Datasets and Resources

### Community 62 - "CHAPTER 4"
Cohesion: 0.67
Nodes (3): CHAPTER 4, DEVELOPMENT MODEL, FUNDAMENTAL DESIGN CONCEPTS

## Knowledge Gaps
- **527 isolated node(s):** `brag`, `mongoose`, `path`, `fs`, `{ evaluateLabResult, canCreateProduct }` (+522 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 574 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `canCreateProduct()` connect `herbContract.test.js` to `HerbContract`, `herbContract.js`, `fabricConnection.js`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `evaluateLabResult()` connect `herbContract.test.js` to `herbContract.js`, `fabricConnection.js`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `express` connect `fabricConnection.js` to `batchRoutes.js`, `backend/package.json`, `server.js`, `labRoutes.js`, `productController.js`, `authController.js`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `brag`, `mongoose`, `path` to the rest of the system?**
  _527 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `backend/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `frontend/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Humanizer: remove AI writing patterns` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._