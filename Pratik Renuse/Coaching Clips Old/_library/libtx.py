"""Transcribe recordings into the private library.
Usage: python3 libtx.py queue.json OUTDIR file1 [file2 ...]
Each file must be named <queue id>.<ext>. Writes OUTDIR/<folder>/<order>_<id>_<slug>.json and .md
"""
import sys, json, os, re, subprocess, time, numpy as np
from faster_whisper import WhisperModel

FOLDERS = {
    "testimonial": "01_Testimonials",
    "coaching-session": "02_Coaching",
    "mentoring-session": "03_Mentoring_and_advising",
    "talk-or-class": "04_Talks_and_classes",
    "interview-or-media": "04_Talks_and_classes",
    "interview-or-podcast": "04_Talks_and_classes",
    "other": "05_Other_meetings",
}

def slug(s):
    s = re.sub(r"\.[a-z0-9]+$", "", s, flags=re.I)
    return re.sub(r"[^A-Za-z0-9]+", "_", s).strip("_")[:60]

def ts(t):
    t = int(t); return f"{t//3600:02d}:{t%3600//60:02d}:{t%60:02d}" if t >= 3600 else f"{t//60:02d}:{t%60:02d}"

def main():
    q = {str(x["id"]): x for x in json.load(open(sys.argv[1]))}
    out = sys.argv[2]
    m = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=os.cpu_count() or 2)
    for f in sys.argv[3:]:
        qid = os.path.basename(f).split(".")[0]
        it = q[qid]
        t0 = time.time()
        raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-vn", "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
                             capture_output=True).stdout
        if not raw:
            print("NOAUDIO", qid, flush=True); continue
        audio = np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0
        dur = len(audio) / 16000
        segs, info = m.transcribe(audio, word_timestamps=True, vad_filter=True)
        data = {"id": it["id"], "order": it["order"], "file_name": it["file_name"], "page_title": it["page_title"],
                "category": it["category"], "notes": it["notes"], "duration_s": round(dur), "lang": info.language,
                "segments": []}
        for s in segs:
            data["segments"].append({"start": round(s.start, 2), "end": round(s.end, 2), "text": s.text.strip(),
                                     "words": [{"w": w.word, "s": round(w.start, 2), "e": round(w.end, 2)} for w in (s.words or [])]})
        folder = os.path.join(out, FOLDERS.get(it["category"], "05_Other_meetings"))
        os.makedirs(folder, exist_ok=True)
        base = os.path.join(folder, f"{it['order']:03d}_{it['id']}_{slug(it['file_name'])}")
        json.dump(data, open(base + ".json", "w"))
        # readable transcript: paragraphs of ~45 s
        lines = [f"# {it['file_name']}", "",
                 f"- Notion page: {it['page_title']}", f"- Category: {it['category']}",
                 f"- Length: {ts(dur)} · Language: {info.language}", f"- Notes: {it['notes'] or '-'}",
                 "- PRIVATE: internal library, not for publishing as is.", "", "## Transcript", ""]
        para, pstart = [], None
        for s in data["segments"]:
            if pstart is None: pstart = s["start"]
            para.append(s["text"])
            if s["end"] - pstart > 45:
                lines += [f"**[{ts(pstart)}]** " + " ".join(para), ""]; para, pstart = [], None
        if para: lines += [f"**[{ts(pstart)}]** " + " ".join(para), ""]
        open(base + ".md", "w").write("\n".join(lines))
        print("DONE", qid, base, ts(dur), f"{time.time()-t0:.0f}s", flush=True)

main()
