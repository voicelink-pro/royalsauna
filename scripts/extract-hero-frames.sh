#!/usr/bin/env bash
#
# Extracts a hero video into a JPEG frame sequence used by the scroll-scrubbed
# hero (FrameSequenceCanvas). Run via: npm run hero:frames
#
# Override SRC/OUT to (re)generate an alternate sequence, e.g. the night/dark
# variant used by the hero's day/night toggle:
#   SRC=public/videos/hero-night.mp4 OUT=public/hero-frames-night npm run hero:frames
# (or use the dedicated shortcut: npm run hero:frames:night)
#
# Requires ffmpeg (brew install ffmpeg).

set -euo pipefail

SRC="${SRC:-public/videos/hero.mp4}"
OUT="${OUT:-public/hero-frames}"
FPS="${FPS:-12}"
WIDTH="${WIDTH:-1280}"
QUALITY="${QUALITY:-5}" # JPEG qscale: lower = better quality / larger files

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg not found. Install it first (e.g. brew install ffmpeg)." >&2
  exit 1
fi

if [ ! -f "$SRC" ]; then
  echo "Error: $SRC not found. Place your hero video there first." >&2
  exit 1
fi

rm -rf "$OUT"
mkdir -p "$OUT"

ffmpeg -y -i "$SRC" \
  -vf "fps=${FPS},scale=${WIDTH}:-2" \
  -qscale:v "$QUALITY" \
  "$OUT/frame-%04d.jpg"

COUNT="$(find "$OUT" -name 'frame-*.jpg' | wc -l | tr -d ' ')"
SIZE="$(du -sh "$OUT" | cut -f1)"

echo ""
echo "Done. Extracted $COUNT frames ($SIZE) to $OUT"
echo "Set FRAME_COUNT = $COUNT in src/components/sections/HeroVideoScroll.tsx"
