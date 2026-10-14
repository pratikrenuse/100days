#!/usr/bin/env python3
"""Assemble all chapter markdown files into one master book.md, preserving
the source curriculum's section structure.

Heading conventions in the assembled book:
  # Section Name           (H1)
  ## Chapter Title         (H2)  -- rewritten from chapter file's "# Title"
  ### / #### subsections   (passed through, with their level bumped by +1 so they
                             never collide with the chapter H2)

The cover page + table of contents are inserted at the top.
"""
import json
import re
from pathlib import Path
from datetime import date

ROOT = Path("/Users/pratikrenuse/Desktop/consolidated_doc")
MANIFEST = ROOT / "manifest.json"
CHAPTERS = ROOT / "chapters"
OUT = ROOT / "book.md"

HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$", re.M)


def bump_headings_within_chapter(body: str) -> str:
    """Inside chapter body, demote every heading by +1 level so the body's #
    becomes ##, etc., capped at H6. This keeps section H1 / chapter H2 as the
    top of the hierarchy."""
    def repl(m):
        pounds, text = m.group(1), m.group(2)
        new = "#" * min(len(pounds) + 1, 6)
        return f"{new} {text}"
    return HEADING_RE.sub(repl, body)


def chapter_anchor(num: int) -> str:
    return f"chapter-{num:03d}"


def main():
    manifest = json.loads(MANIFEST.read_text())

    out = []
    out.append("# Mochary Method Curriculum — Consolidated Edition\n")
    out.append(f"_Compiled {date.today().isoformat()} from the master curriculum "
               f"and its 262 linked sources._\n")
    out.append("\n_Source curriculum: "
               "https://docs.google.com/document/d/18FiJbYn53fTtPmphfdCKT2TMWH-8Y2L-MLqDk-MFV4s_\n\n")

    # Stats
    n_links = sum(1 for it in manifest if it["type"] == "link")
    out.append(f"This book consolidates the full text of {n_links} linked documents "
               "into a single volume, organized by the original curriculum's sections. "
               "A small number of links (typically Notion pages, YouTube videos, and other "
               "non-Google-Docs sources) could not be retrieved and are marked with a "
               "placeholder pointing back to the original URL.\n\n")

    # Table of Contents
    out.append("---\n\n")
    out.append("# Table of Contents\n\n")
    current_section = None
    for item in manifest:
        if item["type"] == "section":
            current_section = item["title"]
            out.append(f"\n**{current_section}**\n\n")
        elif item["type"] == "link":
            num = item["chapter_num"]
            title = item["title"].replace("[", "").replace("]", "")
            indent_dashes = "  " * item.get("indent", 0)
            out.append(f"{indent_dashes}- {num}. {title}\n")
    out.append("\n---\n\n")

    # Body: walk manifest in order, emit section headers and chapter contents
    current_section = None
    preamble_emitted = False
    for item in manifest:
        if item["type"] == "preamble":
            if not preamble_emitted:
                # Only the first preamble before any section becomes the foreword
                out.append("# Foreword\n\n")
                out.append(item["text"] + "\n\n")
                preamble_emitted = True
            continue

        if item["type"] == "section":
            current_section = item["title"]
            out.append(f"\n# {current_section}\n\n")
            continue

        if item["type"] == "link":
            num = item["chapter_num"]
            chapter_path = CHAPTERS / f"{num:03d}.md"
            if not chapter_path.exists():
                out.append(f"## Chapter {num}: {item['title']}\n\n_Missing chapter file._\n\n")
                continue

            raw = chapter_path.read_text()
            # The chapter file starts with `# {title}` then metadata lines then `---` then body
            lines = raw.splitlines()
            # find body start: after the first standalone `---`
            body_start = 0
            for i, ln in enumerate(lines):
                if ln.strip() == "---":
                    body_start = i + 1
                    break
            body = "\n".join(lines[body_start:]).strip()

            # Rewrite the top-level heading to "Chapter N: Title"
            out.append(f"## Chapter {num}: {item['title']}\n\n")
            # Metadata block
            out.append(f"*Source: {item['url']}*  \n")
            if item.get("annotation"):
                out.append(f"*{item['annotation']}*  \n")
            out.append("\n")

            # Demote inner headings so they nest correctly under our H2 chapter
            body = bump_headings_within_chapter(body)
            out.append(body + "\n\n")

            # Visual chapter break
            out.append("\n---\n\n")

    OUT.write_text("".join(out))
    size_kb = OUT.stat().st_size / 1024
    print(f"Wrote {OUT}  ({size_kb:.1f} KB)")

    # Quick sanity
    n_lines = len(OUT.read_text().splitlines())
    print(f"  lines: {n_lines}")


if __name__ == "__main__":
    main()
