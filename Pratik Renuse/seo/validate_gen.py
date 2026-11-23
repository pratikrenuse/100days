#!/usr/bin/env python3
"""Validate a generated content file against WRITER_SPEC.md. Usage: python3 validate_gen.py file.py"""
import runpy, sys, re
TOPICS = {"ai-marketing","ai-search","growth-from-zero","marketing-leadership","events-and-speaking","founder-mentoring","career-growth","performance-marketing"}
KINDS = {"TEDx talk","Keynote","Workshop","Masterclass","Guest lecture","Course module","Build night","Mentor session","Webinar"}
errs = []
def strings(o):
    if isinstance(o, str): yield o
    elif isinstance(o, dict):
        for v in o.values(): yield from strings(v)
    elif isinstance(o, (list, tuple)):
        for v in o: yield from strings(v)
def wc(s): return len(s.split())
def need(d, keys, label):
    for k in keys:
        if k not in d: errs.append(f"{label}: missing {k}")
def body_ok(b, label):
    for block in b.strip().split("\n\n"):
        lines = [l for l in block.split("\n") if l.strip()]
        if lines and lines[0].startswith("## "): lines = lines[1:]
        if lines and any(l.startswith("- ") for l in lines) and not all(l.startswith("- ") for l in lines):
            errs.append(f"{label}: block mixes bullets and text: {lines[0][:50]}")
        if re.search(r"\*\*|\[.+\]\(", block): errs.append(f"{label}: markdown bold/links not allowed")
ns = runpy.run_path(sys.argv[1])
seen = set()
for name in ("ANSWERS_EXTRA","PLAYBOOKS_EXTRA","CASES","TALKS"):
    for i, d in enumerate(ns.get(name, [])):
        label = f"{name}[{i}] {d.get('slug','?')}"
        s = d.get("slug","")
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", s): errs.append(f"{label}: bad slug")
        if (name, s) in seen: errs.append(f"{label}: duplicate slug")
        seen.add((name, s))
        for t in strings(d):
            if "—" in t or "–" in t: errs.append(f"{label}: em/en dash"); break
        if "short" in d and not (35 <= wc(d["short"]) <= 110): errs.append(f"{label}: short is {wc(d['short'])} words")
        if name == "ANSWERS_EXTRA":
            need(d, ["slug","topic","q","short","body","related"], label)
            if d.get("topic") not in TOPICS: errs.append(f"{label}: bad topic")
            body_ok(d.get("body",""), label)
            if wc(d.get("body","")) < 200: errs.append(f"{label}: body too short")
        if name == "PLAYBOOKS_EXTRA":
            need(d, ["slug","title","desc","who","time","tools","short","steps","pitfalls","related_answers","proof","proof_link"], label)
            if len(d.get("desc","")) > 160: errs.append(f"{label}: desc over 160")
            st = d.get("steps", [])
            if not (4 <= len(st) <= 10) or not all(isinstance(x,(list,tuple)) and len(x)==2 for x in st): errs.append(f"{label}: steps must be 4-10 [name,text] pairs")
        if name == "CASES":
            need(d, ["slug","company","title","desc","industry","country","years","role","short","challenge","what_i_did","results","lessons","testimonial","related_answers","related_playbooks"], label)
            if len(d.get("desc","")) > 160: errs.append(f"{label}: desc over 160")
            body_ok(d.get("lessons",""), label)
        if name == "TALKS":
            need(d, ["slug","title","event","organiser","kind","city","country","date","online","audience","short","body","media_url","existing_page"], label)
            if d.get("kind") not in KINDS: errs.append(f"{label}: bad kind")
            if d.get("date","") != "" and not re.fullmatch(r"\d{4}(-\d{2}(-\d{2})?)?", str(d.get("date",""))): errs.append(f"{label}: bad date")
            body_ok(d.get("body",""), label)
print("\n".join(errs) if errs else f"OK: " + ", ".join(f"{k}={len(ns.get(k,[]))}" for k in ("ANSWERS_EXTRA","PLAYBOOKS_EXTRA","CASES","TALKS")))
sys.exit(1 if errs else 0)
