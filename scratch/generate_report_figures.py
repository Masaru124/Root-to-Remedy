import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
import os

os.makedirs("scratch/generated_figures", exist_ok=True)

# -------------------------------------------------------------
# 1. Figure 4.1.1: Input Design of Root-to-Remedy System
# -------------------------------------------------------------
def make_input_design():
    fig, ax = plt.subplots(figsize=(10, 5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis('off')

    # Background
    ax.add_patch(patches.Rectangle((0.1, 0.1), 9.8, 4.8, linewidth=1.5, edgecolor='#2b6cb0', facecolor='#f7fafc'))
    ax.text(5, 4.5, "Figure 4.1.1: Multi-Stakeholder Input Design Architecture", ha='center', va='center', fontsize=12, fontweight='bold', color='#1a365d')

    # Card 1: Harvester Input
    ax.add_patch(patches.Rectangle((0.4, 0.6), 2.8, 3.5, linewidth=1.2, edgecolor='#38a169', facecolor='#ffffff'))
    ax.add_patch(patches.Rectangle((0.4, 3.6), 2.8, 0.5, facecolor='#38a169'))
    ax.text(1.8, 3.85, "1. Harvester / Farmer Input", ha='center', va='center', fontsize=9, fontweight='bold', color='#ffffff')
    harv_text = "• Botanical Species Selection\n  (e.g., Ashwagandha, Katuki)\n• GPS Geolocation Coordinates\n  (Latitude & Longitude)\n• Harvest Date & Timestamp\n• Fresh Biomass Weight (kg)\n• Soil Type & Moisture Index\n• Harvester Digital Signature"
    ax.text(0.6, 2.0, harv_text, ha='left', va='center', fontsize=8, color='#2d3748', linespacing=1.4)

    # Card 2: Laboratory Input
    ax.add_patch(patches.Rectangle((3.6, 0.6), 2.8, 3.5, linewidth=1.2, edgecolor='#3182ce', facecolor='#ffffff'))
    ax.add_patch(patches.Rectangle((3.6, 3.6), 2.8, 0.5, facecolor='#3182ce'))
    ax.text(5.0, 3.85, "2. Laboratory Testing Input", ha='center', va='center', fontsize=9, fontweight='bold', color='#ffffff')
    lab_text = "• Batch ID Lookup & Linkage\n• Purity Assay Score (%)\n  (Target: P >= 95.0%)\n• Heavy Metal Count (Pb/Cd/As)\n• Toxin & Aflatoxin Count (C)\n• HPLC Spectrogram Analysis\n• Certificate PDF Upload\n  (Streamed to IPFS -> CID)"
    ax.text(3.8, 2.0, lab_text, ha='left', va='center', fontsize=8, color='#2d3748', linespacing=1.4)

    # Card 3: Logistics & Transporter Input
    ax.add_patch(patches.Rectangle((6.8, 0.6), 2.8, 3.5, linewidth=1.2, edgecolor='#d69e2e', facecolor='#ffffff'))
    ax.add_patch(patches.Rectangle((6.8, 3.6), 2.8, 0.5, facecolor='#d69e2e'))
    ax.text(8.2, 3.85, "3. Logistics Carrier Input", ha='center', va='center', fontsize=9, fontweight='bold', color='#ffffff')
    log_text = "• Consignment Tracking ID\n• Transit Checkpoint Location\n• Temperature Reading (°C)\n• Relative Humidity (% RH)\n• Carrier Node ID & Vehicle ID\n• Custody Handover Signature\n• Telemetry Ingestion to Chain"
    ax.text(7.0, 2.0, log_text, ha='left', va='center', fontsize=8, color='#2d3748', linespacing=1.4)

    plt.tight_layout()
    plt.savefig("scratch/generated_figures/input_design.png", bbox_inches='tight', dpi=300)
    plt.close()

# -------------------------------------------------------------
# 2. Figure 4.1.2: Output Design of Root-to-Remedy System
# -------------------------------------------------------------
def make_output_design():
    fig, ax = plt.subplots(figsize=(10, 5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis('off')

    # Background
    ax.add_patch(patches.Rectangle((0.1, 0.1), 9.8, 4.8, linewidth=1.5, edgecolor='#805ad5', facecolor='#f7fafc'))
    ax.text(5, 4.5, "Figure 4.1.2: Cryptographic Provenance Output Design", ha='center', va='center', fontsize=12, fontweight='bold', color='#44337a')

    # Left: Packaging QR Code Output
    ax.add_patch(patches.Rectangle((0.5, 0.6), 4.2, 3.5, linewidth=1.2, edgecolor='#319795', facecolor='#ffffff'))
    ax.add_patch(patches.Rectangle((0.5, 3.6), 4.2, 0.5, facecolor='#319795'))
    ax.text(2.6, 3.85, "A. Retail Packaging QR Code Output", ha='center', va='center', fontsize=9, fontweight='bold', color='#ffffff')
    qr_text = "• 2D Matrix Cryptographic QR Tag\n• Encoded Verification URL:\n  https://root-to-remedy.org/verify/:id\n• Signed Hash Payload:\n  H(ProductID || BatchID || CID || Time)\n• Tamper-Evident Physical Binding\n• Consumer Mobile Camera Scannable"
    ax.text(0.7, 2.1, qr_text, ha='left', va='center', fontsize=8.5, color='#2d3748', linespacing=1.5)

    # Right: Provenance Modal & Inspection Output
    ax.add_patch(patches.Rectangle((5.3, 0.6), 4.2, 3.5, linewidth=1.2, edgecolor='#dd6b20', facecolor='#ffffff'))
    ax.add_patch(patches.Rectangle((5.3, 3.6), 4.2, 0.5, facecolor='#dd6b20'))
    ax.text(7.4, 3.85, "B. Consumer Audit Screen & Certificate", ha='center', va='center', fontsize=9, fontweight='bold', color='#ffffff')
    disp_text = "• Trust Badge: VERIFIED (P >= 95%, C = 0)\n• Harvest Coordinates & Farm Authenticity\n• Chemical Assay Breakdown (Active Potency)\n• Full Custody Timeline (Farmer->Lab->Mfr)\n• Direct IPFS Gateway Link to Signed PDF\n• Millisecond Materialized Read Response"
    ax.text(5.5, 2.1, disp_text, ha='left', va='center', fontsize=8.5, color='#2d3748', linespacing=1.5)

    plt.tight_layout()
    plt.savefig("scratch/generated_figures/output_design.png", bbox_inches='tight', dpi=300)
    plt.close()

# -------------------------------------------------------------
# 3. Figure 4.2.1: Data Flow Diagram (DFD Level 1)
# -------------------------------------------------------------
def make_dfd():
    fig, ax = plt.subplots(figsize=(10, 5.5), dpi=300)
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 7)
    ax.axis('off')

    ax.text(6, 6.6, "Figure 4.2.1: Level-1 Data Flow Diagram (DFD) for Botanical Provenance", ha='center', va='center', fontsize=11, fontweight='bold', color='#1a202c')

    # External Entities
    def draw_entity(x, y, text, color='#2b6cb0'):
        ax.add_patch(patches.Rectangle((x-0.9, y-0.4), 1.8, 0.8, linewidth=1.2, edgecolor=color, facecolor='#ebf8ff'))
        ax.text(x, y, text, ha='center', va='center', fontsize=8, fontweight='bold', color='#2b6cb0')

    # Processes
    def draw_process(x, y, pid, text, color='#2f855a'):
        ax.add_patch(patches.Rectangle((x-1.0, y-0.45), 2.0, 0.9, linewidth=1.2, edgecolor=color, facecolor='#f0fff4'))
        ax.text(x, y+0.15, pid, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#276749')
        ax.text(x, y-0.15, text, ha='center', va='center', fontsize=7, color='#22543d')

    # Data Stores
    def draw_store(x, y, sid, text):
        ax.plot([x-1.1, x+1.1], [y+0.35, y+0.35], color='#744210', lw=1.5)
        ax.plot([x-1.1, x+1.1], [y-0.35, y-0.35], color='#744210', lw=1.5)
        ax.plot([x-1.1, x-1.1], [y-0.35, y+0.35], color='#744210', lw=1.5)
        ax.fill([x-1.1, x+1.1, x+1.1, x-1.1], [y-0.35, y-0.35, y+0.35, y+0.35], color='#fefcbf', alpha=0.6)
        ax.text(x-0.8, y, sid, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#744210')
        ax.text(x+0.2, y, text, ha='center', va='center', fontsize=7, color='#744210')

    draw_entity(1.2, 5.2, "Harvester")
    draw_entity(1.2, 3.4, "Testing Lab")
    draw_entity(1.2, 1.6, "Manufacturer")
    draw_entity(10.8, 5.2, "Consumer")
    draw_entity(10.8, 2.5, "Transporter")

    draw_process(4.2, 5.2, "1.0 Ingest Batch", "Record Biomass & GPS")
    draw_process(4.2, 3.4, "2.0 Lab Assay", "Quality & IPFS Pin")
    draw_process(4.2, 1.6, "3.0 Compound", "Formulate & Mint QR")
    draw_process(7.8, 5.2, "4.0 Public Verify", "Scan QR & Audit Trail")
    draw_process(7.8, 2.5, "5.0 Log Transit", "IoT Temp & Location")

    draw_store(6.0, 4.3, "D1", "Hyperledger Fabric Ledger")
    draw_store(6.0, 3.4, "D2", "IPFS Distributed Cluster")
    draw_store(6.0, 2.0, "D3", "MongoDB Read Cache")

    arrow = dict(arrowstyle="->", color="#4a5568", lw=1.2)
    ax.annotate("", xy=(3.2, 5.2), xytext=(2.1, 5.2), arrowprops=arrow)
    ax.annotate("", xy=(3.2, 3.4), xytext=(2.1, 3.4), arrowprops=arrow)
    ax.annotate("", xy=(3.2, 1.6), xytext=(2.1, 1.6), arrowprops=arrow)
    ax.annotate("", xy=(8.8, 2.5), xytext=(9.9, 2.5), arrowprops=arrow)
    ax.annotate("", xy=(9.9, 5.2), xytext=(8.8, 5.2), arrowprops=arrow)

    ax.annotate("", xy=(5.2, 4.6), xytext=(4.7, 4.9), arrowprops=arrow)
    ax.annotate("", xy=(4.9, 4.1), xytext=(4.5, 3.8), arrowprops=arrow)
    ax.annotate("", xy=(4.9, 3.4), xytext=(4.5, 3.4), arrowprops=arrow)
    ax.annotate("", xy=(5.3, 4.0), xytext=(4.6, 2.0), arrowprops=arrow)
    ax.annotate("", xy=(6.7, 4.1), xytext=(7.4, 2.9), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 4.8), xytext=(6.7, 2.3), arrowprops=arrow)

    ax.annotate("", xy=(6.0, 2.4), xytext=(6.0, 3.9), arrowprops=dict(arrowstyle="<->", color="#c53030", lw=1.2, ls="--"))
    ax.text(6.1, 3.0, "Cache Sync", fontsize=6.5, color="#c53030", fontweight="bold")

    plt.tight_layout()
    plt.savefig("scratch/generated_figures/dfd_diagram.png", bbox_inches='tight', dpi=300)
    plt.close()

# -------------------------------------------------------------
# 4. Figure 4.2.2: Use Case Diagram
# -------------------------------------------------------------
def make_use_case():
    fig, ax = plt.subplots(figsize=(10, 5.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 7)
    ax.axis('off')

    ax.text(5.5, 6.6, "Figure 4.2.2: UML Use Case Diagram for Root-to-Remedy", ha='center', va='center', fontsize=11, fontweight='bold', color='#1a202c')

    ax.add_patch(patches.Rectangle((2.4, 0.4), 6.2, 5.9, linewidth=1.5, edgecolor='#2b6cb0', facecolor='#f7fafc', ls='--'))
    ax.text(5.5, 6.0, "Root-to-Remedy System Boundary", ha='center', va='center', fontsize=9, fontweight='bold', color='#2b6cb0')

    def draw_actor(x, y, name):
        ax.add_patch(patches.Circle((x, y+0.35), 0.18, edgecolor='#2d3748', facecolor='#e2e8f0', lw=1.2))
        ax.plot([x, x], [y+0.17, y-0.2], color='#2d3748', lw=1.2)
        ax.plot([x-0.25, x+0.25], [y+0.05, y+0.05], color='#2d3748', lw=1.2)
        ax.plot([x, x-0.2], [y-0.2, y-0.5], color='#2d3748', lw=1.2)
        ax.plot([x, x+0.2], [y-0.2, y-0.5], color='#2d3748', lw=1.2)
        ax.text(x, y-0.7, name, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1a202c')

    draw_actor(1.2, 4.8, "Harvester")
    draw_actor(1.2, 3.0, "Testing Lab")
    draw_actor(1.2, 1.2, "Manufacturer")
    draw_actor(9.8, 4.5, "Consumer")
    draw_actor(9.8, 2.0, "Transporter")

    ucs = [
        (4.0, 5.2, "Register Harvest Batch"),
        (4.0, 4.2, "Upload Assay & Pin PDF"),
        (4.0, 3.2, "Evaluate Quality Gate"),
        (4.0, 2.1, "Compound Medicine & Mint QR"),
        (7.0, 4.8, "Scan QR & Verify Provenance"),
        (7.0, 3.8, "Retrieve IPFS Certificate"),
        (7.0, 2.5, "Log Telemetry & Environmental Data"),
        (5.5, 1.0, "Audit Ledger & Inspect History")
    ]
    for x, y, label in ucs:
        ax.add_patch(patches.Rectangle((x-1.3, y-0.25), 2.6, 0.5, edgecolor='#319795', facecolor='#e6fffa', lw=1.1))
        ax.text(x, y, label, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#234e52')

    line = dict(color="#718096", lw=1.0)
    ax.plot([1.5, 2.7], [4.8, 5.2], **line)
    ax.plot([1.5, 2.7], [3.0, 4.2], **line)
    ax.plot([1.5, 2.7], [3.0, 3.2], **line)
    ax.plot([1.5, 2.7], [1.2, 3.2], **line)
    ax.plot([1.5, 2.7], [1.2, 2.1], **line)
    ax.plot([9.5, 8.3], [4.5, 4.8], **line)
    ax.plot([9.5, 8.3], [4.5, 3.8], **line)
    ax.plot([9.5, 8.3], [2.0, 2.5], **line)

    plt.tight_layout()
    plt.savefig("scratch/generated_figures/usecase_diagram.png", bbox_inches='tight', dpi=300)
    plt.close()

# -------------------------------------------------------------
# 5. Figure 4.2.3: Sequence Diagram
# -------------------------------------------------------------
def make_sequence():
    fig, ax = plt.subplots(figsize=(10, 5.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7.5)
    ax.axis('off')

    ax.text(5, 7.1, "Figure 4.2.3: Dynamic UML Sequence Diagram for Quality Gate Lifecycle", ha='center', va='center', fontsize=11, fontweight='bold', color='#1a202c')

    lifelines = ["Client (SPA)", "API Gateway", "IPFS Kubo", "Fabric Peers", "Raft Orderer", "MongoDB"]
    xs = [1.0, 2.6, 4.2, 5.8, 7.4, 9.0]

    for x, name in zip(xs, lifelines):
        ax.add_patch(patches.Rectangle((x-0.7, 6.3), 1.4, 0.5, edgecolor='#2b6cb0', facecolor='#ebf8ff', lw=1.2))
        ax.text(x, 6.55, name, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#2b6cb0')
        ax.plot([x, x], [6.3, 0.4], color='#a0aec0', ls='--', lw=1.0)

    def msg(y, x1, x2, label, dashed=False, color='#2d3748'):
        ls = '--' if dashed else '-'
        ax.annotate("", xy=(x2, y), xytext=(x1, y), arrowprops=dict(arrowstyle="->", color=color, lw=1.1, ls=ls))
        ax.text((x1+x2)/2, y+0.12, label, ha='center', va='bottom', fontsize=7, color=color, fontweight='bold' if not dashed else 'normal')

    msg(5.8, 1.0, 2.6, "1: UploadLabReport(batchId, P, C, PDF)")
    msg(5.3, 2.6, 4.2, "2: pinFile(PDF buffer)")
    msg(4.9, 4.2, 2.6, "3: return CID (QmHash...)", dashed=True)
    msg(4.4, 2.6, 5.8, "4: submitProposal('UploadLabReport', CID, P, C)")
    msg(3.9, 5.8, 5.8, "5: eval rules: P>=95% & C==0", color='#c53030')
    msg(3.4, 5.8, 2.6, "6: signed proposal response", dashed=True)
    msg(2.9, 2.6, 7.4, "7: broadcastTx(signedProposal)")
    msg(2.4, 7.4, 5.8, "8: cutBlock & commit to Ledger", dashed=True)
    msg(1.9, 2.6, 9.0, "9: updateReadCache(batchId, status, CID)")
    msg(1.4, 1.0, 2.6, "10: verifyProduct(qrCode)")
    msg(0.9, 2.6, 9.0, "11: fast query cached batch (sub-15ms)")
    msg(0.5, 9.0, 1.0, "12: return verified provenance & CID", dashed=True)

    plt.tight_layout()
    plt.savefig("scratch/generated_figures/sequence_diagram.png", bbox_inches='tight', dpi=300)
    plt.close()

# -------------------------------------------------------------
# 6. Benchmark Latency vs Throughput (Fig 7.7)
# -------------------------------------------------------------
def make_latency_plot():
    fig, ax = plt.subplots(figsize=(8, 4.5), dpi=300)
    
    tps = np.array([100, 250, 500, 650, 800, 1000, 1200, 1400])
    write_lat = np.array([42, 51, 68, 88, 142, 220, 310, 430])
    read_lat = np.array([14, 16, 21, 25, 29, 38, 52, 75])
    cache_lat = np.array([6, 7, 8, 9, 10, 11, 13, 14])

    ax.plot(tps, write_lat, marker='s', color='#3182ce', lw=2, label='SubmitTransaction (Write Consensus)')
    ax.plot(tps, read_lat, marker='^', color='#e53e3e', lw=2, label='EvaluateTransaction (Peer Read)')
    ax.plot(tps, cache_lat, marker='d', color='#319795', lw=2, ls='--', label='Materialized Read Cache (MongoDB)')

    ax.set_title("Figure 7.7: Transaction Latency vs Offered Throughput (TPS)", fontsize=11, fontweight='bold', pad=12)
    ax.set_xlabel("Offered Throughput (Transactions Per Second - TPS)", fontsize=9, labelpad=8)
    ax.set_ylabel("Execution Latency (ms)", fontsize=9, labelpad=8)
    ax.grid(True, ls=':', alpha=0.6)
    ax.legend(fontsize=8.5, loc='upper left')

    plt.tight_layout()
    plt.savefig("scratch/generated_figures/benchmark_latency_tps.png", bbox_inches='tight', dpi=300)
    plt.close()

# -------------------------------------------------------------
# 7. Storage Footprint Comparison (Fig 7.8)
# -------------------------------------------------------------
def make_storage_plot():
    fig, ax = plt.subplots(figsize=(8, 4.5), dpi=300)
    
    batches = ['10k', '25k', '50k', '100k']
    x = np.arange(len(batches))
    width = 0.35

    naive_onchain = [420, 1050, 2100, 4200]
    hybrid_ipfs = [0.84, 2.10, 4.20, 8.40]

    rects1 = ax.bar(x - width/2, naive_onchain, width, label='Naive On-Chain PDF Storage (MB)', color='#fc8181', edgecolor='#c53030')
    rects2 = ax.bar(x + width/2, hybrid_ipfs, width, label='Root-to-Remedy CID Anchoring (MB)', color='#63b3ed', edgecolor='#2b6cb0')

    ax.set_title("Figure 7.8: Blockchain Peer State Storage Growth Comparison", fontsize=11, fontweight='bold', pad=12)
    ax.set_xlabel("Cumulative Botanical Batches Ingested", fontsize=9, labelpad=8)
    ax.set_ylabel("On-Chain Ledger State Size (MB)", fontsize=9, labelpad=8)
    ax.set_xticks(x)
    ax.set_xticklabels(batches)
    ax.grid(True, axis='y', ls=':', alpha=0.6)
    ax.legend(fontsize=8.5)

    for i in range(len(batches)):
        ax.annotate(f"{naive_onchain[i]} MB", xy=(x[i]-width/2, naive_onchain[i]+60), ha='center', fontsize=7.5, fontweight='bold', color='#c53030')
        ax.annotate(f"{hybrid_ipfs[i]} MB", xy=(x[i]+width/2, 60), ha='center', fontsize=7.5, fontweight='bold', color='#2b6cb0')

    plt.tight_layout()
    plt.savefig("scratch/generated_figures/storage_footprint.png", bbox_inches='tight', dpi=300)
    plt.close()

# -------------------------------------------------------------
# 8. UI Portal Mockups (Figs 7.1 to 7.6)
# -------------------------------------------------------------
def make_ui_mockup(filename, title, subtitle, header_bg, elements):
    fig, ax = plt.subplots(figsize=(10, 5.2), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5.5)
    ax.axis('off')

    ax.add_patch(patches.Rectangle((0.1, 0.1), 9.8, 5.3, edgecolor='#cbd5e0', facecolor='#ffffff', lw=1.5))
    ax.add_patch(patches.Rectangle((0.1, 4.8), 9.8, 0.6, facecolor='#edf2f7'))
    ax.add_patch(patches.Circle((0.4, 5.1), 0.08, facecolor='#fc8181'))
    ax.add_patch(patches.Circle((0.65, 5.1), 0.08, facecolor='#f6e05e'))
    ax.add_patch(patches.Circle((0.9, 5.1), 0.08, facecolor='#68d391'))
    ax.add_patch(patches.Rectangle((1.3, 4.9), 7.4, 0.4, facecolor='#ffffff', edgecolor='#e2e8f0'))
    ax.text(1.5, 5.1, "https://root-to-remedy.org/portal", fontsize=7.5, color='#718096', va='center')

    ax.add_patch(patches.Rectangle((0.1, 4.1), 9.8, 0.7, facecolor=header_bg))
    ax.text(0.4, 4.45, "Root-to-Remedy | Ayurvedic Supply Chain Provenance", fontsize=10, fontweight='bold', color='#ffffff', va='center')
    ax.text(9.5, 4.45, "Network: Fabric v2.5 (Online)", fontsize=8, color='#c6f6d5', va='center', ha='right')

    ax.text(0.5, 3.75, title, fontsize=11, fontweight='bold', color='#1a202c')
    ax.text(0.5, 3.45, subtitle, fontsize=8, color='#718096')

    for el in elements:
        x, y, w, h, bg, border, label, desc = el
        ax.add_patch(patches.Rectangle((x, y), w, h, edgecolor=border, facecolor=bg, lw=1.2))
        ax.text(x+0.2, y+h-0.25, label, fontsize=8.5, fontweight='bold', color='#2d3748', va='top')
        if desc:
            ax.text(x+0.2, y+h-0.55, desc, fontsize=7.5, color='#4a5568', va='top', linespacing=1.3)

    plt.tight_layout()
    plt.savefig(f"scratch/generated_figures/{filename}", bbox_inches='tight', dpi=300)
    plt.close()

def make_all_uis():
    make_ui_mockup(
        "ui_home_verify.png",
        "Public Botanical Medicine Verification Portal",
        "Scan packaging QR code or enter product identifier for cryptographic provenance audit",
        "#276749",
        [
            (0.5, 0.5, 4.2, 2.7, "#f0fff4", "#38a169", "[ Camera QR Code Scanner ]", "Point mobile camera or webcam to scan retail packaging.\nDecodes signed multi-hash: H(ProdID || BatchID || CID)\nInstant lookup against local materialized read cache."),
            (5.1, 0.5, 4.4, 2.7, "#ebf8ff", "#3182ce", "[ Manual Product Lookup ]", "Enter Retail Batch / Product Serial:\n[ R2R-ASHWA-2026-0842B          ] [ Verify ]\n\nStatus: 100% Cryptographically Verified\nPurity: 98.4% | Toxins: 0 | Fabric Tx: 0x9f4a...e12\nIPFS Certificate: QmZtmD2qtWbpPyPP6Y... (Pinned)")
        ]
    )

    make_ui_mockup(
        "ui_farmer.png",
        "Harvester Raw Biomass Ingestion Dashboard",
        "Record wildcrafted harvest collections with tamper-proof GPS and origin credentials",
        "#22543d",
        [
            (0.5, 0.5, 4.2, 2.7, "#ffffff", "#e2e8f0", "[ Harvest Ingestion Form ]", "Botanical Species: Withania somnifera (Ashwagandha)\nHarvest Weight: 450.00 kg\nGPS Location: 32.2190 N, 76.3234 E (Dharamshala)\nSoil Classification: Sandy Loam (Wild Forest)\nHarvester ID: HARV-HP-042 (MSP Authenticated)"),
            (5.1, 0.5, 4.4, 2.7, "#f7fafc", "#cbd5e0", "[ Ingested Harvest Batches ]", "• BATCH-8821: Ashwagandha (450 kg) - PENDING LAB\n• BATCH-8820: Picrorhiza kurroa (120 kg) - APPROVED\n• BATCH-8819: Ocimum sanctum (300 kg) - MANUFACTURED\nAll events signed with Harvester ECDSA private key.")
        ]
    )

    make_ui_mockup(
        "ui_lab.png",
        "Certified Testing Laboratory Assay & Certificate Upload",
        "Input chemical assay metrics and stream analytical PDF certificates directly to IPFS",
        "#2b6cb0",
        [
            (0.5, 0.5, 4.2, 2.7, "#ffffff", "#cbd5e0", "[ Laboratory Chemical Assay Entry ]", "Batch ID Selection: BATCH-8821\nAssay Purity Score (P): 98.4 % (Min: 95.0%)\nChemical Contaminant Count (C): 0 (Zero Tolerance)\nHeavy Metals (Pb, Cd, As): Undetected (< 0.01 ppm)\nAflatoxin B1/B2/G1/G2: None Detected"),
            (5.1, 0.5, 4.4, 2.7, "#ebf8ff", "#3182ce", "[ Tamper-Proof IPFS Upload Streamer ]", "Drag & Drop Certificate PDF [ HPLC_Report_8821.pdf ]\nIPFS Cluster Status: Uploaded & Pinned (256 KB chunks)\nGenerated Content Identifier (CIDv0):\nQmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG\nInvoking Chaincode: UploadLabReport -> STATUS: APPROVED")
        ]
    )

    make_ui_mockup(
        "ui_login.png",
        "Role-Gated Cryptographic Authentication Gateway",
        "Authenticate ecosystem participants and issue cryptographically signed JWT credentials",
        "#4a5568",
        [
            (1.5, 0.6, 7.0, 2.6, "#ffffff", "#cbd5e0", "[ Secure Member Login ]", "Select Organizational Role:\n[ Harvester / Farmer | Testing Lab | Manufacturer | Transporter ]\nUsername / Email: lab_analyst@ayur-cert.org\nPassword: ****************\n[ Sign In ] -> Issues JWT with role-claim & Fabric MSP Identity")
        ]
    )

    make_ui_mockup(
        "ui_manufacturer.png",
        "Manufacturer Formulation & Ancestry Compounding Interface",
        "Compound verified raw botanical batches into retail formulations and mint packaging QR codes",
        "#c05621",
        [
            (0.5, 0.5, 4.2, 2.7, "#ffffff", "#cbd5e0", "[ Medicine Formulation ]", "Finished Product Name: Ashwagandha Churna (Extract)\nSource Raw Batches: BATCH-8821 (P=98.4%, C=0) [OK]\nBatch Status Verification: APPROVED ON-CHAIN\nFormula Ratio: 100% Pure Root Extract\nManufacturing Unit: AyurPharm Facility #3, Haridwar"),
            (5.1, 0.5, 4.4, 2.7, "#fffaf0", "#dd6b20", "[ QR Code Minting & Packaging Binding ]", "Generated Product ID: PROD-ASHWA-90412\nPackaging Batch Size: 2,500 Units (100g bottles)\nQR Code Generated: 2D Matrix Signed Multi-hash\nChaincode Invocation: CreateProduct(PROD-ASHWA-90412)\nImmutable Ancestry Link Committed to Blockchain.")
        ]
    )

    make_ui_mockup(
        "ui_provenance_modal.png",
        "Consumer Cryptographic Provenance Inspection Screen",
        "Complete transparent lifecycle audit trail retrieved from ledger and IPFS in under 15ms",
        "#2c5282",
        [
            (0.5, 0.5, 4.2, 2.7, "#f0fff4", "#38a169", "[ Quality Gate Verification: PASSED ]", "Product: Pure Ashwagandha Extract (Churna)\nStatus: 100% Authenticated & Contaminant Free\nPurity Assay: 98.4% (Pharmacopeia Standard >= 95%)\nHeavy Metals: 0.00 ppm | Microbial Contaminants: 0\nPhysical Integrity: Sealed Cryptographic QR Binding"),
            (5.1, 0.5, 4.4, 2.7, "#ebf8ff", "#3182ce", "[ Complete Origin-to-Retail Audit Trail ]", "1. Harvested: Dharamshala (32.219 N, 76.323 E) by HARV-042\n2. Tested: Central Ayush Analytical Labs (CID: QmYwAP...)\n3. Compounded: AyurPharm Labs (PROD-90412)\n4. Transport: Checkpoint Delhi (Temp: 21.4 C, RH: 42%)\n[ View Original Signed Lab Certificate PDF on IPFS ]")
        ]
    )

if __name__ == "__main__":
    print("Generating all figures...")
    make_input_design()
    make_output_design()
    make_dfd()
    make_use_case()
    make_sequence()
    make_latency_plot()
    make_storage_plot()
    make_all_uis()
    print("All figures generated successfully in scratch/generated_figures/!")
