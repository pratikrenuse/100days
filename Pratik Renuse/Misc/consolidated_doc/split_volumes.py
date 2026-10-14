#!/usr/bin/env python3
"""Split book.md into 2 volumes at a natural section boundary near the
character midpoint, so each volume fits inside Google Docs' ~1M char limit.

Strategy:
- Find positions of all top-level section headings (`# Section Name`)
- Pick the heading whose position is closest to (total_chars // 2)
- Volume 1 = everything before that heading
- Volume 2 = that heading + everything after

Each volume gets its own cover + TOC slice. The Foreword + global TOC stay
in Volume 1 only; Volume 2 gets a short re-entry preamble.
"""
import re
from pathlib import Path
from datetime import date

ROOT = Path("/Users/pratikrenuse/Desktop/consolidated_doc")
BOOK = ROOT / "book.md"
VOL1 = ROOT / "volume_1.md"
VOL2 = ROOT / "volume_2.md"

# Google Docs accepts up to ~1,020,000 chars. Leave headroom for HTML overhead.
TARGET_PER_VOLUME = 900_000
HARD_LIMIT = 1_010_000

H1_RE = re.compile(r"^# (?!# )(.+)$", re.M)


def pick_split_point(text: str) -> tuple[int, str]:
    """Return (split_index, section_name) — the H1 heading position closest
    to the character midpoint, where Volume 2 begins."""
    midpoint = len(text) // 2
    candidates = []
    for m in H1_RE.finditer(text):
        candidates.append((m.start(), m.group(1).strip()))
    if not candidates:
        raise SystemExit("No H1 sections found — cannot split.")

    # Filter to candidates that produce vol1 <= HARD_LIMIT AND vol2 <= HARD_LIMIT
    valid = [(pos, name) for pos, name in candidates
             if pos <= HARD_LIMIT and (len(text) - pos) <= HARD_LIMIT]
    if not valid:
        # Fall back to closest to midpoint regardless
        valid = candidates

    # Among valid, pick the one closest to midpoint
    best = min(valid, key=lambda x: abs(x[0] - midpoint))
    return best


def main():
    text = BOOK.read_text()
    total = len(text)
    print(f"Total: {total:,} chars")

    split_pos, split_name = pick_split_point(text)
    print(f"Split at: '{split_name}' (position {split_pos:,})")
    print(f"  Volume 1: {split_pos:,} chars")
    print(f"  Volume 2: {total - split_pos:,} chars")

    if split_pos > HARD_LIMIT or (total - split_pos) > HARD_LIMIT:
        raise SystemExit(
            f"ERROR: Best split still exceeds Google Docs limit ({HARD_LIMIT:,}). "
            "Need 3+ volumes."
        )

    vol1_text = text[:split_pos]

    # Volume 2 needs a fresh cover so it stands alone
    vol2_cover = (
        "# Mochary Method Curriculum — Consolidated Edition (Volume 2)\n\n"
        f"_Compiled {date.today().isoformat()}. Continuation of Volume 1, "
        f"starting with the **{split_name}** section._\n\n"
        "_Source curriculum: "
        "https://docs.google.com/document/d/18FiJbYn53fTtPmphfdCKT2TMWH-8Y2L-MLqDk-MFV4s_\n\n"
        "---\n\n"
    )
    vol2_text = vol2_cover + text[split_pos:]

    # Also add a "continued in Volume 2" note at the end of Volume 1
    vol1_text = vol1_text.rstrip() + (
        f"\n\n---\n\n# Continued in Volume 2\n\n"
        f"This volume ends here. Volume 2 begins with the **{split_name}** "
        "section and contains the remaining chapters.\n"
    )

    VOL1.write_text(vol1_text)
    VOL2.write_text(vol2_text)
    print(f"Wrote {VOL1}  ({VOL1.stat().st_size:,} bytes)")
    print(f"Wrote {VOL2}  ({VOL2.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
