#!/usr/bin/env python3
"""Build a lightweight index doc (~5-10KB) that fits in a single create_file
tool call. The full TOC already lives at the start of volume_1.html — no need
to duplicate it here.
"""
import json
from pathlib import Path
from datetime import date

ROOT = Path("/Users/pratikrenuse/Desktop/consolidated_doc")
MANIFEST = ROOT / "manifest.json"
OUT = ROOT / "index_lite.html"

manifest = json.loads(MANIFEST.read_text())

# Read logs for OK / INACCESSIBLE counts
status_by_chapter = {}
for log in sorted((ROOT / "logs").glob("batch_*.log")):
    for line in log.read_text().splitlines():
        parts = line.strip().split(maxsplit=3)
        if len(parts) >= 2 and parts[0].isdigit():
            status_by_chapter[int(parts[0])] = parts[1]

total = len(status_by_chapter)
ok = sum(1 for s in status_by_chapter.values() if s == "OK")
inacc = total - ok

# Build a section-level overview (no per-chapter detail)
sections = []
current = None
for item in manifest:
    if item["type"] == "section":
        current = {"title": item["title"], "count": 0, "inacc": 0}
        sections.append(current)
    elif item["type"] == "link" and current is not None:
        current["count"] += 1
        if status_by_chapter.get(item["chapter_num"]) != "OK":
            current["inacc"] += 1

html = f"""<!DOCTYPE html>
<html><head><meta charset="utf-8">
<title>Mochary Method Curriculum — Master Index</title>
</head><body>
<h1>Mochary Method Curriculum — Consolidated Edition</h1>
<p><em>Master Index &middot; Compiled {date.today().isoformat()}</em></p>

<p>This index points to the consolidated edition of the Mochary Method Curriculum
and all {total} documents it links to.</p>

<h2>What was consolidated</h2>
<ul>
<li><strong>{total}</strong> source documents linked from the master curriculum</li>
<li><strong>{ok}</strong> ({ok*100//total}%) were successfully retrieved and their full text
    is in the volume files below</li>
<li><strong>{inacc}</strong> ({inacc*100//total}%) could not be retrieved automatically
    &mdash; mostly Notion pages, YouTube videos, Loom recordings, and external blog posts
    that the sandbox tooling couldn't reach. Each appears in the volumes as a stub with
    the original URL, so you can still click through.</li>
</ul>

<h2>How to read this as Google Docs</h2>
<p>Because Google Docs has a hard limit of ~1.02M characters per document, the full
book (1.43M characters) is split into two volumes. Both live as HTML files in your
Google Drive folder <strong>My Drive &raquo; Mochary Method Consolidated</strong>:</p>
<ol>
<li>Open Google Drive in your browser.</li>
<li>Navigate to <strong>My Drive &raquo; Mochary Method Consolidated</strong>.</li>
<li>Right-click <code>volume_1.html</code> &raquo; <strong>Open with</strong> &raquo;
<strong>Google Docs</strong>. Drive converts the HTML into a native Google Doc with
proper headings, lists, and links. Save the converted doc.</li>
<li>Repeat for <code>volume_2.html</code>.</li>
</ol>

<h2>The two volumes</h2>
<p><strong>Volume 1</strong> &mdash; foundational sections of the curriculum
(~783 KB, ~450 pages):</p>
<ul>
"""

# First half sections (Volume 1) — everything up to but not including "Remote work"
in_vol1 = True
for s in sections:
    if s["title"] == "Remote work":
        in_vol1 = False
    if in_vol1:
        ok_in = s["count"] - s["inacc"]
        html += f"<li>{s['title']} &mdash; {s['count']} chapters ({ok_in} retrieved)</li>\n"

html += "</ul>\n<p><strong>Volume 2</strong> &mdash; topical and role-specific sections (~647 KB, ~350 pages):</p>\n<ul>\n"

in_vol2 = False
for s in sections:
    if s["title"] == "Remote work":
        in_vol2 = True
    if in_vol2:
        ok_in = s["count"] - s["inacc"]
        html += f"<li>{s['title']} &mdash; {s['count']} chapters ({ok_in} retrieved)</li>\n"

html += f"""</ul>

<h2>Each volume contains</h2>
<ul>
<li>A cover page with metadata</li>
<li>A complete table of contents listing every chapter in the original curriculum's order</li>
<li>The full text of every retrieved chapter, with the source URL at the top of each</li>
<li>For each inaccessible chapter, a stub with the original URL so you can open it manually</li>
</ul>

<h2>Other files in the folder</h2>
<ul>
<li><code>Mochary Method Curriculum - Full Book.md</code> &mdash; the entire 1.4 MB
consolidated book as a single markdown file (open in any text editor or markdown viewer)</li>
<li><code>volume_1.md</code> / <code>volume_2.md</code> &mdash; the same two-volume split
as markdown source</li>
<li><code>volume_1.html</code> / <code>volume_2.html</code> &mdash; the HTML files to
"Open with Google Docs" as described above</li>
</ul>

<h2>Source curriculum</h2>
<p><a href="https://docs.google.com/document/d/18FiJbYn53fTtPmphfdCKT2TMWH-8Y2L-MLqDk-MFV4s/edit">
Original Mochary Method Curriculum master doc</a></p>

</body></html>
"""

OUT.write_text(html)
print(f"Wrote {OUT}  ({OUT.stat().st_size:,} bytes)")
