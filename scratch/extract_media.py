import zipfile
import os

docx_path = "phase 2 report 26.docx"
out_dir = "scratch/extracted_media"
os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(docx_path, 'r') as z:
    for item in z.namelist():
        if item.startswith("word/media/"):
            z.extract(item, out_dir)
            print(f"Extracted: {item} ({os.path.getsize(os.path.join(out_dir, item))} bytes)")

print("Media extraction complete.")
