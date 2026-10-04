# Graph Report - Laksh major project  (2026-09-10)

## Corpus Check
- 44 files · ~15,185 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 282 nodes · 429 edges · 14 communities (12 shown, 2 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7c272450`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- productController.js
- fabricConnection.js
- App.jsx
- backend/package.json
- frontend/package.json
- server.js
- chaincode/package.json
- authController.js
- labRoutes.js
- dependencies
- labController.js
- 2. Components
- rules/graphify.md
- workflows/graphify.md

## God Nodes (most connected - your core abstractions)
1. `getFabricGateway()` - 15 edges
2. `react` - 13 edges
3. `getMongoStatus()` - 12 edges
4. `lucide-react` - 10 edges
5. `HerbContract` - 9 edges
6. `MockLedgerAdapter` - 7 edges
7. `express` - 7 edges
8. `useAuth()` - 7 edges
9. `evaluateLabResult()` - 6 edges
10. `canCreateProduct()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `login()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/authController.js → backend/config/db.js
- `register()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/authController.js → backend/config/db.js
- `uploadLabReport()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/labController.js → backend/config/db.js
- `uploadLabReport()` --calls--> `getFabricGateway()`  [EXTRACTED]
  backend/controllers/labController.js → backend/config/fabricConnection.js
- `updateTransport()` --calls--> `getFabricGateway()`  [EXTRACTED]
  backend/controllers/productController.js → backend/config/fabricConnection.js

## Import Cycles
- None detected.

## Communities (14 total, 2 thin omitted)

### Community 0 - "productController.js"
Cohesion: 0.10
Nodes (27): connectDB(), getMongoStatus(), mongoose, getFabricGateway(), BatchCache, getAllBatches(), getBatchById(), { getFabricGateway } (+19 more)

### Community 1 - "fabricConnection.js"
Cohesion: 0.08
Nodes (18): { evaluateLabResult, canCreateProduct }, fs, MockLedgerAdapter, path, HerbContract, { Contract }, { evaluateLabResult, canCreateProduct }, HerbContract (+10 more)

### Community 2 - "App.jsx"
Cohesion: 0.18
Nodes (18): App(), ProtectedRoute(), Navbar(), ProvenanceCard(), QRScanner(), StatusBadge(), AuthContext, AuthProvider() (+10 more)

### Community 3 - "backend/package.json"
Cohesion: 0.07
Nodes (27): author, description, devDependencies, chai, mocha, nodemon, supertest, engines (+19 more)

### Community 4 - "frontend/package.json"
Cohesion: 0.07
Nodes (27): dependencies, axios, html5-qrcode, lucide-react, react, react-dom, react-router-dom, devDependencies (+19 more)

### Community 5 - "server.js"
Cohesion: 0.12
Nodes (16): { getFabricGateway }, verifyProduct(), express, router, { verifyProduct }, app, authRoutes, batchRoutes (+8 more)

### Community 6 - "chaincode/package.json"
Cohesion: 0.09
Nodes (21): author, dependencies, fabric-contract-api, fabric-shim, description, devDependencies, chai, mocha (+13 more)

### Community 7 - "authController.js"
Cohesion: 0.16
Nodes (12): bcrypt, { getMongoStatus }, jwt, { JWT_SECRET }, login(), MOCK_USERS, register(), User (+4 more)

### Community 8 - "labRoutes.js"
Cohesion: 0.10
Nodes (18): updateTransport(), authenticateToken(), jwt, requireRole(), multer, storage, upload, { authenticateToken, requireRole } (+10 more)

### Community 9 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, axios, bcryptjs, cors, dotenv, express, form-data, jsonwebtoken (+4 more)

### Community 10 - "labController.js"
Cohesion: 0.12
Nodes (15): BatchCache, { getFabricGateway }, { getMongoStatus }, uploadLabReport(), { uploadToIPFS }, batchCacheSchema, mongoose, mongoose (+7 more)

### Community 11 - "2. Components"
Cohesion: 0.17
Nodes (11): 1. System overview, 2.1 React SPA (frontend), 2.2 Express API (backend), 2.3 Hyperledger Fabric (ledger + chaincode), 2.4 IPFS (document storage), 2.5 MongoDB (off-chain cache), 2. Components, 3. Data flow — worked example (register → verify) (+3 more)

## Knowledge Gaps
- **158 isolated node(s):** `mongoose`, `path`, `fs`, `{ evaluateLabResult, canCreateProduct }`, `jwt` (+153 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 167 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `express` connect `server.js` to `productController.js`, `labRoutes.js`, `backend/package.json`, `authController.js`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `mongoose`, `path`, `fs` to the rest of the system?**
  _158 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `productController.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1028225806451613 - nodes in this community are weakly interconnected._
- **Should `fabricConnection.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07777777777777778 - nodes in this community are weakly interconnected._
- **Should `backend/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `frontend/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `server.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11695906432748537 - nodes in this community are weakly interconnected._