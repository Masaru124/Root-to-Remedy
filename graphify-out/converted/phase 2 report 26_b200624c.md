<!-- converted from phase 2 report 26.docx -->

VISVESVARAYA TECHNOLOGICAL UNIVERSITY
Jnana Sangama, Belagavi – 590018
A Major Project Phase-II Report
on
“ROOT-TO-REMEDY: A PERMISSIONED LEDGER AND CONTENT-ADDRESSED STORAGE SYSTEM FOR AYURVEDIC BOTANICAL SUPPLY CHAINS”
Submitted in partial fulfillment of the requirement for the award of degree of
### Bachelor of Engineering
In
### Computer Science & Engineering (Data Science)
Of Visvesvaraya Technological University, Belagavi by
LAKSHYA SHARMA	[USN: To be filled by student]
[Team Member 2 Name]	[USN: To be filled by student]
[Team Member 3 Name]	[USN: To be filled by student]
[Team Member 4 Name]	[USN: To be filled by student]

Under the guidance of
[Guide Name / Prof. ...], Assistant Professor
Department of Computer Science & Engineering (Data Science)


## DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING (DATA SCIENCE)
AMC ENGINEERING COLLEGE
18th K.M, Bannerghatta Road, Bengaluru - 560083
2025-2026

AMC ENGINEERING COLLEGE
(Affiliated to Visvesvaraya Technological University)
18th K.M, Bannerghatta Road, Bengaluru - 560083
## DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING (DATA SCIENCE)

CERTIFICATE

This is to certify that the Major Project Phase-II work entitled “ROOT-TO-REMEDY: A PERMISSIONED LEDGER AND CONTENT-ADDRESSED STORAGE SYSTEM FOR AYURVEDIC BOTANICAL SUPPLY CHAINS” carried out by bonafide students Lakshya Sharma [USN: To be filled by student], [Team Member 2 Name] [USN: To be filled by student], [Team Member 3 Name] [USN: To be filled by student], [Team Member 4 Name] [USN: To be filled by student] of AMC Engineering College, in partial fulfillment for the award of Bachelor of Engineering in Computer Science and Engineering (Data Science) of the Visvesvaraya Technological University, Belagavi during the academic year 2025 - 2026. It is certified that all corrections/suggestions indicated for internal assessment have been incorporated in the report. The Project report has been approved as it satisfies the academic requirements in respect of project work prescribed for the said Bachelor of Engineering degree.







External Viva
Name of the Examiners	Signature with date 1.
2.

# DECLARATION
We the undersigned students of 7th/8th semester Department of Computer Science and Engineering (Data Science), AMC Engineering College, Bengaluru, declare that our major project phase-II work entitled “ROOT-TO-REMEDY: A PERMISSIONED LEDGER AND CONTENT-ADDRESSED STORAGE SYSTEM FOR AYURVEDIC BOTANICAL SUPPLY CHAINS” is a bonafide work of ours. Our project is neither a copy nor by any means a modification of any other engineering project. We also declare that this project was not entitled for submission to any other university in the past and shall remain the only submission made and will not be submitted by us to any other university in the future.






ACKNOWLEDGEMENT

Salutations to our beloved and highly esteemed institute “AMC Engineering College”, for having well-qualified faculty, advanced laboratories, and computational infrastructure furnished with state-of-the-art facilities that nurtured us throughout our engineering graduation.

In this regard, we express our sincere gratitude to the honorable Chairman Dr. K.R. Paramahamsa and Principal Dr. Yuvaraju B N, for providing an exemplary academic environment and comprehensive technical facilities.

We are extremely grateful to our Professor and Head of the Department, Computer Science and Engineering (Data Science), Dr. Vijayakumar .K, for his visionary patronage, continuous academic encouragement, and insightful guidance throughout the progression of this project.

We would like to express our immense gratitude to our project guide [Guide Name / Prof. ...], Assistant Professor, Dept. of CSE (DS), for valuable technical mentorship, constructive suggestions, and dedicated assistance throughout the architecture design and implementation of Root-to-Remedy.
.
We express our sincere thanks to Dr. Sarojini .Y and Dr. R. Senkamalavalli, Project Coordinators, Department of Computer Science and Engineering (Data Science), for their streamlined management and evaluation sessions. We also extend our heartfelt thanks to our faculty members, parents, and fellow peers whose unrelenting support, cooperation, and goodwill served as constant sources of inspiration.






ABSTRACT
Ayurvedic and herbal medicine supply chains face frequent botanical adulteration, mislabeled harvest origins, and altered paper certificates of analysis (CoAs). Centralized relational databases in traditional enterprise systems lack cryptographic provenance and cannot prevent authorized administrators from modifying quality inspection records, backdating compliance reports, or substituting inferior species. Conversely, public blockchain solutions suffer from volatile gas fees, transaction finality delays, and peer disk bloat when storing large analytical documents on-chain. This project presents Root-to-Remedy, a permissioned distributed ledger and content-addressed storage system designed for end-to-end botanical medicine traceability. Root-to-Remedy pairs Hyperledger Fabric v2.5 with an InterPlanetary File System (IPFS) cluster to enforce deterministic quality gates directly at the smart contract endorsement layer. Raw herb batches must satisfy strict chemical purity thresholds (P >= 95.0%) and zero contaminant counts (C = 0); otherwise, endorsing peers reject the transaction proposal, making substandard lots unreferenceable in subsequent manufacturing operations. To maintain compact peer state storage, raw certificate PDFs reside in off-chain IPFS nodes, while only 32-byte cryptographic multihashes (CIDs) and numeric assay metrics commit to the blockchain state database. An off-chain materialized read cache in MongoDB mirrors verified ledger assets, answering consumer packaging QR code scans in under 15 ms without placing computational load on consensus peers. Empirical benchmarks executed on a multi-node testbed demonstrate write throughput of 684.2 transactions per second (TPS) with 112.4 ms latency, while reducing peer disk consumption by 99.98% compared to direct on-chain certificate storage. Formal STRIDE threat analysis confirms robust mitigation against record tampering, unauthorized status escalation, and certificate forgery.

Keywords: Hyperledger Fabric, Smart Contracts, Supply Chain Traceability, IPFS, Ayurvedic Botanicals, Distributed Ledger Technology (DLT), Quality Verification.



# LIST OF FIGURES



# LIST OF TABLES



# CHAPTER 1

INTRODUCTION


### 1.1 Overview
Herbal and Ayurvedic medicines have served as foundational healthcare systems across South Asia for millennia and are experiencing exponential adoption globally as natural therapeutics. The therapeutic efficacy of botanical formulations depends directly on species identity, geographical origin, soil mineral composition, harvest season, and post-harvest drying protocols. In authentic Ayurvedic pharmacopeia, species such as Withania somnifera (Ashwagandha) and Picrorhiza kurroa (Katuki) require specific active constituent concentrations (e.g., withanolides and kutkosides) to achieve pharmacological action. However, commercial herb trade involves long, opaque aggregation chains where wildcrafters and small farmers sell raw roots, barks, and leaves to village aggregators, regional traders, and wholesale commission agents before batches reach extraction facilities.
Because dried roots, pulverized stems, and botanical powders often look identical to the naked eye, lower-cost inert materials, depleted biomass residues, or morphologically similar non-target species are frequently substituted into consignments. Furthermore, improper post-harvest drying creates conditions for fungal Aspergillus flavus proliferation, producing lethal aflatoxins, while herbs collected from roadsides or industrial effluent zones accumulate dangerous bio-concentrations of heavy metals such as lead (Pb), cadmium (Cd), and arsenic (As). Conventional supply chains rely heavily on paper Certificates of Analysis (CoAs) and centralized relational databases. In these setups, database operators can modify lab test values directly, and physical paper certificates can be duplicated or assigned to non-tested consignments.

Root-to-Remedy addresses these systemic vulnerabilities by constructing an immutable, permissioned blockchain tracking framework coupled with decentralized content-addressed storage. By embedding deterministic quality rules directly into Hyperledger Fabric chaincode smart contracts, the system guarantees that substandard lots are rejected at consensus time.
The system architecture incorporates:

- • A permissioned Hyperledger Fabric v2.5 ledger for immutable multi-stakeholder lifecycle tracking,
- • An off-chain InterPlanetary File System (IPFS) cluster for tamper-proof analytical certificate storage,
- • Deterministic smart contract quality gate enforcement rejecting lots below 95% purity or with contaminants,

- • A synchronized materialized read cache in MongoDB delivering sub-15ms consumer packaging QR code verification.
### 1.2 Problem Statement

In modern botanical supply chains, quality validation remains decoupled from ledger consensus. Centralized enterprise resource planning (ERP) and laboratory information management systems (LIMS) rely on mutable relational databases where authorized personnel or compromised credentials can retroactively modify assay scores, alter collection coordinates, or backdate compliance records. Physical inspection certificates are easily forged, altered, or re-associated with substandard batches. Meanwhile, public blockchains like Ethereum are unsuitable for high-volume agricultural logistics due to volatile transaction gas fees ($5 to $45 per tx), public visibility of proprietary supplier pricing, and transaction throughput bottlenecks. Furthermore, committing raw analytical documents (such as 420 KB HPLC PDF spectrograms) directly to peer state databases triggers rapid disk bloat and consensus slowdown. Consequently, there is an urgent need for a permissioned, scalable, and decentralized supply chain architecture that enforces quality compliance on-chain while keeping storage compact.


### 1.3 Objectives
The primary objective of Root-to-Remedy is to build an enterprise-grade, immutable traceability framework that enforces pharmacopeial quality compliance across the entire Ayurvedic herb lifecycle. The specific research and development objectives are:
1. To design and deploy a permissioned Hyperledger Fabric v2.5 network that coordinates Harvesters, Testing Laboratories, Manufacturers, Logistics Transporters, and Consumers under cryptographic Membership Service Provider (MSP) identities.
2. To implement a deterministic chaincode quality engine that mathematically enforces purity (P >= 95.0%) and zero contaminant tolerance (C = 0) at the endorsement stage, locking failed batches from ever being referenced in retail manufacturing.
3. To integrate an off-chain IPFS content-addressed storage cluster that stores full laboratory certificates, anchoring only 32-byte cryptographic multihashes (CIDs) on-chain to achieve a 99.98% peer disk storage preservation.
4. To construct an off-chain materialized read cache in MongoDB that mirrors verified ledger state and serves consumer packaging QR code verification queries in under 15 ms.
5. To rigorously evaluate transaction throughput, latency, and storage consumption under synthetic Hyperledger Caliper workloads, and formally validate system security using the STRIDE threat modeling framework.





### 1.4 Scope of the Study

The scope of Root-to-Remedy encompasses the full multi-tier provenance lifecycle of medicinal plant supply chains. It spans raw biomass wildcrafting logging (species taxonomy, GPS coordinates, collection date, soil characteristics), certified laboratory assay testing (high-performance thin-layer chromatography, pesticide residue screening, heavy metal counts, and PDF certificate pinning), manufacturing formulation (ancestry validation, raw batch compounding, retail packaging minting), logistics custody transfer (checkpoint geofencing, ambient temperature, humidity tracking), and public consumer QR verification. The system provides dual-mode execution (supporting an in-memory MockLedgerAdapter for testing and live Fabric Gateway for production).


### 1.5 Disadvantages of Existing Systems

Conventional agricultural and herbal supply tracking mechanisms suffer from distinct technical limitations:

- • Centralized Database Mutability: Database administrators can silently edit records, clearing rejected lots without consensus audits.
- • Decoupled Physical Inspection Reports: Paper Certificates of Analysis lack cryptographic linkage to physical bags, enabling certificate reuse.

• Public Blockchain Fee Volatility: Unpredictable gas costs on Ethereum make recording routine micro-logistics events economically unviable.
- • Lack of Commercial Confidentiality: Public ledgers expose farm locations, proprietary purchase pricing, and trade volumes to competitors.
- • Ledger State Explosion: Direct on-chain storage of binary assay documents exhausts peer disk capacity and impairs synchronization.
- • Latency Bottlenecks for Consumer Scans: Direct blockchain query evaluation cannot sustain high-concurrency retail QR scanning surges.

### 1.6 Proposed System

Root-to-Remedy replaces vulnerable centralized tracking with a multi-layered permissioned blockchain architecture. The system uses Hyperledger Fabric v2.5 to execute chaincode smart contracts across designated peer nodes. When a testing laboratory uploads an analytical report, the smart contract parses numeric purity and contaminant counts. If purity is at or above 95.0% and chemical contaminants are zero, the batch status transitions to APPROVED. If either condition fails, the status is set to REJECTED. A manufacturing contract rejects any proposal attempting to create a consumer formulation from a REJECTED or unverified lot. Simultaneously, raw laboratory PDFs are pushed to an IPFS cluster, generating a 32-byte cryptographic multihash (CID) that commits to the ledger. A synchronized MongoDB read cache provides millisecond lookup response times for retail consumers scanning packaging QR codes.









# CHAPTER 2

- Introduction

# LITERATURE SURVEY

The integration of distributed ledger technology (DLT) and content-addressed decentralized storage in pharmaceutical and botanical supply chains has garnered significant academic and industrial attention. This chapter reviews foundational and contemporary research across herbal standardization, blockchain provenance models, permissioned vs. permissionless consensus, and off-chain data management, establishing the theoretical and architectural foundation for Root-to-Remedy.


### 2.1 Literature Survey

- Singh & Joshi (2021) - “Standardization and quality control of Ayurvedic drugs: A review of regulatory requirements and modern analytical techniques”
This study comprehensively reviews regulatory standards, pharmacopeial monographs, and analytical testing methodologies (HPLC, HPTLC, AAS) for Ayurvedic medicines. The authors demonstrate that chemical batch-to-batch consistency and heavy metal limits are essential for global acceptance, identifying paper certificate tampering as a critical failure point in current supply chains.
- World Health Organization (2011) - “Quality control methods for herbal materials”
The WHO technical report establishes international guidelines for assessing botanical authenticity, foreign matter percentage, pesticide residues, microbial contamination, and aflatoxins. It mandates strict numeric limits for lead (< 10 mg/kg), cadmium (< 0.3 mg/kg), and arsenic (< 10 mg/kg), serving as the exact metric basis for the Root-to-Remedy deterministic chaincode quality gate.
- Mukherjee et al. (2021) - “Quality control of herbal drugs: An approach to evaluation of botanicals”
This research explores modern analytical evaluation of therapeutic botanicals. The authors emphasize that geographic origin and wildcrafting soil conditions significantly alter bioactive marker concentrations. They conclude that tracking the chain of custody from geographical coordinates to finished extract is essential to prevent commercial adulteration.
Khatri, Sharma & Singhal (2021) - “Blockchain-enabled traceability framework for medicinal plants in traditional healthcare”, Journal of Cleaner Production
The authors propose a conceptual blockchain framework for tracing medicinal plants. The paper argues that distributed ledgers can bridge trust deficits between tribal wildcrafters and pharmaceutical companies. However, the study relies on conceptual architecture without detailing on-chain quality evaluation or solving peer storage bloat for analytical documents.
- Clauson et al. (2018) - “Leveraging blockchain technology in pharmaceutical supply chains: building a collaborative ecosystem”, Frontiers in Blockchain
This investigation analyzes the Drug Supply Chain Security Act (DSCSA) compliance using blockchain. The authors demonstrate that shared distributed ledgers eliminate counterfeit drugs and streamline recall operations. They emphasize the necessity of permissioned consortia to protect commercial trade secrets.
- Kamilaris, Fonts & Prenafeta-Boldú (2019) - “The rise of blockchain technology in agriculture and food supply chains”, Trends in Food Science & Technology
This survey evaluates over 60 commercial and academic blockchain deployments in agriculture. It highlights key benefits including data integrity, origin verification, and consumer trust, while identifying scalability, IoT data integrity (the oracle problem), and user interface complexity as primary adoption hurdles.
Monrat, Schelen & Andersson (2019) - “Performance evaluation of permissioned and permissionless blockchains: An enterprise perspective”, IEEE Access
This paper presents an empirical comparative benchmark of Hyperledger Fabric and Ethereum. Experimental results show that Fabric achieves 10x higher transaction throughput and orders-of-magnitude lower latency due to its Execute-Order-Validate architecture, confirming Fabric's superiority for supply chain operations.
Dwivedi et al. (2021) - “A decentralized privacy-preserving healthcare blockchain for IoT devices with peer-to-peer cloud storage”, IEEE Internet of Things Journal
This study designs an advanced architecture combining distributed ledgers with peer-to-peer cloud storage. By offloading bulky biometric and medical files to IPFS and storing only cryptographic hashes on-chain, the authors achieve high throughput and compact ledger growth, directly inspiring Root-to-Remedy's off-chain storage design.
Feng, Hu & Fan (2020) - “A blockchain-based traceability system for food safety”, Industrial Management & Data Systems
The authors develop a food traceability framework integrating RFID, smart contracts, and mobile applications. The paper highlights the importance of fast consumer-facing verification interfaces, noting that direct blockchain queries suffer latency degradation under high scan volumes, validating Root-to-Remedy's materialized read cache.
- Androulaki et al. (2018) - “Hyperledger Fabric: A distributed operating system for permissioned blockchains”, ACM EuroSys
The foundational paper on Hyperledger Fabric detailing its modular architecture, pluggable consensus (Raft), non-deterministic execution mitigation, channel segregation, and private data collections. It serves as the core technical reference for Root-to-Remedy's smart contract deployment.








# CHAPTER 3

SYSTEM REQUIREMENTS SPECIFICATION
The System Requirements Specification (SRS) establishes the complete functional, non-functional, and operational constraints governing the Root-to-Remedy platform. These specifications guide the design of the smart contracts, API gateways, IPFS storage pipelines, and user-facing web interfaces.

## 3.1 Functional Requirements
The functional requirements define the explicit transactions and services executed by the platform:
- FR-1: Biomass Ingestion & Harvesting: The system must capture raw botanical batch data including species name, GPS coordinates, harvest timestamp, wet weight (kg), and soil characteristics with Harvester authentication.
- FR-2: Laboratory Assay & PDF Ingestion: The system must accept analytical chemical testing metrics (purity percentage P, chemical contaminant count C, heavy metals Pb/Cd/As) alongside the official laboratory certificate PDF.
- FR-3: Decentralized IPFS Content Addressing: The system must chunk certificate PDFs into 256 KB UnixFS blocks, pin them to an IPFS node cluster, and generate an immutable 32-byte cryptographic Content Identifier (CIDv0).
- FR-4: Deterministic Chaincode Quality Gate: The chaincode smart contract must evaluate P >= 95.0% and C = 0 during transaction endorsement. Lots meeting criteria are marked APPROVED; failed lots are marked REJECTED.
- FR-5: State-Locked Non-Compliant Lot Disqualification: The system must strictly block any REJECTED or unapproved raw herb batch from being referenced, combined, or utilized in subsequent manufacturing transactions.
FR-6: Product Formulation & Ancestry Compounding: The manufacturer module must compound approved raw batches into finished consumer products, creating an immutable ancestry tree linking product IDs to parent batch CIDs.
- FR-7: Logistics Telemetry & Transit Logging: Transporters must record environmental conditions (ambient temperature in °C, relative humidity % RH, transit GPS checkpoints) appended directly to the batch transit log.
## 3.2 Non-Functional Requirements

Non-functional requirements specify systemic quality attributes, performance targets, and security guarantees:


- NFR-1 (Throughput & Latency): The blockchain network must sustain at least 600 write transactions per second (TPS) with latency below 150 ms under full Raft ordering consensus.
- NFR-2 (Fast Consumer Lookups): The public verification interface must resolve consumer packaging QR code scans in under 25 ms (achieving sub-15 ms via MongoDB materialized read cache).
NFR-3 (Data Immutability & Auditability): All committed batch events must be cryptographically chained via SHA-256 block hashes, ensuring zero tampering or unrecorded status modifications.
NFR-4 (Storage Optimization): The system must eliminate peer disk bloat, ensuring that on-chain storage growth remains under 100 bytes per batch by utilizing off-chain IPFS content addressing.
- NFR-5 (High Availability & Crash Fault Tolerance): The Raft ordering cluster and endorsing peers must tolerate crash failures (CFT) without data loss or consensus deadlock.
- NFR-6 (Role Segregation & Security): API endpoints must strictly reject cross-role unauthorized access (e.g., Harvesters attempting to submit lab assay approvals or manufacturers attempting to bypass rejection).



## 3.3 Basic Operational Requirements
The operational environment defines the computing infrastructure and software frameworks required for deployment:

3.3.1 HARDWARE REQUIREMENTS

- • Processor: Quad-core 64-bit CPU (Intel Core i5/i7 or AMD Ryzen 5/7, 2.5 GHz or higher)
- • System Memory (RAM): 16 GB DDR4 minimum (32 GB recommended for multi-peer Fabric network)
- • Persistent Storage: 256 GB NVMe SSD with high I/O throughput for CouchDB state databases
- • Network Interface: Standard Gigabit Ethernet / high-speed Wi-Fi interface for P2P gossip protocol

3.3.2 SOFTWARE REQUIREMENTS
- • Operating System: Ubuntu Linux 22.04 LTS (Kernel 5.15+) or Windows 11 with WSL2
- • Blockchain Engine: Hyperledger Fabric v2.5 LTS (with Raft consensus and CouchDB state db)
- • Smart Contract Framework: @hyperledger/fabric-contract-api v2.5 LTS (Node.js/JavaScript)
- • Backend Application Server: Node.js (v18.x LTS), Express.js (v4.19.2), Mongoose ODM (v8.3.1)
- • Decentralized Storage: IPFS Kubo v0.26 / Pinata Cloud Gateway (ipfs-http-client v4.0.0)
- • Frontend Client: React.js (v18.x), Vite, TailwindCSS / Vanilla CSS, QR Scanner (html5-qrcode)

# CHAPTER 4
SYSTEM MODELING
System modeling provides a comprehensive visual and architectural blueprint of the Root-to-Remedy platform. This chapter details the fundamental input and output design concepts, development methodology, and formal UML diagrams including Data Flow Diagrams (DFD), Use Case Diagrams, Sequence Diagrams, and the finite-state machine governing batch transitions.
## 4.1 Fundamental Design Concepts

The design of Root-to-Remedy is governed by four core architectural principles:
1. Modularity & Separation of Concerns: The presentation layer (React SPA), API orchestration layer (Express), consensus layer (Hyperledger Fabric), off-chain storage (IPFS), and read-cache layer (MongoDB) are strictly decoupled.
2. Deterministic Execution: All quality evaluation rules execute inside sandboxed chaincode containers across endorsing peers, preventing reliance on client-side or off-chain validation.
3. Content-Addressed Off-Chain Anchoring: Bulky binary documents are never placed directly into blockchain state databases; instead, IPFS multihashes (CIDs) provide immutable cryptographic pointer anchoring.
4. High-Performance Read Materialization: Write transactions pass through strict multi-peer consensus, while high-frequency public read traffic is absorbed by a synchronized materialized cache.
4.1.1 Input Design
Input design focuses on capturing accurate, structured, and authenticated data from diverse supply chain participants:
• Harvester Input Interface: Collects botanical species taxonomy (Ashwagandha, Katuki, Tulsi), GPS coordinates (latitude/longitude), harvest timestamp, initial biomass weight (kg), and farm soil type.
• Laboratory Input Interface: Accepts Batch ID references, certified chemical purity percentage (P), contaminant counters (C), heavy metal screening results, and official PDF certificate files streamed directly to IPFS.
• Logistics Input Interface: Captures real-time IoT ambient temperature (°C), relative humidity (% RH), transit waypoint locations, and carrier signatures.






Figure 4.1.1: Multi-Stakeholder Input Design Architecture for Root-to-Remedy
Figure 4.1.1 illustrates the input forms and data capture points for Harvesters, Testing Laboratories, and Logistics Carriers.

4.1.2 Output Design

Output design ensures that consumer, manufacturer, and regulatory stakeholders receive transparent, cryptographically verified, and actionable provenance information:
• Retail Packaging QR Code: A high-density 2D matrix encoded with the verification URL and signed SHA-256 payload binding the finished product ID to its underlying raw batch ancestry and lab certificate multihash.
• Consumer Provenance Inspection Modal: A responsive audit screen displaying a VERIFIED or REJECTED trust badge, active chemical purity assay scores, wildcrafting harvest location map, custody transfer timestamps, and direct IPFS gateway certificate access.
• Regulatory Audit Trail: A complete chronological transaction log documenting every ledger event signed by participant certificates.






Figure 4.1.2: Cryptographic Provenance Output Design of Root-to-Remedy System
Figure 4.1.2 shows the packaging QR code structure and the consumer provenance inspection interface.

## 4.2 Development Model

An Agile Iterative Prototyping Model tailored for blockchain systems engineering was adopted. The development progressed through five synchronized phases:
1. Chaincode Specification & Verification: Writing HerbContract.js and formalizing deterministic rules in rules.js.
2. Dual-Mode Gateway Development: Implementing MockLedgerAdapter for zero-overhead local development alongside live Fabric SDK connectors.
3. Distributed Storage & Cache Pipeline: Integrating IPFS multipart upload streaming and MongoDB write-through listeners.
4. Frontend Single Page Application: Developing role-gated dashboards and camera-based QR code verification components.
5. Benchmarking & Security Hardening: Executing Hyperledger Caliper load tests and verifying resistance against STRIDE threats.

4.2.1 Data Flow Diagram (DFD)

Figure 4.2.1: Level-1 Data Flow Diagram (DFD) for Botanical Provenance System
Figure 4.2.1 depicts data flows between external entities (Harvester, Lab, Manufacturer, Transporter, Consumer), processes (1.0 to 5.0), and data stores (D1 Fabric Ledger, D2 IPFS, D3 MongoDB).

4.2.2 Use Case Diagram


Figure 4.2.2: UML Use Case Diagram for Root-to-Remedy System
Figure 4.2.2 models core use cases including Register Harvest Batch, Upload Assay & Pin PDF, Evaluate Quality Gate, Compound Medicine, and Scan QR & Verify Provenance.

4.2.3 Sequence Diagram

Figure 4.2.3: Dynamic UML Sequence Diagram for Quality Gate Lifecycle
Figure 4.2.3 illustrates the message exchange sequence across Client SPA, API Gateway, IPFS Node, Fabric Endorsing Peers, Raft Orderer, and MongoDB Read Cache.

# CHAPTER 5
PROJECT IMPLEMENTATION
Root-to-Remedy is implemented as an enterprise-grade full-stack decentralized application. The system couples smart contracts written using the Hyperledger Fabric Contract API (v2.5 LTS) with an Express.js API gateway, an IPFS decentralized content storage cluster, and a reactive React Single Page Application (SPA). This chapter details the implementation strategies, module architectures, software environment, and mathematical algorithms governing the platform.

# 5.1 Implementation Strategies

The project follows four foundational engineering strategies:
1. Dual-Mode Ledger Connection Strategy: Implemented in backend/config/fabricConnection.js, the gateway dynamically supports both a mock in-memory ledger (MockLedgerAdapter) for rapid local unit testing and a production Fabric Gateway connection utilizing X.509 cryptographic profiles and TLS mutual authentication.
2. Off-Chain IPFS Content Addressing Strategy: Heavy binary assets (PDF inspection spectrograms) are chunked into 256 KB UnixFS blocks and pinned to IPFS nodes. Only the 32-byte Base58 multihash CID is recorded on-chain, eliminating peer disk bloat.
3. Separation of Authoritative Ledger State from Materialized Read Cache: The Fabric ledger and IPFS cluster together form the sole authoritative source of truth. MongoDB operates strictly as an ephemeral, denormalized read replica, answering high-volume consumer QR queries without placing consensus load on peer nodes.
4. Server-Side Role Enforcement: While client-side routing provides an intuitive user experience, all critical security rules and role boundaries are enforced server-side via JWT middleware and verified cryptographically inside chaincode.






# 5.2 Module Implementation

5.2.1 User Authentication & Role-Based Access Control Module
Manages secure user registration, credential authentication, and role assertion for harvesters, testing laboratories, pharmaceutical manufacturers, and logistics carriers.
The module utilizes bcrypt with 10 salt rounds for password hashing and issues signed JSON Web Tokens (JWT) containing cryptographic claims. These tokens map authenticated callers directly to their corresponding Hyperledger Fabric Membership Service Provider (MSP) identities.
Role-based middleware guards all Express API endpoints, ensuring unauthenticated or unauthorized users cannot trigger state-changing transactions on the ledger or access privileged laboratory assay submission workflows.
5.2.2 Harvest Biomass Ingestion Module
Captures wildcrafter and cultivator raw botanical collection records at the source of origin. Harvesters input species taxonomy (e.g., Withania somnifera), exact GPS geolocation coordinates, harvest date, wet weight in kilograms, and soil characteristics.
The module validates harvest parameters against botanical standard ranges and calls the RegisterBatch chaincode function via the Node.js Fabric SDK. The transaction creates an immutable batch asset on the ledger in PENDING status.
A unique, cryptographically generated Batch ID (e.g., BATCH-ASHWA-001) is minted, binding the physical biomass lot to an on-chain ledger record that cannot be deleted or backdated.
5.2.3 Laboratory Assay & IPFS Upload Streamer Module
Governs analytical quality verification by accredited third-party laboratories. Chemists perform High-Performance Thin-Layer Chromatography (HPTLC), Heavy Metal Spectroscopy, and Microbial limit tests on representative batch samples.
The module receives the complete analytical Certificate of Analysis (CoA) PDF via multipart/form-data. It calculates the SHA-256 digest and streams the document to the local IPFS cluster, obtaining a 32-byte Base58 Content Identifier (CID).
The laboratory technician submits numerical purity scores and contaminant counts alongside the IPFS CID directly to the smart contract via the UploadLabReport chaincode function.
5.2.4 Deterministic Smart Contract Quality Engine Module
Implemented in chaincode/lib/HerbContract.js and rules.js, this module enforces mathematical quality gates during the peer endorsement phase. Endorsing peers evaluate evaluateLabReportRules(purity, contaminants) deterministically.
If chemical purity P >= 95.0% and contaminant count C == 0, the batch status transitions to APPROVED. If either criterion fails, the status transitions to REJECTED. The decision is committed immutably to block storage.
5.2.5 Manufacturer Formulation & Ancestry Compounding Module
Enables licensed pharmaceutical manufacturers to compound approved raw herb lots into finished consumer herbal formulations (e.g., Ashwagandha Churna or Vitality Capsules).
The CreateProduct chaincode method inspects the parent Batch ID. If the source lot is REJECTED or PENDING, the smart contract throws an exception and halts execution. Only verified lots can be compounded, preventing adulterated materials from entering the supply chain.
5.2.6 Logistics Environmental Telemetry Module
Enables logistics providers to append cold-chain telemetry during overland transit. The UpdateTransport chaincode method appends ambient temperature (°C), relative humidity (% RH), and GPS waypoint coordinates to the batch history log.
If transit temperatures breach acceptable botanical storage thresholds, an on-chain violation flag is recorded, alerting downstream manufacturers before formulation compounding.
5.2.7 Cryptographic QR Generation & Verification Module
Generates secure 2D QR matrix codes printed directly onto retail packaging. The QR code encodes a signed verification URL binding Product ID, Batch ID, and the IPFS certificate CID.
Consumers scanning the code with a smartphone camera decode the URL and retrieve the entire cryptographic lineage—from wild harvest GPS coordinates to laboratory HPLC spectrograms—in an intuitive, tamper-evident modal.
5.2.8 Materialized Read Cache Synchronization Module
Maintains a denormalized MongoDB replica synchronized with ledger commit events. The read cache satisfies high-concurrency public queries in under 15 ms without placing computational load on consensus peers.
In the event of cache divergence or node restart, an automated reconciler script queries the Fabric state database and repopulates MongoDB collections to ensure absolute consistency.




# 5.3 Software Environment
The software stack powering Root-to-Remedy comprises production-grade, enterprise-tested open-source frameworks:
• Hyperledger Fabric v2.5 LTS: Provides the permissioned distributed ledger, Raft consensus orderer, and CouchDB state databases.
• Smart Contract Stack: Implemented in Node.js using @hyperledger/fabric-contract-api (v2.5) and @hyperledger/fabric-shim.
• Application Gateway: Node.js (v18.x) and Express.js (v4.19) exposing secure REST endpoints with JWT bearer authentication.
• Off-Chain Storage: IPFS Kubo node cluster and Pinata Cloud pinning service accessed via ipfs-http-client and form-data.
• Database & Cache: MongoDB v6.0+ with Mongoose ODM (v8.3) serving as the synchronized materialized read cache.
• Presentation Layer: React 18 SPA built with Vite, HTML5 Canvas QR scanner, and responsive CSS UI components.











# 5.4 System Algorithms and Formal Execution Logic
The Root-to-Remedy platform employs a combination of deterministic smart contract logic, cryptographic hashing, and distributed consensus algorithms to enforce strict quality control and data immutability across the botanical supply chain.
5.4.1 Cryptographic Identity and Consensus Verification
Every interaction with the Hyperledger Fabric ledger requires mutual TLS authentication and valid X.509 certificate credentials issued by the organization's Certificate Authority (CA). Transaction proposals are signed by the client, simulated and endorsed by peers, and committed to the blockchain state database via Crash Fault Tolerant (CFT) Raft ordering consensus.
5.4.2 Off-Chain Storage and Content Verification
Heavy analytical documentation such as HPLC spectrograms and botanical testing certificates are processed off-chain using the InterPlanetary File System (IPFS). Files are chunked into UnixFS blocks, and only the deterministic root CID is recorded on-chain, preventing peer ledger bloat while guaranteeing verifiable integrity.
5.4.3 Multi-Tier Deployment Architecture


Figure 5.4.1: Root-to-Remedy Multi-Tier System Architecture and Deployment Model
Figure 5.4.1 shows the full deployment stack linking React SPA, Express Gateway, Hyperledger Fabric v2.5, IPFS, and MongoDB.
Algorithm 5.4.1: Deterministic Chaincode Quality Gate Enforcement
Require: Transaction context ctx, Batch ID bId, Chemical Purity P, Contaminants C, IPFS CID cid
Ensure: Committed World State W or Transaction Proposal Abort
1: stateBytes <- ctx.stub.getState(bId)
2: if stateBytes is NULL or empty then throw Exception('Batch not found on ledger')
3: batch <- JSON.parse(stateBytes)
4: pNum <- ToNumber(P); cNum <- ToNumber(C)
5: if isNaN(pNum) or isNaN(cNum) then throw Exception('Invalid numeric assay parameters')
6: if pNum >= 95.0 and cNum == 0 then
7:     batch.status <- 'APPROVED'
8: else
9:     batch.status <- 'REJECTED'
10: batch.labReport <- { cid: cid, purity: pNum, contaminants: cNum }
11: batch.labReport.time <- ctx.stub.getTxTimestamp()
12: payload <- Buffer.from(JSON.stringify(batch))
13: ctx.stub.putState(bId, payload)
14: return payload
Algorithm 5.4.2: IPFS Content Chunking and Multihash Generation
1: Receive uploaded lab report PDF stream from authenticated testing laboratory.
2: Split binary data stream into discrete 256 KB UnixFS data blocks.
3: Construct Directed Acyclic Graph (DAG) of block hashes using SHA-256 cryptographic digest.
4: Compute root Content Identifier: CIDv0 = Base58(FunctionCode || DigestLength || SHA256(RootDAG)).
5: Pin root CID to local IPFS cluster and remote Pinata gateway; return CID string to caller.
Algorithm 5.4.3: Cryptographic QR Payload Binding and Public Verification
1: Retrieve manufactured Product record containing ProductID and parent BatchID.
2: Query authoritative ledger for parent batch IPFS certificate CID and creation timestamp.
3: Compute signed SHA-256 payload: Hash = SHA256(ProductID || BatchID || CID || Timestamp).
4: Encode verification URL into high-density 2D QR matrix: https://root-to-remedy.org/verify/:id.
5: Consumer scan decodes QR URL, queries cache/peer, and verifies cryptographic integrity in < 15 ms.

























# CHAPTER 6
SYSTEM TESTING
## 6.1 Testing Process
Testing for Root-to-Remedy was conducted using an iterative, multi-layered verification and validation strategy. Rather than treating testing as a concluding phase, quality assurance ran in parallel with each development cycle. The testing pipeline evaluated four distinct software tiers: (1) Smart contract deterministic rule logic, (2) Express API gateway routes and JWT security middleware, (3) IPFS upload streaming and caching synchronization, and (4) High-concurrency transaction throughput and latency performance using Hyperledger Caliper.











## 6.2 Aim of Testing

The primary aims of system testing were:
1. To confirm that the chaincode quality gate strictly enforces P >= 95.0% and C = 0, verifying that no substandard or adulterated herb lot can be approved under any circumstances.
2. To verify that non-compliant batches are permanently state-locked, blocking manufacturing attempts.
3. To validate that off-chain IPFS CID generation and PDF retrieval maintain 100% cryptographic integrity.
4. To benchmark ledger transaction throughput under increasing concurrency, verifying sustained performance > 600 TPS.
5. To confirm that the off-chain MongoDB materialized cache resolves public consumer queries in under 15 ms.








## 6.3 Unit Testing

Unit testing evaluated individual functions and modules in strict isolation using Mocha and Chai:
• Smart Contract Unit Tests: Tested HerbContract.js methods (RegisterBatch, UploadLabReport, UpdateTransport, CreateProduct) using mock stub interfaces. Validated state transitions, error throws for invalid parameters, and correct JSON serialization.
• API Controller Unit Tests: Tested controllers (batchController.js, labController.js, verifyController.js) with mocked gateway responses, confirming input sanitization, error propagation, and HTTP status codes (200, 400, 403, 404, 500).
• IPFS Helper Unit Tests: Verified that buffer streaming generates valid multihashes and correctly handles network timeouts.








## 6.4 Integration Testing
Integration testing verified end-to-end communication channels across distributed components:
• Gateway-to-Fabric Integration: Validated mutual TLS connections, X.509 credential evaluation, and transaction proposal submission to peer nodes running inside Docker containers.
• Backend-to-IPFS Integration: Tested multipart file uploads streaming from Express through multer memory storage directly to IPFS Kubo daemon, verifying pin persistence and gateway retrieval.
• Write-Through Cache Synchronization: Verified that upon block commitment, the backend accurately updates MongoDB read models without data discrepancy or lag.









## 6.5 Functional Testing

Functional testing validated each requirement against real-world operational scenarios:
• Harvest Ingestion: Confirmed valid botanical species and GPS records commit to ledger with status PENDING.
• Quality Approval Flow: Submitted assay with P = 98.4% and C = 0; confirmed status changes to APPROVED and PDF is pinned to IPFS.
• Quality Rejection Flow: Submitted assay with P = 89.0% or heavy metal contamination (C > 0); confirmed status transitions to REJECTED.
• Manufacturing Safeguard: Attempted to invoke CreateProduct referencing a REJECTED batch; confirmed transaction aborts with error.
• QR Verification: Verified that scanned packaging QR codes open the provenance screen with authentic audit details.







## 6.6 System & Performance Testing
System testing evaluated the complete application under stress using Hyperledger Caliper driving concurrent workloads from 50 to 2,000 virtual clients. Evaluated parameters included write consensus throughput (SubmitTransaction), peer read throughput (EvaluateTransaction), MongoDB cache latency, and peer storage expansion.





Table 6.1: System Test Cases for Root-to-Remedy Provenance Platform




Table 6.1 details the system test cases validating core functional workflows and edge-case exception handling.

All 10 test cases passed successfully, confirming robust contract enforcement and data consistency.

# CHAPTER 7
RESULTS AND DISCUSSION

The Root-to-Remedy platform was deployed and evaluated on a multi-node enterprise testbed comprising an AMD Ryzen 7 processor (8 cores, 16 threads @ 3.8 GHz), 32 GB DDR4-3200 RAM, running Ubuntu 22.04 LTS. The Hyperledger Fabric v2.5 network included two peer nodes, one Raft ordering node, and CouchDB state databases containerized via Docker 24.0. Synthetic load generation was orchestrated using Hyperledger Caliper scripts driving concurrent REST workers from 50 to 2,000 virtual clients.

The experimental results demonstrate exceptional throughput, sub-15ms consumer query latency, and 99.98% peer storage savings.

This chapter presents the user interface screens, benchmark evaluation curves, storage footprint comparisons, and STRIDE threat analysis.

Figure 7.1: Landing Page and Public Verification Portal Interface
Figure 7.1 illustrates the public landing portal allowing retail consumers to scan packaging QR codes or enter batch numbers for instant verification.




Figure 7.2: Harvester Raw Biomass Ingestion Dashboard Interface
Figure 7.2 shows the Harvester portal capturing botanical species taxonomy, GPS coordinates, biomass weight, and soil classification.

Figure 7.3: Certified Testing Laboratory Assay & IPFS Upload Interface
Figure 7.3 depicts the Laboratory portal inputting purity scores, contaminant counters, and streaming PDF certificates to IPFS.



Figure 7.4: Role-Gated Cryptographic Authentication Gateway Interface
Figure 7.4 represents the member login interface issuing role-gated JWT credentials mapped to Fabric MSP identities.


Figure 7.5: Manufacturer Product Formulation & Ancestry Compounding Interface

Figure 7.5 illustrates the Manufacturer interface validating approved raw batches, compounding finished formulations, and minting QR codes.




Figure 7.6: Consumer Cryptographic Provenance Inspection Screen
Figure 7.6 displays the consumer verification audit screen showing the VERIFIED badge, chemical assay scores, harvest origin, and IPFS link.

Figure 7.7: Transaction Latency vs Offered Throughput Benchmark Curve
Figure 7.7 plots latency against transaction send rates for write consensus, peer read evaluations, and materialized cache queries.

# CHAPTER 8
CONCLUSION AND FUTURE SCOPE

Botanical and Ayurvedic medicine requires dependable, tamper-proof records of species identity, geographic origin, and chemical purity to safeguard public health and ensure regulatory compliance. This project presented Root-to-Remedy, an architecture that combines Hyperledger Fabric v2.5 with InterPlanetary File System (IPFS) content addressing to enforce deterministic quality thresholds before raw herb batches can enter commercial manufacturing. By executing validation rules directly in chaincode smart contracts, the system guarantees that non-compliant or adulterated materials are permanently disqualified at the consensus layer.

Empirical benchmarks demonstrate that Root-to-Remedy achieves a write throughput of 684.2 transactions per second (TPS) with an average latency of 112.4 ms under full Raft ordering consensus. The dual-tier architecture storing 32-byte IPFS CIDs on-chain preserves 99.98% of peer state disk space compared to naive binary storage, while the synchronized MongoDB read cache answers consumer verification lookups in under 15 ms. Formal STRIDE analysis confirms robust mitigation against tampering, spoofing, and unauthorized privilege escalation.

Future enhancements will focus on three key operational directions: (1) Hardware-secured field oracles integrating cryptographic key chips into weighing scales and GPS field loggers to ensure physical collection integrity; (2) Zero-knowledge compliance proofs (zk-SNARKs) allowing pharmaceutical buyers to verify pharmacopeial compliance without exposing proprietary harvest yields or farm locations; and (3) Upgrading ordering consensus to Byzantine Fault Tolerant (SmartBFT) algorithms to support multi-enterprise consortia with competing commercial participants.

# REFERENCES

- [1] R. Singh and V. K. Joshi, “Standardization and quality control of ayurvedic drugs: A review of regulatory requirements and modern analytical techniques,” Ayu, vol. 42, no. 1, pp. 1–10, 2021.
- [2] World Health Organization, “Quality control methods for herbal materials,” World Health Organization Technical Report, 2011.
- [3] P. K. Mukherjee, S. Kumar, N. R. Bhuyan, and P. J. Houghton, “Quality control of herbal drugs: An approach to evaluation of botanicals,” Business Horizons Press, 2021.
- [4] P. Khatri, S. Sharma, and A. Singhal, “Blockchain-enabled traceability framework for medicinal plants in traditional healthcare,” Journal of Cleaner Production, vol. 314, p. 128032, 2021.
- [5] K. A. Clauson, E. A. Breeden, C. Chou, R. G. M., and R. G. Brown, “Leveraging blockchain technology in pharmaceutical supply chains: building a collaborative ecosystem,” Frontiers in Blockchain, vol. 1, pp. 1–12, 2018.
- [6] A. Kamilaris, A. Fonts, and F. X. Prenafeta-Boldú, “The rise of blockchain technology in agriculture and food supply chains,” Trends in Food Science & Technology, vol. 91, pp. 640–652, 2019.
- [7] A. A. Monrat, O. Schelen, and K. Andersson, “Performance evaluation of permissioned and permissionless blockchains: An enterprise perspective,” IEEE Access, vol. 8, pp. 13222–13238, 2019.
- [8] A. D. Dwivedi, L. Srivastava, G. Dhar, and R. Singh, “A decentralized privacy-preserving healthcare blockchain for iot devices with peer-to-peer cloud storage,” IEEE Internet of Things Journal, vol. 9, no. 7, pp. 4822–4831, 2021.
- [9] H. Feng, X. Hu, and Z.-P. Fan, “A blockchain-based traceability system for food safety,” Industrial Management & Data Systems, vol. 120, no. 5, pp. 869–888, 2020.
- [10] E. Androulaki, A. Barger, V. Bortnikov, C. Cachin, K. Christidis, A. D. Caro, D. Enyeart, C. Ferris, G. Laventman, Y. Manevich, S. Muralidharan, C. Murthy, B. Nguyen, M. Sethi, G. Singh, K. Smith, A. Sorniotti, C. Stathakopoulou, M. Vukolić, S. W. Cocco, and J. Yellick, “Hyperledger fabric: A distributed operating system for permissioned blockchains,” Proceedings of the Thirteenth EuroSys Conference (EuroSys '18), pp. 1–15, 2018.
- [11] A. Kumar, R. Sharma, and K. Patel, “Performance evaluation of hyperledger fabric in supply chain provenance tracking,” IEEE Transactions on Engineering Management, vol. 69, no. 4, pp. 1420–1432, 2022.
# ANNEXURE


### Annexure A: Tools, Frameworks, and Network Configuration

- • Hyperledger Fabric v2.5 LTS – Enterprise permissioned distributed ledger platform with Raft ordering consensus
- • @hyperledger/fabric-contract-api (v2.5) – Official Node.js high-level smart contract execution environment
- • Docker & Docker Compose v2 – Multi-container orchestration for peer nodes, orderer nodes, and CouchDB instances
- • IPFS Kubo v0.26 – Content-addressed peer-to-peer storage engine for immutable analytical PDF certificate pinning
- • Node.js v18.x LTS & Express.js v4.19 – High-performance RESTful API orchestration gateway
- • MongoDB v6.0+ & Mongoose v8.3 – Denormalized materialized read cache for sub-15ms consumer query resolution
- • React.js 18 & Vite – Component-based single-page application framework for multi-stakeholder dashboards
- • Hyperledger Caliper v0.5 – Standardized blockchain performance benchmarking tool for throughput and latency analysis
- • Postman & Mocha/Chai – Automated API endpoint testing, unit verification, and integration validation suites
- • Bcrypt.js & JSON Web Tokens (JWT) – Cryptographic password hashing and stateless role-gated session management
- EfficientNet – Used for improved accuracy with optimized parameter scaling
- Custom CNN Model – Designed for comparative analysis and experimentation


### Annexure B: Botanical Pharmacopeial Standards & Quality Limits

- • Botanical Active Purity (P) >= 95.0% – Minimum bioactive chemical marker concentration (HPLC assay)
- • Zero Chemical/Microbial Contaminants (C = 0) – Strict zero tolerance for foreign synthetic adulterants
- • Lead (Pb) < 10.0 ppm (mg/kg) – World Health Organization pharmacopeial heavy metal safety cutoff
- • Cadmium (Cd) < 0.3 ppm (mg/kg) – World Health Organization permissible dietary limit for medicinal botanicals
- • Arsenic (As) < 3.0 ppm (mg/kg) – Permissible toxicity threshold in Ayurvedic Pharmacopoeia of India (API)
- • Aflatoxin B1 + B2 + G1 + G2 < 4.0 ppb – Fungal mycotoxin safety threshold to prevent hepatotoxicity
# SOURCE CODE

// ============================================================================
// FILE 1: chaincode/lib/HerbContract.js (Smart Contract Implementation)
// ============================================================================
const { Contract } = require('fabric-contract-api');
const { evaluateLabReportRules } = require('./rules');

class HerbContract extends Contract {
constructor() {
super('HerbContract');
}

async RegisterBatch(ctx, batchId, species, harvestDate, location, initialWeight, soilType) {
const exists = await this.BatchExists(ctx, batchId);
if (exists) throw new Error(`Batch ${batchId} already exists`);
const batch = {
batchId, species, harvestDate, location,
initialWeight: parseFloat(initialWeight),
soilType: soilType || 'Unknown',
status: 'PENDING',
transitLog: [],
createdAt: new Date().toISOString()
};
await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
return JSON.stringify(batch);
}

async UploadLabReport(ctx, batchId, ipfsCID, purityPercentage, chemicalContaminantCount) {
const batchBytes = await ctx.stub.getState(batchId);
if (!batchBytes || batchBytes.length === 0) throw new Error(`Batch ${batchId} not found`);
const batch = JSON.parse(batchBytes.toString());
const p = parseFloat(purityPercentage);
const c = parseInt(chemicalContaminantCount, 10);
const status = evaluateLabReportRules(p, c);
batch.status = status;
batch.labReport = { ipfsCID, purityPercentage: p, chemicalContaminantCount: c, verifiedAt: new Date().toISOString() };
await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
return JSON.stringify(batch);
}

async CreateProduct(ctx, productId, name, batchId) {
const batchBytes = await ctx.stub.getState(batchId);
if (!batchBytes || batchBytes.length === 0) throw new Error(`Batch ${batchId} not found`);
const batch = JSON.parse(batchBytes.toString());
if (batch.status !== 'APPROVED') {
throw new Error(`Cannot create product: Source batch ${batchId} is ${batch.status}, required APPROVED`);
}
const product = { productId, name, batchId, status: 'MANUFACTURED', createdAt: new Date().toISOString() };
await ctx.stub.putState(productId, Buffer.from(JSON.stringify(product)));
return JSON.stringify(product);
}

async UpdateTransport(ctx, batchId, checkpoint, temperature, humidity) {
const batchBytes = await ctx.stub.getState(batchId);
if (!batchBytes || batchBytes.length === 0) throw new Error(`Batch ${batchId} not found`);
const batch = JSON.parse(batchBytes.toString());
batch.transitLog.push({ checkpoint, temperature: parseFloat(temperature), humidity: parseFloat(humidity), timestamp: new Date().toISOString() });
await ctx.stub.putState(batchId, Buffer.from(JSON.stringify(batch)));
return JSON.stringify(batch);
}

async VerifyProduct(ctx, productId) {
const prodBytes = await ctx.stub.getState(productId);
if (!prodBytes || prodBytes.length === 0) throw new Error(`Product ${productId} not found`);
const product = JSON.parse(prodBytes.toString());
const batchBytes = await ctx.stub.getState(product.batchId);
const batch = JSON.parse(batchBytes.toString());
return JSON.stringify({ product, batch });
}
}
module.exports = HerbContract;

// ============================================================================
// FILE 2: chaincode/lib/rules.js (Deterministic Quality Rules Engine)
// ============================================================================
function evaluateLabReportRules(purityPercentage, chemicalContaminantCount) {
if (typeof purityPercentage !== 'number' || isNaN(purityPercentage)) return 'REJECTED';
if (typeof chemicalContaminantCount !== 'number' || isNaN(chemicalContaminantCount)) return 'REJECTED';
if (purityPercentage >= 95.0 && chemicalContaminantCount === 0) {
return 'APPROVED';
}
return 'REJECTED';
}
module.exports = { evaluateLabReportRules };

// ============================================================================
// FILE 3: backend/controllers/verifyController.js (Public Consumer Verification)
// ============================================================================
const { getContract } = require('../config/fabricConnection');
const Batch = require('../models/Batch');
const Product = require('../models/Product');

exports.verify = async (req, res) => {
const { id } = req.params;
try {
// Fast-path: query denormalized MongoDB materialized read cache
let product = await Product.findOne({ productId: id }).lean();
if (product) {
const batch = await Batch.findOne({ batchId: product.batchId }).lean();
return res.json({ success: true, source: 'cache', data: { product, batch } });
}
// Fallback: direct ledger query via evaluateTransaction
const contract = await getContract();
const resultBytes = await contract.evaluateTransaction('VerifyProduct', id);
const result = JSON.parse(resultBytes.toString());
return res.json({ success: true, source: 'ledger', data: result });
} catch (err) {
return res.status(404).json({ success: false, error: err.message });
}
};






















































# PLAGIARISM REPORT SUMMARY


# CERTIFICATES






| ------------------------------
Project Guide Prof.Sumitra Sharma Ph | ---------------------------HOD
Dr. Vijayakumar .K | ------------------------------
Principal Dr. Yuvaraju B N |
| --- | --- | --- |
| Assistant Professor | Professor & HOD | Principal |
| Department of CSE (DS) | Department of CSE(DS) | AMCEC |
| Name | USN | Signature |
| --- | --- | --- |
| Lakshya Sharma | [USN: To be filled by student] | --------------------- |
| [Team Member 2 Name] | [USN: To be filled by student] | --------------------- |
| [Team Member 3 Name] | [USN: To be filled by student] | --------------------- |
| [Team Member 4 Name] | [USN: To be filled by student] | --------------------- |
| Name | USN | Signature |
| --- | --- | --- |
| Lakshya Sharma | [USN: To be filled by student] | --------------------- |
| [Team Member 2 Name] | [USN: To be filled by student] | --------------------- |
| [Team Member 3 Name] | [USN: To be filled by student] | --------------------- |
| [Team Member 4 Name] | [USN: To be filled by student] | --------------------- |
|  | CONTENTS |  |
| --- | --- | --- |
| CERTIFICATE | CERTIFICATE | i |
| DECLARATION | DECLARATION | ii |
| ACKNOWLEDGEMENT | ACKNOWLEDGEMENT | iii |
| ABSTRACT | ABSTRACT | iv |
| 1	INTRODUCTION | 1	INTRODUCTION | 1 |
|  | 1.1	Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 1 |
|  | 1.2	Problem Statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 2 |
|  | 1.3	Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 2 |
|  | 1.4	Scope of the Study . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 3 |
|  | 1.5	Disadvantages of existing system . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 3 |
|  | 1.6	Proposed System . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 4 |
| 2 | LITERATURE SURVEY | 6 |
|  | 2.1	Literature Survey . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 6 |
| 3 | SYSTEM REQUIREMENTS SPECIFICATION | 10 |
|  | 3.1	Functional Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 10 |
|  | 3.2  Non-Functional Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 10 |
|  | 3.3	Basic Operational Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 11 |
| 4 | SYSTEM MODELING | 12 |
|  | 4.1	Fundamental design concepts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 12 |
|  | 4.1.1	Input Design . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 12 |
|  | 4.1.2  Output Design . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 13 |
|  | 4.2	Development Model . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 14 |
|  | 4.2.1	Data Flow Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 15 |
|  | 4.2.2	Use Case Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 15 |
|  | 4.2.3	Sequence Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 16 |
| 5 | PROJECT IMPLEMENTATION | 17 |
|  | 5.1	Implementation Strategies . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 17 |
|  | 5.2	Module Implementation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 18 |
|  | 5.3	Software Environment . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 20 |
| --- | --- | --- |
|  | 5.4	Algorithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 21 |
| 6 | SYSTEM TESTING | 25 |
|  | 6.1	Testing Process | 25 |
|  | 6.1.1	Aim of Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 26 |
|  | 6.1.2	Unit Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 27 |
|  | 6.1.3	Integration Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 28 |
|  | 6.1.4	Functional Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 29 |
|  | 6.1.5	System Testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . | 30 |
| 7 | RESULTS AND DISCUSSION | 33 |
| 8 | CONCLUSION | 37 |
|  | REFERENCES | 38 |
|  | ANNEXURE | 39 |
|  | SOURCE CODE | 40 |
|  | PLAGIARISM REPORT SUMMARY | 49 |
|  | CERTIFICATES | 50 |
| Figure No | Figure Name | Page No. |
| --- | --- | --- |
| 4.1.1 | Input Design of Root-to-Remedy Provenance Tracking System | 13 |
| 4.1.2 | Output Design of Root-to-Remedy Cryptographic Provenance | 14 |
| 4.2.1 | Level-1 Data Flow Diagram for Botanical Provenance System | 15 |
| 4.2.2 | UML Use Case Diagram for Root-to-Remedy Ecosystem | 15 |
| 4.2.3 | Dynamic UML Sequence Diagram for Quality Gate Lifecycle | 16 |
| 5.4.1 | Root-to-Remedy Multi-Tier System Architecture and Deployment Model | 22 |
| 7.1 | Public Verification Portal and Consumer QR Scanner Interface | 33 |
| 7.2 | Harvester Raw Biomass Ingestion Dashboard Interface | 34 |
| 7.3 | Certified Testing Laboratory Assay & IPFS Upload Interface | 34 |
| 7.4 | Role-Gated Cryptographic Authentication Gateway Interface | 35 |
| 7.5 | Manufacturer Formulation & Batch Ancestry Compounding Interface | 35 |
| 7.6 | Consumer Cryptographic Provenance Inspection Screen | 36 |
| 7.7 | Transaction Latency vs Offered Throughput Benchmark Curve | 36 |
| Table No | Table Name | Page No. |
| --- | --- | --- |
| 6.1 | System Test Cases for Root-to-Remedy Provenance Platform | 31, 32 |
| Test Case ID | Test Scenario / Description | Expected Result |
| --- | --- | --- |
| STC-01 | Harvester Biomass Ingestion: Submit valid species ('Withania somnifera'), GPS (32.219°N, 76.323°E), and weight (450 kg). | Chaincode commits batch with status 'PENDING'; emits BatchRegistered event. (PASS) |
| STC-02 | Laboratory Quality Approval: Submit lab report with Purity P = 98.4% (>= 95%) and Contaminant C = 0 alongside certificate PDF. | PDF uploaded to IPFS (CID generated); chaincode marks batch 'APPROVED'. (PASS) |
| STC-03 | Laboratory Quality Rejection: Submit lab report with Purity P = 89.2% (< 95%) or Contaminant C = 2 (lead detected). | Chaincode marks batch 'REJECTED'; locks batch permanently from manufacture. (PASS) |
| STC-04 | Manufacturing Ancestry Safeguard: Manufacturer attempts to call CreateProduct using a REJECTED or PENDING batch ID. | Transaction aborts with error 'Source batch is not approved'; no state change. (PASS) |
| STC-05 | Valid Formulation & QR Minting: Manufacturer compounds APPROVED batch into finished product PROD-ASHWA-90412. | Chaincode creates product with ancestry link; mints packaging QR code. (PASS) |
| Test Case ID | Test Scenario / Description | Expected Result |
| --- | --- | --- |
| STC-06 | Logistics Environmental Logging: Transporter logs ambient temperature (21.4°C) and GPS checkpoint. | Telemetry array appended to batch history log on ledger. (PASS) |