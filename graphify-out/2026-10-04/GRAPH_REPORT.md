# Graph Report - Laksh major project  (2026-10-04)

## Corpus Check
- 133 files · ~770,111 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 918 nodes · 1141 edges · 86 communities (62 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30efb9a8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- compress.py
- dependencies
- App.jsx
- backend/package.json
- validate.py
- Humanizer: remove AI writing patterns
- chaincode/package.json
- server.js
- labRoutes.js
- productController.js
- labController.js
- 2. Components
- rules/graphify.md
- workflows/graphify.md
- herbContract.test.js
- e2e_playwright.js
- generate_test_pdfs.js
- devDependencies
- dependencies
- scripts
- Brag Plan: Root-to-Remedy
- Audio reference
- getFabricGateway
- analyze_music_cues.py
- Step 2: Write the brag plan
- /brag
- authController.js
- verifyRoutes.js
- Step 4: Validate, render, and deliver
- generate_report_figures.py
- Step 3: Hand off to Hyperframes
- Hyperframes Composition Brief: Root-to-Remedy
- Tone reference
- caveman-compress/README.md
- SFX Analysis Summary
- Step 1: Inspect the project
- BatchCache.js
- Rules
- Music Cues: happy-beats-business-moves-vol-10-by-ende-dot-app
- Music Cues: happy-beats-business-moves-vol-11-by-ende-dot-app
- Music Cues: happy-beats-business-moves-vol-12-by-ende-dot-app
- Music Cues: happy-beats-business-moves-vol-1-by-ende-dot-app
- Music Cues: happy-beats-business-moves-vol-9-by-ende-dot-app
- core.js
- core.test.js
- Karpathy-Inspired Claude Code Guidelines
- cavecrew/SKILL.md
- Caveman Help
- Rules
- build_full_report.py
- README.md
- Rules
- brag
- Caveman Compress
- caveman-commit
- caveman-review
- caveman-explore/package.json
- caveman-learn/package.json
- Review Caveman evidence
- Manage eval-gated experiments
- caveman-setup/SKILL.md
- Evaluate an optimization observation
- caveman-stats
- CLAUDE.md
- Karpathy Guidelines
- caveman-discover/SKILL.md
- skills/caveman-learn — the Caveman Learn editing skill (Apache-2.0, public)
- caveman-learn skill
- caveman-explore/tests/skill-file.test.mjs
- caveman-learn/tests/skill-file.test.mjs
- __init__.py
- investigate-first/SKILL.md
- lean-build/SKILL.md
- megacave/README.md
- migration/SKILL.md
- safe-refactor/SKILL.md
- surgical-patch/SKILL.md
- ultracave/README.md
- verify-and-stop/SKILL.md

## God Nodes (most connected - your core abstractions)
1. `_compress_file_locked()` - 18 edges
2. `getFabricGateway()` - 16 edges
3. `validate()` - 14 edges
4. `Brag Plan: Root-to-Remedy` - 14 edges
5. `getMongoStatus()` - 13 edges
6. `react` - 13 edges
7. `/brag` - 13 edges
8. `Step 2: Write the brag plan` - 13 edges
9. `analyze_track()` - 12 edges
10. `Karpathy-Inspired Claude Code Guidelines` - 11 edges

## Surprising Connections (you probably didn't know these)
- `_compress_file_locked()` --calls--> `validate()`  [EXTRACTED]
  .agents/skills/caveman-compress/scripts/compress.py → .agents/skills/caveman-compress/scripts/validate.py
- `getAllBatches()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/batchController.js → backend/config/db.js
- `getBatchById()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/batchController.js → backend/config/db.js
- `registerBatch()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/batchController.js → backend/config/db.js
- `uploadLabReport()` --calls--> `getMongoStatus()`  [EXTRACTED]
  backend/controllers/labController.js → backend/config/db.js

## Import Cycles
- None detected.

## Communities (86 total, 17 thin omitted)

### Community 0 - "compress.py"
Cohesion: 0.06
Nodes (62): main(), Caveman Compress CLI Usage: caveman <filepath>, backup_dir_for(), build_compress_prompt(), build_fix_prompt(), call_claude(), compress_file(), _compress_file_locked() (+54 more)

### Community 1 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, axios, html5-qrcode, lucide-react, react, react-dom, react-router-dom

### Community 2 - "App.jsx"
Cohesion: 0.08
Nodes (38): devDependencies, @types/react, @types/react-dom, vite, @vitejs/plugin-react, axios, name, private (+30 more)

### Community 3 - "backend/package.json"
Cohesion: 0.04
Nodes (44): multer, storage, upload, author, dependencies, axios, bcryptjs, cors (+36 more)

### Community 4 - "validate.py"
Cohesion: 0.11
Nodes (28): benchmark_pair(), count_tokens(), main(), print_table(), Path, count_bullets(), extract_code_blocks(), extract_fenced_spans() (+20 more)

### Community 5 - "Humanizer: remove AI writing patterns"
Cohesion: 0.05
Nodes (37): 10. Hyphenated pairs everywhere, 11. Passive voice and missing subjects, 12. Overused AI words, 13. Inflated significance, 14. Vague connection or association, 15. Shallow -ing riders, 16. Sales language, 17. Borrowed authority (+29 more)

### Community 6 - "chaincode/package.json"
Cohesion: 0.17
Nodes (11): author, description, engineStrict, chai, mocha, license, main, name (+3 more)

### Community 7 - "server.js"
Cohesion: 0.14
Nodes (13): connectDB(), mongoose, app, authRoutes, batchRoutes, { connectDB }, cors, express (+5 more)

### Community 8 - "labRoutes.js"
Cohesion: 0.15
Nodes (14): updateTransport(), authenticateToken(), jwt, requireRole(), { authenticateToken, requireRole }, express, router, upload (+6 more)

### Community 9 - "productController.js"
Cohesion: 0.21
Nodes (10): asObject(), BatchCache, createProduct(), { generateQR }, { getFabricGateway }, { getMongoStatus }, { v4: uuidv4 }, generateQR() (+2 more)

### Community 10 - "labController.js"
Cohesion: 0.13
Nodes (17): asObject(), BatchCache, crypto, { getFabricGateway }, { getMongoStatus }, { parseCoAPdf }, uploadLabReport(), { uploadToIPFS } (+9 more)

### Community 11 - "2. Components"
Cohesion: 0.17
Nodes (11): 1. System overview, 2.1 React SPA (frontend), 2.2 Express API (backend), 2.3 Hyperledger Fabric (ledger + chaincode), 2.4 IPFS (document storage), 2.5 MongoDB (off-chain cache), 2. Components, 3. Data flow — worked example (register → verify) (+3 more)

### Community 14 - "herbContract.test.js"
Cohesion: 0.17
Nodes (9): HerbContract, evaluateLabResult(), chai, { evaluateLabResult, canCreateProduct }, HerbContract, sinon, sinonChai, sinon (+1 more)

### Community 15 - "e2e_playwright.js"
Cohesion: 0.20
Nodes (9): devDependencies, playwright, playwright, assert, { chromium }, COA_PASS_PATH, loginAs(), path (+1 more)

### Community 16 - "generate_test_pdfs.js"
Cohesion: 0.29
Nodes (5): failLines, fs, outDir, passLines, path

### Community 17 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, chai, mocha, sinon, sinon-chai

### Community 18 - "dependencies"
Cohesion: 0.67
Nodes (3): dependencies, fabric-contract-api, fabric-shim

### Community 19 - "scripts"
Cohesion: 0.67
Nodes (3): scripts, start, test

### Community 20 - "Brag Plan: Root-to-Remedy"
Cohesion: 0.10
Nodes (19): Audio direction, Brag Plan: Root-to-Remedy, Duration: 20 seconds, Format: landscape — 1920x1080, Hook (first 2-3 seconds), Key moments (the middle), Outro / punchline, Scene 1 — The Hook — 3.5s (+11 more)

### Community 21 - "Audio reference"
Cohesion: 0.12
Nodes (17): Adding SFX elements, Asset paths, Audio-reactive visuals, Audio reference, Available tracks, Beat and cue sources, `casino/` — Card and chip sounds, `impact/` — Impact sounds (+9 more)

### Community 22 - "getFabricGateway"
Cohesion: 0.14
Nodes (18): getFabricGateway(), { MockLedgerAdapter }, seedDemoData(), asObject(), BatchCache, getAllBatches(), getBatchById(), { getFabricGateway } (+10 more)

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
Cohesion: 0.19
Nodes (12): getMongoStatus(), bcrypt, { getMongoStatus }, jwt, { JWT_SECRET }, login(), MOCK_USERS, register() (+4 more)

### Community 27 - "verifyRoutes.js"
Cohesion: 0.28
Nodes (7): asObject(), { getFabricGateway }, verifyProduct(), express, router, { verifyProduct }, express

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

### Community 33 - "caveman-compress/README.md"
Cohesion: 0.09
Nodes (20): Before / After, Benchmarks, How It Work, <img src="../../docs/assets/dancing-rock.svg" width="20" height="20" alt="rock"/> Caveman (285 tokens), Install, Original (706 tokens), Part of Caveman, Security (+12 more)

### Community 34 - "SFX Analysis Summary"
Cohesion: 0.29
Nodes (6): Family Summary, Lower-Risk Picks By Use Case, Safest General Picks, Selection Rules, SFX Analysis Summary, Signal Guide

### Community 36 - "Step 1: Inspect the project"
Cohesion: 0.29
Nodes (7): Color extraction, Font extraction, Rule: nothing secret leaves this step, Step 1: Inspect the project, The 9-question rubric, What to look for, What to skip

### Community 37 - "BatchCache.js"
Cohesion: 0.29
Nodes (5): batchCacheSchema, mongoose, mongoose, userSchema, mongoose

### Community 39 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

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

### Community 49 - "core.js"
Cohesion: 0.18
Nodes (15): core, MockLedgerAdapter, bKey(), createProduct(), getBatch(), pKey(), R, registerBatch() (+7 more)

### Community 50 - "core.test.js"
Cohesion: 0.18
Nodes (13): biomassRequiredMg(), maxUnitsFromBalance(), parseKgToMg(), parseUnits(), { SPECIES_SPECS }, validateSpecies(), SPECIES_SPECS, assert (+5 more)

### Community 51 - "Karpathy-Inspired Claude Code Guidelines"
Cohesion: 0.12
Nodes (15): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Customization, How to Know It's Working, Install, Karpathy-Inspired Claude Code Guidelines (+7 more)

### Community 53 - "cavecrew/SKILL.md"
Cohesion: 0.14
Nodes (12): cavecrew, Example chaining, How to invoke, Model overrides, See also, What it does, Auto-clarity (inherited), Chaining patterns (+4 more)

### Community 57 - "Caveman Help"
Cohesion: 0.14
Nodes (12): caveman-help, Example output, How to invoke, See also, What it does, Caveman Help, Configure Default Mode, Deactivate (+4 more)

### Community 58 - "Rules"
Cohesion: 0.15
Nodes (12): 1. Classical register, 2. Particles carry structure, 3. Each fact once, 4. Payload in original script, 5. Tool runs, 6. Never perform, Floor, megacave (+4 more)

### Community 66 - "Rules"
Cohesion: 0.15
Nodes (12): 1. Fragments, 2. One word when one word is enough, 3. Each fact once, 4. Cut conjunctions only when order survives, 5. Tool runs, 6. Never perform, Floor, Persistence (+4 more)

### Community 82 - "Caveman Compress"
Cohesion: 0.17
Nodes (11): Boundaries, Caveman Compress, Compress, Compression Rules, Pattern, Preserve EXACTLY (never modify), Preserve Structure, Process (+3 more)

### Community 83 - "caveman-commit"
Cohesion: 0.18
Nodes (9): caveman-commit, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Examples (+1 more)

### Community 84 - "caveman-review"
Cohesion: 0.18
Nodes (9): caveman-review, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Examples (+1 more)

### Community 85 - "caveman-explore/package.json"
Cohesion: 0.20
Nodes (9): description, files, license, name, private, scripts, test, type (+1 more)

### Community 86 - "caveman-learn/package.json"
Cohesion: 0.20
Nodes (9): description, files, license, name, private, scripts, test, type (+1 more)

### Community 87 - "Review Caveman evidence"
Cohesion: 0.25
Nodes (7): Hard rules, Review Caveman evidence, Step 1 — Load context, Step 2 — Establish baseline, Step 3 — Test the leading explanation with traces, Step 4 — Inspect representative traces, Step 5 — Report

### Community 88 - "Manage eval-gated experiments"
Cohesion: 0.25
Nodes (7): Manage eval-gated experiments, Non-negotiable gates, Step 1 — Load project and experiment, Step 2 — Evaluate evidence, Step 3 — Propose one action, Step 4 — Block unsafe execution, Step 5 — Re-read after external operator action

### Community 89 - "caveman-setup/SKILL.md"
Cohesion: 0.25
Nodes (7): Failure templates (use verbatim, filled in — never soften), Rules (non-negotiable), Step 1 — Find every live LLM callsite, Step 2 — Pick the app slug, Step 3 — Wire each callsite, Step 4 — Verify with one real request, Step 5 — Report

### Community 90 - "Evaluate an optimization observation"
Cohesion: 0.29
Nodes (6): 1. Read the exact observations, 2. Ask the operator to choose, 3. Design a candidate and paired eval, 4. Apply only the approved candidate, 5. Report observations, not savings, Evaluate an optimization observation

### Community 91 - "caveman-stats"
Cohesion: 0.29
Nodes (5): caveman-stats, Example output, How to invoke, See also, What it does

### Community 92 - "CLAUDE.md"
Cohesion: 0.33
Nodes (5): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, CLAUDE.md

### Community 93 - "Karpathy Guidelines"
Cohesion: 0.33
Nodes (5): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, Karpathy Guidelines

### Community 94 - "caveman-discover/SKILL.md"
Cohesion: 0.33
Nodes (5): Step 1 — Inventory the workflows, Step 2 — Name them, Step 3 — Propose, then apply, Step 4 — Verify, Step 5 — Report

### Community 95 - "skills/caveman-learn — the Caveman Learn editing skill (Apache-2.0, public)"
Cohesion: 0.40
Nodes (4): Boundary (binding), Install path, Layout, skills/caveman-learn — the Caveman Learn editing skill (Apache-2.0, public)

### Community 96 - "caveman-learn skill"
Cohesion: 0.40
Nodes (4): caveman-learn skill, Honesty, Install, What it does

## Knowledge Gaps
- **512 isolated node(s):** `brag`, `name`, `version`, `license`, `private` (+507 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 610 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MockLedgerAdapter` connect `core.js` to `core.test.js`, `getFabricGateway`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `getFabricGateway()` connect `getFabricGateway` to `server.js`, `labRoutes.js`, `productController.js`, `labController.js`, `core.js`, `verifyRoutes.js`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `evaluateLabResult()` connect `herbContract.test.js` to `core.test.js`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `brag`, `name`, `version` to the rest of the system?**
  _512 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compress.py` be split into smaller, more focused modules?**
  _Cohesion score 0.05547785547785548 - nodes in this community are weakly interconnected._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07982583454281568 - nodes in this community are weakly interconnected._
- **Should `backend/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._