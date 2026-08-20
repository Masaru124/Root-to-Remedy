# Architecture — Root-to-Remedy

## 1. System overview

```
                         ┌──────────────────────────┐
                         │        React SPA          │
                         │  Farmer / Lab / Mfr /      │
                         │  Consumer (public) pages   │
                         └─────────────┬──────────────┘
                                       │ HTTPS + JWT (except /verify, /login)
                                       ▼
                         ┌──────────────────────────┐
                         │   Express API (Node.js)   │
                         │  routes / controllers /   │
                         │  auth middleware          │
                         └──┬───────────┬────────────┘
                            │           │
              Fabric SDK    │           │  ipfs-http-client
              (Gateway)     │           │
                            ▼           ▼
                 ┌────────────────┐  ┌──────────────────┐
                 │ Hyperledger     │  │ IPFS pinning      │
                 │ Fabric network  │  │ (Pinata / local    │
                 │ (chaincode:     │  │  kubo node)        │
                 │ herbContract)   │  │  → lab report PDFs │
                 └────────────────┘  └──────────────────┘
                            │
                            │ mirrored / cached for fast reads
                            ▼
                 ┌────────────────┐
                 │   MongoDB        │  ← users, sessions, denormalized
                 │  (off-chain)     │     read cache, NOT source of truth
                 └────────────────┘
```

**Source-of-truth rule (important, keep this explicit everywhere in the codebase and report):**
the ledger is the source of truth for batch/lab/product/transport state. MongoDB is a read cache
and holds identity data (users, passwords, sessions) that has no business being on a public,
append-only ledger anyway.

## 2. Components

### 2.1 React SPA (frontend)
- Pages: LoginPage, FarmerPage, LabPage, ManufacturerPage, ConsumerPage (public, no auth guard).
- Route guard reads role out of the JWT to redirect after login and block cross-role access
  client-side. Client-side guarding is a UX nicety only — the real enforcement is server-side
  (§2.2) and in chaincode (§2.3). Never rely on the frontend to enforce FR-8 or FR-13.

### 2.2 Express API (backend)
- `routes/` — thin, one file per resource (auth, batch, lab, consumer).
- `controllers/` — orchestrate: validate input → call Fabric SDK → optionally call IPFS → write
  cache row to Mongo → respond.
- `middleware/auth.js` — verifies JWT, attaches `req.user.role`, rejects role-mismatched routes.
- `fabric/connection.js` — wraps the Fabric `Gateway` class; loads `connection.json`; exposes
  `submitTransaction(fnName, ...args)` and `evaluateTransaction(fnName, ...args)`.
- `ipfs/upload.js` — wraps the pinning client; exposes `uploadToIPFS(buffer) → cid`.
- `qr/generate.js` — wraps the `qrcode` package; exposes `generateQR(productId) → base64 PNG`.

### 2.3 Hyperledger Fabric (ledger + chaincode)
- Single channel (`mychannel`), single chaincode (`herbcontract`) with 5 functions (as specified
  in your existing chaincode guide): `RegisterBatch`, `UploadLabReport`, `UpdateTransport`,
  `CreateProduct`, `VerifyProduct`.
- **Business rules belong in chaincode, not the backend.** The APPROVED/REJECTED threshold
  (purity ≥ 95, contamination == 0) and the "can't manufacture from a non-approved batch" check
  must be enforced inside `UploadLabReport`/`CreateProduct` themselves. If they only live in
  Express, anyone hitting the API directly (Postman, curl) bypasses your integrity guarantees —
  which defeats the entire point of the project.

### 2.4 IPFS (document storage)
- Stores lab report PDFs off-chain; only the content hash (CID) goes into chaincode state.
- Use Pinata (free tier) or a self-hosted `ipfs/kubo` Docker container — **not Infura**, whose
  IPFS service no longer issues new keys to the public (verified August 2026).

### 2.5 MongoDB (off-chain cache)
- Collections: `users` (auth only — never store role-sensitive business data here as if it were
  authoritative), `batchCache` (denormalized copy of on-chain batch state, refreshed on every
  Fabric write, used for list views so the UI isn't doing a chain read per row).

## 3. Data flow — worked example (register → verify)

1. Farmer submits form → `POST /api/register` → Express validates → calls
   `contract.submitTransaction('RegisterBatch', ...)` → Fabric commits → Express writes/upserts
   the same data into `batchCache` in Mongo → returns `batchId` to frontend.
2. Lab uploads PDF → `POST /api/upload-lab` → Express uploads PDF to IPFS → gets `cid` → calls
   `contract.submitTransaction('UploadLabReport', batchId, cid, purity, contamination)` →
   chaincode computes APPROVED/REJECTED and writes it into ledger state → Express updates
   `batchCache`.
3. Manufacturer creates product → `POST /api/manufacture` → Express calls
   `contract.submitTransaction('CreateProduct', ...)` → **chaincode itself** checks
   `batch.status === 'APPROVED'` and rejects otherwise → on success, Express generates QR.
4. Consumer scans → `GET /api/verify/:qrCode` (no auth) → Express calls
   `contract.evaluateTransaction('VerifyProduct', qrCode)` (a read, not a write — cheaper/faster)
   → returns full JSON → frontend renders the provenance card.

## 4. Tricky integration points (in priority order of risk)

1. **Fabric SDK connection profile handoff (P1 → P2).** `connection.json` bakes in
   hostnames/ports/TLS certs for a specific running network. Decide *before* Week 3 which single
   machine or shared VM is "the" integration Fabric network — four laptops each running their own
   Fabric instance means four different, mutually incompatible `connection.json` files, and
   nothing will connect during integration testing.

2. **Chain/cache consistency.** Every Fabric write in the controllers above must be followed by a
   cache update in the same request handler, wrapped so a cache-write failure doesn't silently
   leave stale data (log it loudly at minimum; a background reconciliation job is the more robust
   fix but is optional for MVP).

3. **IPFS pin persistence.** Free pinning tiers can garbage-collect unpinned or low-traffic
   content. Re-verify all demo-critical CIDs are still resolvable a day before any presentation —
   don't assume "uploaded once" means "available forever."

4. **CORS + cold starts across three deploy targets.** Vercel/Netlify (frontend), Railway/Render
   (backend) — free-tier backends sleep after inactivity, producing a slow/failed first request.
   Test the public `/verify` flow cold, not just while you're actively developing.

5. **Chaincode redeploys are not zero-downtime and have no migration story.** Changing the shape
   of `batch` after data already exists means old records don't match the new schema. Freeze the
   chaincode's data model by a fixed date (see phases.md) — treat later schema wants as
   "document as future work," not "ship it."

## 5. Honest note on the trust model (for your report's architecture chapter)

This system has **one operator running one organization's peers**. It is not decentralized in the
sense that matters for blockchain's usual value proposition (no independent party can out-vote or
audit you against your will). What it *does* genuinely provide over a plain database:

- An **append-only, hash-linked structure** that makes silent retroactive edits to historical
  records detectable — assuming an attacker can't also rewrite the ledger's replicated log, which
  in a single-org deployment is a real assumption to be honest about.
- A **clear separation of "who is allowed to assert what"** via chaincode-enforced rules (only a
  lab result can flip a batch to APPROVED; only an approved batch can become a product) that's
  harder to accidentally bypass than an equivalent Express `if` statement, because it's enforced
  at the ledger layer, not the application layer.

Frame the report/PPT around *tamper-evidence and rule enforcement*, not *decentralization* — the
first is true of this system, the second isn't, and a reviewer who knows Fabric will notice the
gap if you claim it.
