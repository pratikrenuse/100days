# Coaching Clips batch run (scheduled)

You are making branded vertical clips from Pratik Renuse's Notion recordings. Work fully on your own; never publish anything anywhere. Output goes only to his Mac folder "Documents/GitHub/Coaching Clips".

## Rules (Pratik's decisions, 23 Nov 2026)
- Coachees and founders may appear on screen. Use FIRST NAME ONLY for any other person. No surnames, companies, schools, cities or personal details in the label, hook or file name.
- Never use: mental health or deeply personal moments, anything about health, money, family or relationships, anyone who seems under 18, admissions interviews, Techstars "do not share" material, other founders' pitches. If a session is mostly that, mark it "skip-private" in the queue and move on.
- Clips are 20 to 60 seconds, one complete idea each, starting and ending on sentence boundaries. Prefer Pratik giving a clear piece of advice, a framework, a story, or a coachee/founder describing a result. 2 to 5 clips per recording; 0 if nothing is good.
- Copy style: plain English, no em dashes, no hype. Hook headline max 9 words. Label like "Coaching sessions · No. 07", "Founder mentoring · No. 12", "From the stage · No. 03", "What founders say · No. 05". Sub line like "Coaching session with Ana" or "Mentoring a fintech founder".

## Steps
1. Stage these from the Mac (device_stage_files): Documents/GitHub/100days/Pratik Renuse/seo/video/{render.py,transcribe.py,pick.py,queue.json,progress.json}.
2. Setup in the container: `pip install --break-system-packages -q faster-whisper fonttools brotli`; fonts: `npm pack @ibm/plex-serif @ibm/plex-sans`, extract, convert IBMPlexSerif-{Light,Regular,Medium} and IBMPlexSans-{Regular,Medium,SemiBold} woff2 to ttf into ~/.fonts (fontTools, flavor=None), `fc-cache -f`. Copy render.py, transcribe.py, pick.py into /home/claude/vid (render.py expects /home/claude/vid/tmp and fonts in /root/.fonts; adjust FD path if HOME differs).
3. Take the next 2 queue items with status "todo" in "order". For each: get a fresh signed URL with Notion get-file-download-urls (file_ref), download immediately with curl (URLs expire in 5 minutes), run `python3 transcribe.py file` (writes file.json with word timings; uses ffmpeg to decode).
4. Read the transcript, look at 2 frames (ffmpeg -ss N -frames:v 1) to see the layout. If it is a split-screen call, set "crop" to the tile of the person speaking in each clip (w:h:x:y in source pixels) and "aspect" to w/h. Pick clips with pick.py word_at/end_at, write a jobs json, run `python3 render.py jobs.json`. Output names: NNN_<Category>_<FirstName or topic>.mp4 with NNN continuing from progress.json "next_number".
5. Check one frame of every rendered clip (no overflow, captions readable). Then device_commit_files each mp4 to /Users/pratikrenuse/Documents/GitHub/Coaching Clips/<file name> (max 50 per call).
6. Update queue.json (status done / skip-private / skip-nothing-good / failed with reason) and progress.json (next_number, clips made, last run time, a one line log per recording with the clip titles) and commit both back to Documents/GitHub/100days/Pratik Renuse/seo/video/.
7. Finish with a 3 line summary: recordings processed, clips made, anything skipped and why.
