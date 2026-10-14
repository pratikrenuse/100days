#!/usr/bin/env python3
"""Parse the Mochary Method curriculum source doc into a structured manifest.

Output: manifest.json - list of items in source order:
  { "type": "section", "title": "..." }
  { "type": "preamble", "text": "..." }
  { "type": "link", "title": "...", "url": "...", "indent": 0, "annotation": "(3 min to read)" }
"""
import json
import re
from pathlib import Path

SRC = Path("/Users/pratikrenuse/Desktop/consolidated_doc/source.txt")
OUT = Path("/Users/pratikrenuse/Desktop/consolidated_doc/manifest.json")

# Match [title](url) — allow nested parens in URL by matching balanced or simple
LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")

def main():
    lines = SRC.read_text().splitlines()
    manifest = []
    seen_urls = set()  # for dedup
    preamble_buf = []
    in_preamble = True

    for raw in lines:
        line = raw.rstrip()
        if not line.strip():
            continue

        # Heading?
        h = HEADING_RE.match(line.strip())
        if h:
            in_preamble = False
            # flush preamble
            if preamble_buf:
                manifest.append({"type": "preamble", "text": "\n".join(preamble_buf).strip()})
                preamble_buf = []
            manifest.append({
                "type": "section",
                "level": len(h.group(1)),
                "title": h.group(2).strip(),
            })
            continue

        # Compute indent (number of leading spaces / 4, capped)
        leading = len(line) - len(line.lstrip(" "))
        indent = leading // 4

        # Find all links on the line
        links = LINK_RE.findall(line)
        if not links:
            if in_preamble:
                preamble_buf.append(line.strip())
            continue

        # The first link on a bullet line is the "main" link; subsequent links on the same
        # bullet are usually inline cross-refs and should be ignored for chapter extraction.
        # Heuristic: take only the first link per line, EXCEPT if the line is "or [X] or [Y]" style.
        # Simplest robust approach: take the first link; downstream we'll de-dup by URL anyway.
        for i, (title, url) in enumerate(links):
            # Strip URL anchors and tracking that don't change identity
            url_clean = url.split("#")[0]
            # Normalize Google Docs URLs to canonical /edit form keyed on doc ID
            gdoc = re.match(r"^(https://docs\.google\.com/document/d/[A-Za-z0-9_-]+)", url_clean)
            key = gdoc.group(1) if gdoc else url_clean.rstrip("/")
            if key in seen_urls:
                continue
            seen_urls.add(key)

            # Extract trailing annotation after the FIRST link's closing paren on this line
            if i == 0:
                # find position of first link end
                m = LINK_RE.search(line)
                after = line[m.end():].strip()
                # Strip leading punctuation
                after = re.sub(r"^[\s\*:•—-]+", "", after)
                # Truncate at next link if any
                next_m = LINK_RE.search(after)
                if next_m:
                    after = after[:next_m.start()].strip()
                annotation = after[:160]
            else:
                annotation = ""

            manifest.append({
                "type": "link",
                "title": title.strip(),
                "url": url,
                "doc_id": gdoc.group(1).rsplit("/", 1)[-1] if gdoc else None,
                "indent": indent,
                "annotation": annotation,
            })

    if preamble_buf:
        manifest.append({"type": "preamble", "text": "\n".join(preamble_buf).strip()})

    OUT.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    n_links = sum(1 for m in manifest if m["type"] == "link")
    n_gdocs = sum(1 for m in manifest if m["type"] == "link" and m.get("doc_id"))
    n_sections = sum(1 for m in manifest if m["type"] == "section")
    print(f"Wrote {OUT}")
    print(f"  sections: {n_sections}")
    print(f"  links:    {n_links}")
    print(f"  gdocs:    {n_gdocs}")
    print(f"  other:    {n_links - n_gdocs}")

if __name__ == "__main__":
    main()
