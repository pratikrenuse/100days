#!/usr/bin/env python3
"""Convert volume_1.md and volume_2.md to HTML for upload to Google Drive
(which auto-converts HTML uploads into native Google Docs with real heading
structure, lists, links, etc.).

We use python-markdown with the `extra` and `toc` extensions for the cleanest
Drive import.
"""
import sys
from pathlib import Path

import markdown

ROOT = Path("/Users/pratikrenuse/Desktop/consolidated_doc")

PAIRS = [
    (ROOT / "volume_1.md", ROOT / "volume_1.html"),
    (ROOT / "volume_2.md", ROOT / "volume_2.html"),
]

HTML_SHELL = """<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>{title}</title></head>
<body>
{body}
</body></html>
"""


def main():
    md = markdown.Markdown(extensions=["extra", "sane_lists", "tables", "toc"])
    for src, dst in PAIRS:
        text = src.read_text()
        # Derive a title from the first H1 line
        first_line = text.splitlines()[0]
        title = first_line.lstrip("# ").strip() or src.stem
        body_html = md.convert(text)
        md.reset()
        html = HTML_SHELL.format(title=title, body=body_html)
        dst.write_text(html)
        print(f"  {src.name}  ->  {dst.name}  ({dst.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
