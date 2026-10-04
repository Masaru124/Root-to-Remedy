from PIL import Image
import os

fig_dir = "scratch/generated_figures"
media_replace_dir = "scratch/new_media"
os.makedirs(media_replace_dir, exist_ok=True)

def save_as_jpeg(src_png, dest_name):
    with Image.open(src_png) as im:
        rgb_im = im.convert("RGB")
        rgb_im.save(os.path.join(media_replace_dir, dest_name), "JPEG", quality=95)
        print(f"Saved {dest_name} from {src_png} ({rgb_im.size})")

# Image mappings
save_as_jpeg(f"{fig_dir}/input_design.png", "image3.jpeg")
save_as_jpeg(f"{fig_dir}/output_design.png", "image4.jpeg")
save_as_jpeg(f"{fig_dir}/dfd_diagram.png", "image5.jpeg")
save_as_jpeg(f"{fig_dir}/usecase_diagram.png", "image6.jpeg")
save_as_jpeg(f"{fig_dir}/sequence_diagram.png", "image7.jpeg")
save_as_jpeg(f"{fig_dir}/sequence_diagram.png", "image8.jpeg")

# image8.png is PNG: keep PNG format
with Image.open("test_fig1_v5.png") as im:
    im.save(os.path.join(media_replace_dir, "image8.png"), "PNG")
    print(f"Saved image8.png from test_fig1_v5.png ({im.size})")

real_dir = "scratch/real_screenshots"
save_as_jpeg(f"{real_dir}/ui_home_verify.png", "image9.jpeg")
save_as_jpeg(f"{real_dir}/ui_farmer.png", "image10.jpeg")
save_as_jpeg(f"{real_dir}/ui_farmer.png", "image11.jpeg")
save_as_jpeg(f"{real_dir}/ui_lab.png", "image12.jpeg")
save_as_jpeg(f"{real_dir}/ui_lab.png", "image13.jpeg")
save_as_jpeg(f"{real_dir}/ui_login.png", "image14.jpeg")
save_as_jpeg(f"{real_dir}/ui_login.png", "image15.jpeg")
save_as_jpeg(f"{real_dir}/ui_manufacturer.png", "image16.jpeg")
save_as_jpeg(f"{real_dir}/ui_manufacturer.png", "image17.jpeg")
save_as_jpeg(f"{real_dir}/ui_provenance_modal.png", "image18.jpeg")
save_as_jpeg(f"{real_dir}/ui_provenance_modal.png", "image19.jpeg")
save_as_jpeg(f"{fig_dir}/benchmark_latency_tps.png", "image20.jpeg")
save_as_jpeg(f"{fig_dir}/benchmark_latency_tps.png", "image21.jpeg")
save_as_jpeg(f"{fig_dir}/benchmark_latency_tps.png", "image23.jpeg")

print("All new media files prepared successfully.")
