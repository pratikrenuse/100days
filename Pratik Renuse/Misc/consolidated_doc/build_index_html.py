#!/usr/bin/env python3
"""Build a small, self-contained INDEX html doc for upload to Google Drive as
the master Table-of-Contents Google Doc.

It contains:
  - Cover + summary
  - Stats (sourced, inaccessible)
  - Step-by-step instructions for opening the volume HTML files as Google Docs
  - Full TOC of all 262 chapters with the source URL beside each
  - Appendix: list of inaccessible sources

It does NOT contain the chapter bodies — those live in volume_1.html and
volume_2.html in the synced Drive folder.
"""
import json
from pathlib import Path
from datetime import date
from html import escape

ROOT = Path("/Users/pratikrenuse/Desktop/consolidated_doc")
MANIFEST = ROOT / "manifest.json"
OUT = ROOT / "index.html"


def main():
    manifest = json.loads(MANIFEST.read_text())

    # Read log files to determine accessibility per chapter
    status_by_chapter: dict[int, str] = {}
    for log in sorted((ROOT / "logs").glob("batch_*.log")):
        for line in log.read_text().splitlines():
            parts = line.strip().split(maxsplit=3)
            if len(parts) >= 2 and parts[0].isdigit():
                status_by_chapter[int(parts[0])] = parts[1]

    out = ['<!DOCTYPE html>', '<html><head><meta charset="utf-8">',
           '<title>Mochary Method Curriculum — Master Index</title>',
           '</head><body>']

    out.append("<h1>Mochary Method Curriculum — Consolidated Edition</h1>")
    out.append(f"<p><em>Master Index &middot; Compiled {date.today().isoformat()}</em></p>")

    out.append("<p>This index covers the full Mochary Method Curriculum and the 262 documents it links to, "
               "consolidated into a single book. Because Google Docs has a hard limit of ~1.02M characters per "
               "document, the full text is split into two volumes that live as HTML files in your Drive folder. "
               "Each opens as a Google Doc with one click.</p>")

    # Stats
    total = len(status_by_chapter)
    ok = sum(1 for s in status_by_chapter.values() if s == "OK")
    inacc = total - ok
    out.append("<h2>What's inside</h2>")
    out.append("<ul>")
    out.append(f"<li><strong>{total}</strong> linked sources from the master curriculum</li>")
    out.append(f"<li><strong>{ok}</strong> were retrieved and their full text is in Volume 1 + Volume 2 below</li>")
    out.append(f"<li><strong>{inacc}</strong> could not be retrieved automatically (mostly Notion, YouTube, "
               "Loom, and other non-Google-Docs sources). They're listed in the Appendix with their original URLs "
               "so you can open them manually.</li>")
    out.append("</ul>")

    # Instructions
    out.append("<h2>How to read this as Google Docs</h2>")
    out.append("<ol>")
    out.append("<li>Open your Google Drive and go to <strong>My Drive &raquo; Mochary Method Consolidated</strong>.</li>")
    out.append("<li>Right-click <code>volume_1.html</code> &raquo; <strong>Open with</strong> &raquo; <strong>Google Docs</strong>. "
               "Drive automatically converts the HTML into a native Google Doc with proper headings, lists, and the "
               "full table of contents. Save the converted doc.</li>")
    out.append("<li>Repeat for <code>volume_2.html</code>.</li>")
    out.append("</ol>")
    out.append("<p><strong>Why two volumes?</strong> Google Docs has a ~1.02M character ceiling per file. "
               "The full book is ~1.43M characters, so it has to be split. The break is at a clean section boundary "
               "(end of section just before <em>Remote work</em>), so Volume 1 covers the foundational sections and "
               "Volume 2 covers the topical/role-specific sections.</p>")

    # File list
    out.append("<h2>Files in your Drive folder</h2>")
    out.append("<ul>")
    out.append("<li><code>volume_1.html</code> &mdash; Foreword, First-time Onboarding, Essential Reading, Further Reading, All of the reading in one place (~783 KB)</li>")
    out.append("<li><code>volume_2.html</code> &mdash; Remote work, Relationship-building, Hiring, Mindfulness, Individual productivity, Health, Team Productivity, CEO role, COO/Exec Ops, Board, Product, Engineering, Marketing, Sales, Feedback, Communication, Fundraising, Legal, For Executives, Coach, Social Good, Matt in action, FAQ, Blog Posts, 1-1 meeting format (~647 KB)</li>")
    out.append("<li><code>Mochary Method Curriculum - Full Book.md</code> &mdash; the entire consolidated book in markdown (single file, opens in any editor; ~1.4 MB)</li>")
    out.append("<li><code>volume_1.md</code> / <code>volume_2.md</code> &mdash; the same two-volume split, as markdown</li>")
    out.append("</ul>")

    # Full TOC
    out.append("<h2>Full Table of Contents</h2>")
    current_section = None
    for item in manifest:
        if item["type"] == "section":
            current_section = item["title"]
            out.append(f"<h3>{escape(current_section)}</h3>")
            out.append("<ol>")
            # Need to close <ol> later — track open state
            # Simpler: re-open per section, close before next section
        elif item["type"] == "link":
            num = item["chapter_num"]
            title = escape(item["title"])
            url = escape(item["url"])
            status = status_by_chapter.get(num, "?")
            marker = "" if status == "OK" else " &nbsp;<em>(inaccessible — source link only)</em>"
            ann = escape(item.get("annotation", ""))
            ann_html = f" <em>{ann}</em>" if ann else ""
            out.append(f'<li>Chapter {num}: <a href="{url}">{title}</a>{ann_html}{marker}</li>')

    # Inaccessible appendix
    out.append("<h2>Appendix: sources that couldn't be retrieved automatically</h2>")
    out.append("<p>These links are in the curriculum but the sandbox could not fetch them (typically Notion pages, "
               "YouTube videos, Loom recordings, and external blog posts). The original URLs are below — open them "
               "directly in your browser.</p>")
    out.append("<ol>")
    for item in manifest:
        if item["type"] != "link":
            continue
        num = item["chapter_num"]
        if status_by_chapter.get(num) == "OK":
            continue
        title = escape(item["title"])
        url = escape(item["url"])
        out.append(f'<li>Chapter {num}: <a href="{url}">{title}</a> &mdash; {url}</li>')
    out.append("</ol>")

    out.append("</body></html>")
    html = "\n".join(out)
    OUT.write_text(html)
    print(f"Wrote {OUT}  ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
