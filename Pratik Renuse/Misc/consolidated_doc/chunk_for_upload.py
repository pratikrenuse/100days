#!/usr/bin/env python3
"""Split volume_1.md and volume_2.md into upload-friendly chunks.

Each chunk is ~120KB of markdown (roughly the largest size that fits comfortably
in a single Anthropic tool-call output). Chunks break at chapter (## Chapter N)
boundaries so no chapter is split across files.

Output:
  upload_chunks/v1_part01.txt ... v1_partNN.txt
  upload_chunks/v2_part01.txt ... v2_partNN.txt

Each file starts with a small breadcrumb so the resulting Google Doc is
navigable on its own.
"""
import re
from pathlib import Path

ROOT = Path("/Users/pratikrenuse/Desktop/consolidated_doc")
OUT_DIR = ROOT / "upload_chunks"
OUT_DIR.mkdir(exist_ok=True)

# Tool-call budget per chunk; tuned to be safely under one Anthropic output window
TARGET_CHUNK = 120_000

CHAPTER_RE = re.compile(r"^## Chapter \d+:", re.M)


def chunk_volume(src: Path, prefix: str, vol_label: str) -> int:
    """Split `src` into chunk files named upload_chunks/{prefix}_partNN.txt"""
    text = src.read_text()
    # find all chapter boundary positions; first one is the natural split anchor
    boundaries = [m.start() for m in CHAPTER_RE.finditer(text)]
    boundaries.append(len(text))  # sentinel

    chunks = []
    start = 0
    cursor = 0
    # Greedily accumulate chapters until we would exceed TARGET_CHUNK
    for b in boundaries[1:]:
        # If we have something in current chunk AND adding next chapter would exceed,
        # close current chunk.
        if b - start > TARGET_CHUNK and start < cursor:
            chunks.append((start, cursor))
            start = cursor
        cursor = b
    if start < len(text):
        chunks.append((start, len(text)))

    # Second pass: any chunk still over TARGET_CHUNK contains a single oversize
    # chapter — break it on paragraph boundaries until each piece fits.
    final_chunks = []
    for a, b in chunks:
        if b - a <= TARGET_CHUNK:
            final_chunks.append((a, b))
            continue
        # Walk the oversize chunk and split on blank lines near the target size
        sub_start = a
        while sub_start < b:
            sub_end = min(sub_start + TARGET_CHUNK, b)
            if sub_end < b:
                # Find a nearby blank-line boundary (look back up to 5000 chars)
                window_start = max(sub_start + TARGET_CHUNK - 5000, sub_start + 1)
                idx = text.rfind("\n\n", window_start, sub_end)
                if idx > sub_start:
                    sub_end = idx
            final_chunks.append((sub_start, sub_end))
            sub_start = sub_end
    chunks = final_chunks

    n = len(chunks)
    for i, (a, b) in enumerate(chunks, 1):
        part = text[a:b].strip()
        breadcrumb = (
            f"{vol_label} — Part {i} of {n}\n"
            f"{'=' * 60}\n\n"
        )
        out_path = OUT_DIR / f"{prefix}_part{i:02d}.txt"
        out_path.write_text(breadcrumb + part + "\n")
        size_kb = out_path.stat().st_size / 1024
        print(f"  {out_path.name}: {size_kb:.0f} KB")
    return n


print("Volume 1:")
n1 = chunk_volume(ROOT / "volume_1.md", "v1", "Mochary Method Curriculum — Volume 1")
print(f"\nVolume 2:")
n2 = chunk_volume(ROOT / "volume_2.md", "v2", "Mochary Method Curriculum — Volume 2")
print(f"\nTotal chunks: {n1 + n2}")
