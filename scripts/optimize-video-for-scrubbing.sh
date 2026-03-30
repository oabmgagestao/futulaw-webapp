#!/bin/bash

# =============================================================================
# FFMPEG VIDEO OPTIMIZATION FOR SCROLL-BASED SCRUBBING
# =============================================================================
# This script optimizes a video for smooth scroll-based playback.
# The key is having keyframes every 1-2 frames for instant random access.
#
# Usage: ./optimize-video-for-scrubbing.sh input.mp4 output.mp4
# =============================================================================

INPUT="${1:-input.mp4}"
OUTPUT="${2:-output_scrub.mp4}"

echo "🎬 Optimizing video for scroll scrubbing..."
echo "   Input:  $INPUT"
echo "   Output: $OUTPUT"
echo ""

# -----------------------------------------------------------------------------
# RECOMMENDED FFMPEG COMMAND FOR SCROLL SCRUBBING
# -----------------------------------------------------------------------------
# Key parameters:
#   -g 2              : Keyframe every 2 frames (CRUCIAL for smooth scrubbing)
#   -keyint_min 2     : Minimum keyframe interval
#   -sc_threshold 0   : Disable scene change detection (consistent keyframes)
#   -profile:v baseline : Maximum browser compatibility
#   -level 3.0        : Compatibility with older devices
#   -pix_fmt yuv420p  : Universal pixel format for web
#   -movflags +faststart : Enables progressive loading (metadata at start)
#   -an               : Remove audio (not needed for scrubbing videos)
#   -preset slow      : Better compression (use 'fast' for quicker encoding)
#   -crf 23           : Quality (18-28, lower = better quality, larger file)
# -----------------------------------------------------------------------------

ffmpeg -i "$INPUT" \
  -vcodec libx264 \
  -pix_fmt yuv420p \
  -profile:v baseline \
  -level 3.0 \
  -g 2 \
  -keyint_min 2 \
  -sc_threshold 0 \
  -movflags +faststart \
  -an \
  -preset slow \
  -crf 23 \
  -vf "scale=1280:-2" \
  "$OUTPUT"

echo ""
echo "✅ Done! Video optimized for scroll scrubbing."
echo "   File size comparison:"
ls -lh "$INPUT" "$OUTPUT" 2>/dev/null | awk '{print "   " $9 ": " $5}'

# -----------------------------------------------------------------------------
# ALTERNATIVE: EVEN SMOOTHER (but larger file)
# Use -g 1 for keyframe on EVERY frame (doubles file size but smoothest)
# -----------------------------------------------------------------------------
# ffmpeg -i "$INPUT" \
#   -vcodec libx264 \
#   -pix_fmt yuv420p \
#   -profile:v baseline \
#   -level 3.0 \
#   -g 1 \
#   -keyint_min 1 \
#   -sc_threshold 0 \
#   -movflags +faststart \
#   -an \
#   -preset slow \
#   -crf 23 \
#   -vf "scale=1280:-2" \
#   "${OUTPUT%.mp4}_ultra.mp4"
