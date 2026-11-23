#!/bin/bash
# Puts the photos you saved for one person into their day page, resized,
# and asks you for the credit line for each photo.
#
# Usage:
#   ./place-photos.sh marc-lou "<path to the day page folder>"
#
# Example for Day 1:
#   ./place-photos.sh marc-lou "../Claude outputs/solopreneur-preview/day-1-v3"
#
# It looks for ~/Downloads/solopreneur-photos/marc-lou-1.* and marc-lou-2.*
# (jpg, jpeg, png, webp or heic all work).

set -e
cd "$(dirname "$0")"

SLUG="$1"
PAGE="$2"
SRC=~/Downloads/solopreneur-photos

if [ -z "$SLUG" ] || [ -z "$PAGE" ]; then
  echo "Usage: ./place-photos.sh <person-slug> <day page folder>"
  exit 1
fi
if [ ! -f "$PAGE/index.html" ]; then
  echo "No index.html in: $PAGE"
  exit 1
fi

mkdir -p "$PAGE/img"
CREDITS="{"
found=0

for k in 1 2; do
  f=$(ls "$SRC/$SLUG-$k".* 2>/dev/null | head -1 || true)
  if [ -z "$f" ]; then
    echo "No photo $k for $SLUG (looked for $SRC/$SLUG-$k.*). Skipping."
    continue
  fi
  sips -s format jpeg -s formatOptions 82 -Z 1400 "$f" --out "$PAGE/img/person-$k.jpg" >/dev/null
  echo "Placed photo $k: $(basename "$f")"
  read -r -p "Credit for photo $k (for example: Photo: Marc Lou on X): " credit
  credit=${credit//\"/\\\"}
  [ $found -eq 1 ] && CREDITS="$CREDITS,"
  CREDITS="$CREDITS\"$k\":\"$credit\""
  found=1
done

CREDITS="$CREDITS}"
echo "$CREDITS" > "$PAGE/img/credits.json"
echo "Done. Open $PAGE/index.html to check it."
