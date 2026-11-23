#!/usr/bin/env python3
"""Render a branded vertical clip (1080x1920) in the pratikrenuse.com / Daily Fuel style.
Usage: python3 render.py job.json
job = {"src","start","end","out","label","hook","sub","transcript": path to whisper json,
       "crop": optional "w:h:x:y" crop of the source before framing, "aspect": optional e.g. 1.777}
"""
import json, subprocess, sys, os, textwrap
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
BG = (246, 242, 241); INK = (26, 21, 18); INK3 = (80, 72, 64); GOLD = (140, 106, 24); RAISED = (229, 221, 215)
FD = "/root/.fonts/"
M = 60                       # side margin
FW = W - 2 * M               # frame width 960

def font(name, size): return ImageFont.truetype(FD + name, size)

def wrap(draw, text, f, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=f) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def background(job, frame_h, path):
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im)
    y = 150
    lab = font("IBMPlexSans-Medium.ttf", 30)
    d.line([(M, y + 18), (M + 56, y + 18)], fill=GOLD, width=3)
    d.text((M + 76, y), job["label"].upper(), font=lab, fill=GOLD, spacing=4)
    y += 80
    hf = font("IBMPlexSerif-Light.ttf", 76)
    for ln in wrap(d, job["hook"], hf, FW)[:3]:
        d.text((M, y), ln, font=hf, fill=INK); y += 92
    y += 14
    sf = font("IBMPlexSans-Regular.ttf", 34)
    for ln in wrap(d, job["sub"], sf, FW)[:2]:
        d.text((M, y), ln, font=sf, fill=INK3); y += 46
    frame_y = max(y + 50, 640)
    # progress track
    bar_y = frame_y + frame_h + 26
    d.rectangle([M, bar_y, M + FW, bar_y + 6], fill=RAISED)
    # footer
    nf = font("IBMPlexSerif-Regular.ttf", 44); uf = font("IBMPlexSans-Medium.ttf", 30)
    d.text((M, H - 190), "Pratik Renuse", font=nf, fill=INK)
    d.text((M, H - 128), "PRATIKRENUSE.COM", font=uf, fill=GOLD)
    im.save(path)
    return frame_y, bar_y

def mask(w, h, r, path):
    m = Image.new("L", (w, h), 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, w - 1, h - 1], r, fill=255); m.save(path)

def ass_time(t):
    t = max(0, t); h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"

def captions(job, top, path):
    tr = json.load(open(job["transcript"]))
    s0, s1 = job["start"], job["end"]
    words = [w for seg in tr["segments"] for w in seg["words"] if w["s"] >= s0 - 0.05 and w["e"] <= s1 + 0.3]
    for w in words: w["s"] -= s0; w["e"] -= s0
    # chunks of up to 5 words, break on sentence end
    chunks, cur = [], []
    for w in words:
        cur.append(w)
        if len(cur) >= 5 or w["w"].strip()[-1:] in ".?!":
            chunks.append(cur); cur = []
    if cur: chunks.append(cur)
    hdr = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: C,IBM Plex Sans SemiBold,64,&H0012151A,&H0012151A,&H00F1F2F6,&H00F1F2F6,0,0,0,0,100,100,0,0,1,0,0,8,{M},{M},{top},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    ev = []
    for ci, ch in enumerate(chunks):
        end_chunk = chunks[ci + 1][0]["s"] if ci + 1 < len(chunks) else ch[-1]["e"] + 0.4
        for wi, w in enumerate(ch):
            st = w["s"]; en = ch[wi + 1]["s"] if wi + 1 < len(ch) else end_chunk
            txt = " ".join(("{\\c&H00186A8C&}" + x["w"].strip() + "{\\c&H0012151A&}") if xi == wi else x["w"].strip() for xi, x in enumerate(ch))
            ev.append(f"Dialogue: 0,{ass_time(st)},{ass_time(en)},C,,0,0,0,,{txt}")
    open(path, "w").write(hdr + "\n".join(ev) + "\n")

def run(job):
    tmp = "/home/claude/vid/tmp"; os.makedirs(tmp, exist_ok=True)
    key = os.path.basename(job["out"]).rsplit(".", 1)[0]
    asp = job.get("aspect", 16 / 9)
    fh = int(round(FW / asp / 2) * 2)
    if fh > 1000: fh = 1000
    bg, mk, ass = f"{tmp}/{key}_bg.png", f"{tmp}/{key}_mask.png", f"{tmp}/{key}.ass"
    fy, by = background(job, fh, bg)
    mask(FW, fh, 28, mk)
    captions(job, by + 60, ass)
    dur = job["end"] - job["start"]
    crop = f"crop={job['crop']}," if job.get("crop") else ""
    fc = (f"[1:v]{crop}scale={FW}:{fh}:force_original_aspect_ratio=increase,crop={FW}:{fh},setsar=1,format=rgba[v];"
          f"[2:v]format=gray,scale={FW}:{fh}[m];[v][m]alphamerge[vr];"
          f"[0:v][vr]overlay={M}:{fy}:shortest=1[b1];"
          f"color=c=0x8C6A18:s={FW}x6:r=30[bar];"
          f"[b1][bar]overlay=x='{M}-{FW}+{FW}*t/{dur:.3f}':y={by}[b2];"
          f"[b2]drawbox=x=0:y={by}:w={M}:h=6:color=0xF6F2F1:t=fill,"
          f"subtitles={ass}:fontsdir=/root/.fonts[out]")
    cmd = ["ffmpeg", "-v", "error", "-y", "-loop", "1", "-framerate", "30", "-i", bg,
           "-ss", str(job["start"]), "-t", f"{dur:.3f}", "-i", job["src"], "-loop", "1", "-i", mk,
           "-filter_complex", fc, "-map", "[out]", "-map", "1:a?", "-t", f"{dur:.3f}",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "30",
           "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", job["out"]]
    subprocess.run(cmd, check=True)
    return job["out"]

if __name__ == "__main__":
    for j in json.load(open(sys.argv[1])):
        print(run(j), flush=True)
