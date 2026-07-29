#!/usr/bin/env bash
# Build the Dubai clips, posters and stills used across the site.
#
# Pipeline: crop the source's channel bug -> denoise (the source has visible
# h264 artefacts that upscaling would otherwise magnify) -> upscale with lanczos
# -> light cinematic grade that keeps natural colour but warms the highlights
# toward the brand's sand/champagne range -> sharpen.
#
# To use different footage: change SRC, then change the timecodes in the clip
# calls at the bottom (start second, duration in seconds). If your source is
# already high resolution, drop the `hqdn3d` denoise and lower CRF to about 21.

set -euo pipefail

SRC="D:/Company_work/Dubai 4K – Aerial Views of Iconic Skyscrapers & Desert Landscapes With Deep House Chill.mp4"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public"
mkdir -p "$OUT/video" "$OUT/images"

# Source is 640x360 with a bug top-left. Crop it out, then scale to 1080p — the
# right delivery size for a full-bleed web hero. Going higher only inflates the
# file: there is no detail in the source above 640px to recover.
BASE="crop=598:326:36:28,\
hqdn3d=3:2:4:4,\
scale=1920:1046:flags=lanczos+accurate_rnd"

GRADE="$BASE,\
eq=contrast=1.07:brightness=0.004:saturation=1.10:gamma=1.03,\
colorbalance=rs=0.035:gs=0.008:bs=-0.035:rm=0.028:gm=0.008:bm=-0.022:rh=0.030:gh=0.014:bh=-0.012,\
curves=all='0/0.018 0.25/0.245 0.5/0.505 0.75/0.762 1/0.985',\
unsharp=5:5:0.85:5:5:0.0"

clip () {
  local name="$1" start="$2" dur="$3"
  printf '>>> %-10s t=%ss  %ss\n' "$name" "$start" "$dur"

  # CRF 28 with a hard bitrate ceiling. Upscaled footage carries no fine detail,
  # so a lower CRF spends bits encoding the upscale rather than anything a viewer
  # can see — and a hero video that stalls costs more than it adds.
  ffmpeg -y -v error -ss "$start" -t "$dur" -i "$SRC" \
    -vf "$GRADE" \
    -an -c:v libx264 -profile:v high -level 4.1 -preset slow \
    -crf 28 -maxrate 2600k -bufsize 5200k \
    -pix_fmt yuv420p -movflags +faststart -r 25 \
    "$OUT/video/$name.mp4"

  # Poster frame, shown until the clip has loaded and started.
  ffmpeg -y -v error -ss "$start" -i "$SRC" -vf "$GRADE" \
    -frames:v 1 -q:v 4 "$OUT/video/$name.jpg"

  # Standalone still, for image bands and plates.
  ffmpeg -y -v error -ss "$((start + 3))" -i "$SRC" -vf "$GRADE" \
    -frames:v 1 -q:v 4 "$OUT/images/$name.jpg"
}

clip skyline   1502 9
clip marina     300 9
clip downtown  6306 9
clip desert    5105 9
clip frame     6907 9

echo
echo "--- output ---"
ls -la "$OUT/video" | grep -E 'mp4|jpg'
du -sh "$OUT/video" "$OUT/images"
