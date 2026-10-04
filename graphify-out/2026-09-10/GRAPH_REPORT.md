# Graph Report - Laksh major project  (2026-09-10)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 266 nodes · 416 edges · 10 communities
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

## God Nodes (most connected - your core abstractions)
1. `getFabricGateway()` - 15 edges
2. `react` - 13 edges
3. `getMongoStatus()` - 12 edges
4. `lucide-react` - 10 edges
5. `HerbContract` - 9 edges
6. `MockLedgerAdapter` - 7 edges
7. `useAuth()` - 7 edges
8. `express` - 7 edges
9. `canCreateProduct()` - 6 edges
10. `evaluateLabResult()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `login()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/authController.js → backend/config/db.js
- `register()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/authController.js → backend/config/db.js
- `updateTransport()` --calls--> `getFabricGateway()`  [EXTRACTED]
  backend/controllers/productController.js → backend/config/fabricConnection.js
- `verifyProduct()` --calls--> `getFabricGateway()`  [EXTRACTED]
  backend/controllers/verifyController.js → backend/config/fabricConnection.js
- `ProtectedRoute()` --calls--> `useAuth()`  [EXTRACTED]
  frontend/src/App.jsx → frontend/src/context/AuthContext.jsx

## Import Cycles
- None detected.

## Communities (10 total, 0 thin omitted)

### Community 0 - "productController.js"
Cohesion: 0.07
Nodes (38): getMongoStatus(), mongoose, getFabricGateway(), BatchCache, getAllBatches(), getBatchById(), { getFabricGateway }, { getMongoStatus } (+30 more)

### Community 1 - "fabricConnection.js"
Cohesion: 0.08
Nodes (18): { evaluateLabResult, canCreateProduct }, fs, MockLedgerAdapter, path, HerbContract, { Contract }, { evaluateLabResult, canCreateProduct }, HerbContract (+10 more)

### Community 2 - "App.jsx"
Cohesion: 0.17
Nodes (19): App(), ProtectedRoute(), Navbar(), ProvenanceCard(), QRScanner(), StatusBadge(), AuthContext, AuthProvider() (+11 more)

### Community 3 - "backend/package.json"
Cohesion: 0.07
Nodes (26): multer, storage, upload, author, description, devDependencies, chai, mocha (+18 more)

### Community 4 - "frontend/package.json"
Cohesion: 0.07
Nodes (26): dependencies, axios, html5-qrcode, lucide-react, react, react-dom, react-router-dom, devDependencies (+18 more)

### Community 5 - "server.js"
Cohesion: 0.08
Nodes (22): connectDB(), { getFabricGateway }, verifyProduct(), express, router, { verifyProduct }, app, authRoutes (+14 more)

### Community 6 - "chaincode/package.json"
Cohesion: 0.09
Nodes (21): author, dependencies, fabric-contract-api, fabric-shim, description, devDependencies, chai, mocha (+13 more)

### Community 7 - "authController.js"
Cohesion: 0.12
Nodes (15): bcrypt, { getMongoStatus }, jwt, { JWT_SECRET }, login(), MOCK_USERS, register(), User (+7 more)

### Community 8 - "labRoutes.js"
Cohesion: 0.15
Nodes (14): updateTransport(), authenticateToken(), jwt, requireRole(), { authenticateToken, requireRole }, express, router, upload (+6 more)

### Community 9 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, axios, bcryptjs, cors, dotenv, express, form-data, jsonwebtoken (+4 more)

## Knowledge Gaps
- **147 isolated node(s):** `mongoose`, `BatchCache`, `{ getFabricGateway }`, `{ getMongoStatus }`, `{ v4: uuidv4 }` (+142 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 153 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `express` connect `server.js` to `productController.js`, `labRoutes.js`, `backend/package.json`, `authController.js`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `mongoose`, `BatchCache`, `{ getFabricGateway }` to the rest of the system?**
  _147 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `productController.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07053140096618357 - nodes in this community are weakly interconnected._
- **Should `fabricConnection.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07777777777777778 - nodes in this community are weakly interconnected._
- **Should `backend/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `frontend/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `server.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08307692307692308 - nodes in this community are weakly interconnected._