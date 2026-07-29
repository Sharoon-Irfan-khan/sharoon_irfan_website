#!/usr/bin/env bash
# Build the ambient overlay clips.
#
# Both sources are shot on pure black, which is what makes them usable: composited
# with `mix-blend-mode: screen`, black becomes transparent and only the light
# carries through. That turns a literal video into an atmosphere layer.
#
# The grade strips the neon colour out (the sources are magenta/cyan/orange) and
# retints to the brand's champagne-sand range, so the motion reads as drifting
# light rather than as stock footage sitting on top of the page.

set -euo pipefail

OUT="$(cd "$(dirname "$0")/.." && pwd)/public/video"
mkdir -p "$OUT"

BUTTERFLY="D:/Company_work/Free Stock Footage   Flying Butterflies Background Black.mp4"
GALAXY="D:/Company_work/galaxy stock video...  copyright free galaxy video.mp4"

# Near-total desaturation, then a warm retint. `curves` crushes the low end hard
# so the background stays true black — any lift there would grey out the section
# underneath once the screen blend is applied.
WARM="hue=s=0.08,\
colorbalance=rs=0.16:gs=0.06:bs=-0.14:rm=0.13:gm=0.05:bm=-0.12:rh=0.10:gh=0.05:bh=-0.05,\
curves=all='0/0 0.12/0.03 0.5/0.48 1/0.95',\
eq=contrast=1.12:saturation=1.0"

echo ">>> butterflies"
ffmpeg -y -v error -i "$BUTTERFLY" \
  -vf "scale=1280:720:flags=lanczos,$WARM" \
  -an -c:v libx264 -profile:v high -preset slow \
  -crf 30 -maxrate 1200k -bufsize 2400k \
  -pix_fmt yuv420p -movflags +faststart -r 25 \
  "$OUT/ambient-butterflies.mp4"

echo ">>> galaxy"
ffmpeg -y -v error -i "$GALAXY" \
  -vf "scale=1280:720:flags=lanczos,$WARM" \
  -an -c:v libx264 -profile:v high -preset slow \
  -crf 31 -maxrate 1100k -bufsize 2200k \
  -pix_fmt yuv420p -movflags +faststart -r 25 \
  "$OUT/ambient-galaxy.mp4"

echo
ls -la "$OUT" | grep ambient
