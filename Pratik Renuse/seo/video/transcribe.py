import sys, json, subprocess, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=2)
for f in sys.argv[1:]:
    raw = subprocess.run(["ffmpeg","-v","error","-i",f,"-ac","1","-ar","16000","-f","s16le","-"],capture_output=True,check=True).stdout
    audio = np.frombuffer(raw, np.int16).astype(np.float32)/32768.0
    segs, info = m.transcribe(audio, word_timestamps=True, vad_filter=True)
    out = {"lang": info.language, "segments": []}
    for s in segs:
        out["segments"].append({"start": s.start, "end": s.end, "text": s.text.strip(),
            "words": [{"w": w.word, "s": w.start, "e": w.end} for w in (s.words or [])]})
    json.dump(out, open(f.rsplit(".",1)[0] + ".json", "w"))
    print("done", f, info.language, len(out["segments"]), flush=True)
