#!/usr/bin/env python3
"""Builds the /answers and /playbooks sections of pratikrenuse.com, plus sitemap.xml and llms.txt.

Run:  python3 build.py <repo_root>
Writes static HTML into <repo_root>/answers and <repo_root>/playbooks, and rewrites
<repo_root>/sitemap.xml and <repo_root>/llms.txt. Content lives in content_answers.py and
content_playbooks.py next to this file. Add a dict there and rerun to publish a new page.
"""
import html, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from content_answers import ANSWERS, TOPICS
from content_playbooks import PLAYBOOKS
import glob, runpy
CASES, TALKS, TESTIMONIALS, TESTIMONIAL_GROUPS = [], [], [], []
_gen = sorted(glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)), "gen", "*.py")))
_rewrites = {}
for _f in _gen:
    _ns = runpy.run_path(_f)
    ANSWERS = ANSWERS + list(_ns.get("ANSWERS_EXTRA", []))
    PLAYBOOKS = PLAYBOOKS + list(_ns.get("PLAYBOOKS_EXTRA", []))
    CASES += list(_ns.get("CASES", []))
    TALKS += list(_ns.get("TALKS", []))
    TESTIMONIALS += list(_ns.get("TESTIMONIALS", []))
    TESTIMONIAL_GROUPS += list(_ns.get("TESTIMONIAL_GROUPS", []))
    for _r in _ns.get("ANSWERS_REWRITE", []): _rewrites[_r["slug"]] = _r
DROP = {"how-to-test-a-startup-idea-before-scaling-marketing"}
ANSWERS = [_rewrites.get(a["slug"], a) for a in ANSWERS if a["slug"] not in DROP]
TOPICS.update({
    "founder-mentoring": ("Questions founders ask me", "Real questions founders brought to my mentoring sessions at Techstars, Seedstars and Newchip, with the advice I gave."),
    "performance-marketing": ("Performance marketing", "Paid search, paid social, conversion and the numbers behind them."),
    "career-growth": ("Careers in growth", "For graduates and professionals choosing, testing and growing a career in marketing and growth."),
})

SITE = "https://www.pratikrenuse.com"
UPDATED = "2026-11-23"
UPDATED_TXT = "23 November 2026"
OG_IMG = SITE + "/speaking/media/headshot-suit.jpg"
LINKEDIN = "https://www.linkedin.com/in/pratikrenuse/"
TEDX = "https://www.youtube.com/watch?v=kQVNTK8MWZg"

# Static pages that already exist on the site (kept in the sitemap).
STATIC_PAGES = [
    ("/", "1.0"), ("/consulting/", "0.9"), ("/advising/", "0.9"), ("/coaching/", "0.8"),
    ("/teaching/", "0.8"), ("/speaking/", "0.9"), ("/speaking/claude-101/", "0.7"),
    ("/speaking/coditas-deployed/", "0.6"), ("/speaking/builders-night-out/", "0.6"),
    ("/wallpapers/", "0.5"), ("/schedule/", "0.5"),
]

PERSON = {
    "@type": "Person", "@id": SITE + "/#person", "name": "Pratik Renuse", "url": SITE + "/",
    "jobTitle": "Growth marketing leader, TEDx speaker and startup mentor",
    "image": OG_IMG,
    "sameAs": [LINKEDIN, TEDX],
    "knowsAbout": ["Growth marketing", "AI in marketing", "Answer engine optimization",
                   "D2C go-to-market", "Kickstarter campaigns", "Startup mentoring"],
}

def esc(s): return html.escape(s, quote=True)

def md(body):
    """Tiny markup to HTML: '## ' -> h2, '- ' lines -> ul, blank-line paragraphs."""
    out = []
    for block in body.strip().split("\n\n"):
        lines = [l for l in block.strip().split("\n") if l.strip()]
        if not lines: continue
        if lines[0].startswith("## "):
            out.append(f"<h2>{esc(lines[0][3:].strip())}</h2>")
            lines = lines[1:]
            if not lines: continue
        if all(l.startswith("- ") for l in lines):
            out.append("<ul>" + "".join(f"<li>{esc(l[2:].strip())}</li>" for l in lines) + "</ul>")
        else:
            out.append(f"<p>{esc(' '.join(lines))}</p>")
    return "\n".join(out)

def words(s): return len(re.sub(r"<[^>]+>", " ", s).split())

CSS = """
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F6F2F1;--surface:#EEE8E4;--raised:#E5DDD7;--border:#D0C8C0;--border2:#BCB3AA;--ink:#1A1512;--ink2:#38302A;--ink3:#504840;--ink4:#786E66;--gold:#8C6A18;--gold-mid:#B8903A;--gold-bg:#F0E4C4;--dark:#0F0E0C;--serif:'IBM Plex Serif',Georgia,serif;--sans:'IBM Plex Sans',system-ui,sans-serif;font-size:18px}
body{background:var(--bg);color:var(--ink2);font-family:var(--sans);font-weight:400;line-height:1.65;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
p{max-width:65ch;margin:0 0 1.15rem}
a{color:inherit}
nav.top{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:1rem 4rem;border-bottom:1px solid var(--border);background:rgba(246,242,241,0.95);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}
.nav-logo{font-family:var(--serif);font-size:1.05rem;color:var(--ink);text-decoration:none;white-space:nowrap}
.nav-logo span{color:var(--gold)}
.nav-menu{display:flex;align-items:center;gap:0.25rem}
.nav-menu a{font-size:0.66rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink3);text-decoration:none;padding:0.85rem 0.55rem;transition:color .2s}
.nav-menu a:hover,.nav-menu a[aria-current="page"]{color:var(--gold)}
.nav-menu a.nav-cta{color:var(--bg);background:var(--ink);font-weight:500;padding:0.8rem 1.1rem;margin-left:0.75rem;letter-spacing:0.15em}
.nav-menu a.nav-cta:hover{background:var(--gold)}
.nav-toggle{display:none;background:none;border:1px solid var(--border2);font-family:var(--sans);font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--ink);padding:0 1rem;min-height:44px;cursor:pointer}
.wrap{max-width:76rem;margin:0 auto;padding:0 4rem}
.lbl{display:flex;align-items:center;gap:0.75rem;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:1.25rem}
.lbl::before{content:'';width:2rem;height:1px;background:var(--gold)}
.lbl a{text-decoration:none}
h1,h2,h3{font-family:var(--serif);color:var(--ink);line-height:1.2}
.crumbs{font-size:0.75rem;color:var(--ink4);padding:2rem 0 0}
.crumbs a{color:var(--ink4);text-decoration:none}
.crumbs a:hover{color:var(--gold)}
.page{display:grid;grid-template-columns:minmax(0,1fr) 18rem;gap:4rem;padding:2.5rem 0 5rem}
.page h1{font-size:2.6rem;font-weight:300;letter-spacing:-0.01em;margin-bottom:1rem;max-width:24ch}
.byline{font-size:0.8rem;color:var(--ink4);margin-bottom:2rem}
.byline a{color:var(--ink3)}
.short{background:var(--surface);padding:2rem;margin:0 0 2.5rem;border-left:2px solid var(--gold);max-width:44rem}
.short .k{font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:0.6rem}
.short p{font-size:1.05rem;color:var(--ink);margin:0}
.body h2{font-size:1.5rem;font-weight:400;margin:2.5rem 0 0.9rem}
.body ul,.body ol{margin:0 0 1.15rem 1.2rem;max-width:62ch}
.body li{margin-bottom:0.45rem}
.body ol.steps{list-style:none;margin-left:0;counter-reset:s}
.body ol.steps li{counter-increment:s;position:relative;padding:0 0 1.5rem 3.2rem;margin:0}
.body ol.steps li::before{content:counter(s);position:absolute;left:0;top:0;width:2.1rem;height:2.1rem;border:1px solid var(--gold);color:var(--gold);font-family:var(--serif);display:flex;align-items:center;justify-content:center;font-size:0.95rem}
.body ol.steps h3{font-size:1.15rem;font-weight:500;margin-bottom:0.35rem}
.meta{display:flex;flex-wrap:wrap;gap:0.5rem 2rem;font-size:0.85rem;color:var(--ink3);margin:0 0 2rem}
.meta b{color:var(--ink);font-weight:500}
aside .card{background:var(--surface);padding:2rem;margin-bottom:1.5rem}
aside h3{font-size:1.05rem;font-weight:500;margin-bottom:0.75rem}
aside p{font-size:0.9rem;color:var(--ink3)}
aside ul{list-style:none}
aside li{margin-bottom:0.8rem;font-size:0.9rem;line-height:1.45}
aside li a{text-decoration:none;color:var(--ink2)}
aside li a:hover{color:var(--gold)}
.btn{display:inline-flex;align-items:center;gap:0.6rem;min-height:48px;padding:0.9rem 1.5rem;font-family:var(--sans);font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;font-weight:500;text-decoration:none;border:none;cursor:pointer;transition:background .2s}
.btn-dark{background:var(--ink);color:var(--bg)}
.btn-dark:hover{background:var(--gold)}
.hub-hero{padding:3rem 0 2rem}
.hub-hero h1{font-size:3rem;font-weight:300;letter-spacing:-0.02em;margin-bottom:1rem;max-width:22ch}
.hub-hero p{font-size:1.1rem;color:var(--ink3);max-width:38rem}
.topic{padding:2.5rem 0;border-top:1px solid var(--border)}
.topic h2{font-size:1.7rem;font-weight:300;margin-bottom:0.4rem}
.topic>p{color:var(--ink3);margin-bottom:1.5rem}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}
.grid a{display:block;background:var(--surface);padding:1.5rem 2rem;text-decoration:none;color:var(--ink);font-family:var(--serif);font-size:1.1rem;line-height:1.35;transition:background .2s}
.grid a:hover{background:var(--raised)}
.grid a span{display:block;font-family:var(--sans);font-size:0.85rem;color:var(--ink3);margin-top:0.5rem;line-height:1.5}
.cta{background:var(--surface);padding:4rem 0;border-top:1px solid var(--border)}
.cta-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
.cta h2{font-size:2rem;font-weight:300;margin-bottom:1rem}
.cta .lead{color:var(--ink3)}
form label{display:block;font-size:0.8rem;color:var(--ink3);margin:0 0 0.35rem}
form input,form textarea,form select{width:100%;background:var(--bg);border:1px solid var(--border);padding:0.8rem 1rem;font-family:var(--sans);font-size:1rem;color:var(--ink);margin-bottom:1rem;min-height:48px}
form textarea{min-height:7rem;resize:vertical}
form input:focus,form textarea:focus,form select:focus{outline:none;border-color:var(--gold)}
.err{display:none;font-size:0.8rem;color:#9A3412;margin:-0.6rem 0 0.8rem}
.err.on{display:block}
.ok{display:none;background:var(--bg);padding:2rem;border:1px solid var(--border)}
.ok h3{font-size:1.5rem;font-weight:300;margin-bottom:0.6rem}
.tq{background:var(--surface);padding:2rem;margin:2rem 0;max-width:44rem}.tq p{font-family:var(--serif);font-size:1.15rem;color:var(--ink)}.tq cite{font-style:normal;font-size:0.85rem;color:var(--ink3)}.tq cite a{color:var(--ink3)}.tq .src{display:inline-block;margin-left:0.5rem;font-size:0.62rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold)}.tq-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.tq-grid .tq{margin:0;max-width:none}
footer{padding:1.25rem 4rem;border-top:1px solid #2A2522;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;color:#A89E94;background:var(--dark)}
footer nav{display:flex;gap:1.5rem;flex-wrap:wrap}
footer a{color:#C8C0B8;text-decoration:none;padding:0.5rem 0}
footer a:hover{color:var(--gold-mid)}
@media (max-width:1260px){
nav.top{padding:0.75rem 1.25rem;flex-wrap:wrap}
.nav-toggle{display:inline-flex;align-items:center}
.nav-menu{display:none;flex-direction:column;align-items:stretch;width:100%;gap:0;padding:0.5rem 0 1rem}
.nav-menu.open{display:flex}
.nav-menu a{padding:0.9rem 0.25rem;border-bottom:1px solid var(--border);font-size:0.78rem}
.nav-menu a.nav-cta{margin:0.75rem 0 0;text-align:center}
}
@media (max-width:960px){nav.top{padding:0.75rem 1.25rem}}
@media (max-width:960px){
:root{font-size:17px}
.wrap{padding:0 1.25rem}
.page{grid-template-columns:1fr;gap:2rem;padding-bottom:3rem}
.page h1,.hub-hero h1{font-size:2.1rem}
.grid,.cta-grid,.tq-grid{grid-template-columns:1fr;gap:2rem}
.short{padding:1.5rem}
footer{padding:1.25rem;flex-direction:column;align-items:flex-start}
}
@media (max-width:480px){:root{font-size:16px}.page h1,.hub-hero h1{font-size:1.8rem}.grid a{padding:1.25rem 1.5rem}}
"""

ANALYTICS = """<script async src="https://www.googletagmanager.com/gtag/js?id=G-K5BP5TE71L"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-K5BP5TE71L');</script>
<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wtfjq58y0n");</script>"""

def head(title, desc, path, schema, og_type="article"):
    url = SITE + path
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">
<meta name="author" content="Pratik Renuse">
<meta property="og:type" content="{og_type}">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{OG_IMG}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;0,400;0,500;1,300&family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet">
{ANALYTICS}
<script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>
<style>{CSS}</style>
</head>
<body>
"""

def nav(current):
    items = [("/consulting/", "Consulting"), ("/advising/", "Advising"), ("/coaching/", "Coaching"),
             ("/teaching/", "Teaching"), ("/speaking/", "Speaking"), ("/work/", "Work"), ("/answers/", "Answers"),
             ("/playbooks/", "Playbooks")]
    links = "".join(f'<a href="{h}"{" aria-current=\"page\"" if h == current else ""}>{t}</a>' for h, t in items)
    return f"""<nav class="top" aria-label="Main">
  <a href="/" class="nav-logo">Pratik <span>Renuse</span></a>
  <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu">Menu</button>
  <div class="nav-menu" id="nav-menu">{links}<a href="#contact" class="nav-cta">Ask me directly</a></div>
</nav>
"""

FOOTER = """<footer>
  <span>&copy; 2026 Pratik Renuse &middot; Pune, India</span>
  <nav aria-label="Footer"><a href="/consulting/">Consulting</a><a href="/advising/">Advising</a><a href="/coaching/">Coaching</a><a href="/teaching/">Teaching</a><a href="/speaking/">Speaking</a><a href="/work/">Work</a><a href="/speaking/talks/">Talks</a><a href="/testimonials/">Testimonials</a><a href="/answers/">Answers</a><a href="/playbooks/">Playbooks</a><a href="/">Home</a></nav>
</footer>
"""

def cta(topic_label):
    return f"""<section id="contact" class="cta">
  <div class="wrap cta-grid">
    <div>
      <div class="lbl">Ask me directly</div>
      <h2>Working on this right now?</h2>
      <p class="lead">Tell me what you are trying to grow or what your event needs. I read every message myself and reply within 48 hours.</p>
      <p class="lead">Or see how I work with teams: <a href="/consulting/">consulting</a>, <a href="/advising/">advising</a> and <a href="/speaking/">talks and workshops</a>.</p>
    </div>
    <div>
      <form id="contact-form" novalidate>
        <label for="f-name">Your name</label>
        <input id="f-name" type="text" autocomplete="name" placeholder="Full name">
        <div class="err" data-for="f-name">Please add your name</div>
        <label for="f-email">Email</label>
        <input id="f-email" type="email" autocomplete="email" placeholder="you@company.com">
        <div class="err" data-for="f-email">Please enter a valid email</div>
        <label for="f-msg">What are you working on?</label>
        <textarea id="f-msg" placeholder="A few lines is plenty"></textarea>
        <div class="err" data-for="f-msg">Add a short note so I can reply with context</div>
        <button type="submit" class="btn btn-dark" id="f-btn">Send my question</button>
      </form>
      <div class="ok" id="form-ok" role="status">
        <div class="lbl">Message received</div>
        <h3>Thank you, it is in my inbox.</h3>
        <p id="ok-text"></p>
      </div>
    </div>
  </div>
</section>
<script>
const tg=document.querySelector('.nav-toggle'),menu=document.getElementById('nav-menu');
tg.addEventListener('click',()=>{{const o=menu.classList.toggle('open');tg.setAttribute('aria-expanded',o);tg.textContent=o?'Close':'Menu';}});
const TOPIC={json.dumps(topic_label)};
function v(id){{return document.getElementById(id).value.trim();}}
function showErr(id,on){{const e=document.querySelector('.err[data-for="'+id+'"]');if(e)e.classList.toggle('on',on);}}
document.getElementById('contact-form').addEventListener('submit',async ev=>{{
  ev.preventDefault();
  const name=v('f-name'),email=v('f-email'),msg=v('f-msg');
  const good=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  showErr('f-name',!name);showErr('f-email',!good);showErr('f-msg',!msg);
  if(!name||!good||!msg)return;
  const btn=document.getElementById('f-btn');btn.textContent='Sending';btn.disabled=true;
  let sent=false;
  try{{const r=await fetch('/api/subscribe',{{method:'POST',headers:{{'Content-Type':'application/json'}},body:JSON.stringify({{email,name,source:('contact:'+TOPIC+' | '+msg).slice(0,900)}})}});const d=await r.json();sent=d.ok===true;}}catch(e){{sent=false;}}
  if(sent){{
    if(window.gtag)gtag('event','contact_resources',{{page:location.pathname}});
    document.getElementById('contact-form').style.display='none';
    document.getElementById('ok-text').textContent='I will reply to '+email+' within 48 hours.';
    document.getElementById('form-ok').style.display='block';
  }}else{{btn.textContent='Try again';btn.disabled=false;}}
}});
</script>
"""

AUTHOR_CARD = """<div class="card">
  <h3>About the author</h3>
  <p>Pratik Renuse is a growth marketing leader and 3x TEDx speaker. He built marketing from zero at Bueno, Infento and VU, led the $848K Infento Kickstarter, and mentors founders through Techstars, EBRD and Seedstars. He now teaches marketers to build with AI.</p>
  <p><a href="/">More about Pratik</a></p>
</div>"""

def breadcrumb_schema(trail):
    return {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + p} for i, (n, p) in enumerate(trail)]}

def write(root, path, content):
    full = os.path.join(root, path.strip("/"), "index.html")
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)

def check_text(label, *texts):
    for t in texts:
        if "\u2014" in t or "\u2013" in t:
            raise SystemExit(f"Dash found in {label}")

def build(root):
    by_slug = {a["slug"]: a for a in ANSWERS}
    pb_by_slug = {p["slug"]: p for p in PLAYBOOKS}
    urls = []

    # ---------- answer pages
    for a in ANSWERS:
        check_text(a["slug"], a["q"], a["short"], a["body"])
        a["related"] = [r for r in a.get("related", []) if r in by_slug and r != a["slug"]][:8]
        if a.get("playbook") and a["playbook"] not in pb_by_slug: a["playbook"] = None
        path = f"/answers/{a['slug']}/"
        tlabel = TOPICS[a["topic"]][0]
        title = a["q"] if len(a["q"]) <= 62 else a["q"]
        page_title = f"{title} · Pratik Renuse"
        desc = a["short"] if len(a["short"]) <= 160 else a["short"][:157].rsplit(" ", 1)[0] + "..."
        body_html = md(a["body"])
        schema = {"@context": "https://schema.org", "@graph": [
            {"@type": "FAQPage", "@id": SITE + path + "#faq", "mainEntity": [{"@type": "Question", "name": a["q"],
                "acceptedAnswer": {"@type": "Answer", "text": a["short"]}}]},
            {"@type": "Article", "headline": a["q"], "description": desc, "url": SITE + path,
             "datePublished": UPDATED, "dateModified": UPDATED, "inLanguage": "en",
             "author": {"@id": SITE + "/#person"}, "publisher": {"@id": SITE + "/#person"},
             "about": tlabel, "image": OG_IMG, "mainEntityOfPage": SITE + path,
             "wordCount": words(a["short"] + " " + body_html)},
            PERSON,
            breadcrumb_schema([("Home", "/"), ("Answers", "/answers/"), (a["q"], path)]),
        ]}
        rel = "".join(f'<li><a href="/answers/{r}/">{esc(by_slug[r]["q"])}</a></li>' for r in a.get("related", []))
        pb = ""
        if a.get("playbook"):
            p = pb_by_slug[a["playbook"]]
            pb = f'<div class="card"><h3>Step by step</h3><ul><li><a href="/playbooks/{p["slug"]}/">{esc(p["title"])}</a></li></ul></div>'
        html_out = head(page_title, desc, path, schema) + nav("/answers/") + f"""<main class="wrap">
<p class="crumbs"><a href="/">Home</a> / <a href="/answers/">Answers</a> / <a href="/answers/#{a['topic']}">{esc(tlabel)}</a></p>
<div class="page">
<article>
<div class="lbl"><a href="/answers/#{a['topic']}">{esc(tlabel)}</a></div>
<h1>{esc(a['q'])}</h1>
<p class="byline">By <a href="/">Pratik Renuse</a> &middot; Updated <time datetime="{UPDATED}">{UPDATED_TXT}</time></p>
<div class="short"><div class="k">Short answer</div><p>{esc(a['short'])}</p></div>
<div class="body">
{body_html}
</div>
</article>
<aside>
{pb}
<div class="card"><h3>Related questions</h3><ul>{rel}</ul></div>
{AUTHOR_CARD}
</aside>
</div>
</main>
""" + cta("Answers: " + a["slug"]) + FOOTER + "</body>\n</html>\n"
        write(root, path, html_out)
        urls.append((path, "0.7"))

    # ---------- playbook pages
    for p in PLAYBOOKS:
        check_text(p["slug"], p["title"], p["desc"], p["short"], *[s for st in p["steps"] for s in st], *p["pitfalls"], p["proof"])
        p["related_answers"] = [r for r in p["related_answers"] if r in by_slug][:8]
        path = f"/playbooks/{p['slug']}/"
        schema = {"@context": "https://schema.org", "@graph": [
            {"@type": "HowTo", "name": p["title"], "description": p["desc"], "url": SITE + path,
             "totalTime": None, "tool": [{"@type": "HowToTool", "name": t} for t in p["tools"]],
             "step": [{"@type": "HowToStep", "position": i + 1, "name": n, "text": t, "url": f"{SITE}{path}#step-{i+1}"} for i, (n, t) in enumerate(p["steps"])]},
            {"@type": "Article", "headline": p["title"], "description": p["desc"], "url": SITE + path,
             "datePublished": UPDATED, "dateModified": UPDATED, "inLanguage": "en",
             "author": {"@id": SITE + "/#person"}, "publisher": {"@id": SITE + "/#person"}, "image": OG_IMG},
            PERSON,
            breadcrumb_schema([("Home", "/"), ("Playbooks", "/playbooks/"), (p["title"], path)]),
        ]}
        schema["@graph"][0].pop("totalTime")
        if not p["proof_link"].startswith("/"): p["proof_link"] = "/"
        steps = "".join(f'<li id="step-{i+1}"><h3>{esc(n)}</h3><p>{esc(t)}</p></li>' for i, (n, t) in enumerate(p["steps"]))
        pit = "".join(f"<li>{esc(x)}</li>" for x in p["pitfalls"])
        rel = "".join(f'<li><a href="/answers/{r}/">{esc(by_slug[r]["q"])}</a></li>' for r in p["related_answers"])
        others = "".join(f'<li><a href="/playbooks/{o["slug"]}/">{esc(o["title"])}</a></li>' for o in PLAYBOOKS if o["slug"] != p["slug"])
        html_out = head(f"{p['title']} · Pratik Renuse", p["desc"], path, schema) + nav("/playbooks/") + f"""<main class="wrap">
<p class="crumbs"><a href="/">Home</a> / <a href="/playbooks/">Playbooks</a></p>
<div class="page">
<article>
<div class="lbl">Playbook</div>
<h1>{esc(p['title'])}</h1>
<p class="byline">By <a href="/">Pratik Renuse</a> &middot; Updated <time datetime="{UPDATED}">{UPDATED_TXT}</time></p>
<div class="meta"><span><b>For:</b> {esc(p['who'])}</span><span><b>Time:</b> {esc(p['time'])}</span><span><b>Tools:</b> {esc(', '.join(p['tools']))}</span></div>
<div class="short"><div class="k">In short</div><p>{esc(p['short'])}</p></div>
<div class="body">
<h2>The steps</h2>
<ol class="steps">{steps}</ol>
<h2>Common mistakes</h2>
<ul>{pit}</ul>
<h2>Where this comes from</h2>
<p>{esc(p['proof'])} <a href="{p['proof_link']}">See more</a>.</p>
</div>
</article>
<aside>
<div class="card"><h3>Quick answers</h3><ul>{rel}</ul></div>
<div class="card"><h3>More playbooks</h3><ul>{others}</ul></div>
{AUTHOR_CARD}
</aside>
</div>
</main>
""" + cta("Playbooks: " + p["slug"]) + FOOTER + "</body>\n</html>\n"
        write(root, path, html_out)
        urls.append((path, "0.8"))

    # ---------- answers hub
    sections = ""
    for key, (label, blurb) in TOPICS.items():
        items = [a for a in ANSWERS if a["topic"] == key]
        if not items: continue
        cards = "".join(f'<a href="/answers/{a["slug"]}/">{esc(a["q"])}</a>' for a in items)
        sections += f'<section class="topic" id="{key}"><h2>{esc(label)}</h2><p>{esc(blurb)}</p><div class="grid">{cards}</div></section>\n'
    hub_desc = "Straight answers for founders, marketing heads and event organisers on AI in marketing, AI search, growth from zero and building a marketing team, from operator Pratik Renuse."
    hub_schema = {"@context": "https://schema.org", "@graph": [
        {"@type": "CollectionPage", "name": "Answers by Pratik Renuse", "url": SITE + "/answers/", "description": hub_desc,
         "author": {"@id": SITE + "/#person"},
         "hasPart": [{"@type": "Article", "headline": a["q"], "url": f"{SITE}/answers/{a['slug']}/"} for a in ANSWERS]},
        PERSON, breadcrumb_schema([("Home", "/"), ("Answers", "/answers/")])]}
    hub = head("Answers on AI marketing, growth and AI search · Pratik Renuse", hub_desc, "/answers/", hub_schema, "website") + nav("/answers/") + f"""<main class="wrap">
<div class="hub-hero">
<div class="lbl">Answers</div>
<h1>Straight answers for founders and marketing heads.</h1>
<p>Each page answers one question in plain language, from someone who has built marketing from zero three times and now builds with AI every week. Start with the short answer, read on for the detail.</p>
</div>
{sections}
<section class="topic"><h2>Step by step playbooks</h2><p>Longer guides you can follow from start to finish.</p><div class="grid">{''.join(f'<a href="/playbooks/{p["slug"]}/">{esc(p["title"])}<span>{esc(p["who"])}</span></a>' for p in PLAYBOOKS)}</div></section>
</main>
""" + cta("Answers hub") + FOOTER + "</body>\n</html>\n"
    write(root, "/answers/", hub)
    urls.insert(0, ("/answers/", "0.9"))

    # ---------- playbooks hub
    pdesc = "Step by step playbooks for founders and marketing teams: ship a website with Claude, set up an AI content agent, launch a Kickstarter and roll out AI across a marketing team."
    phub_schema = {"@context": "https://schema.org", "@graph": [
        {"@type": "CollectionPage", "name": "Playbooks by Pratik Renuse", "url": SITE + "/playbooks/", "description": pdesc,
         "hasPart": [{"@type": "HowTo", "name": p["title"], "url": f"{SITE}/playbooks/{p['slug']}/"} for p in PLAYBOOKS]},
        PERSON, breadcrumb_schema([("Home", "/"), ("Playbooks", "/playbooks/")])]}
    cards = "".join(f'<a href="/playbooks/{p["slug"]}/">{esc(p["title"])}<span>{esc(p["desc"])}</span></a>' for p in PLAYBOOKS)
    phub = head("Playbooks for founders and marketing teams · Pratik Renuse", pdesc, "/playbooks/", phub_schema, "website") + nav("/playbooks/") + f"""<main class="wrap">
<div class="hub-hero">
<div class="lbl">Playbooks</div>
<h1>Step by step, from work I have actually done.</h1>
<p>Every playbook comes from a launch, a campaign or a session I ran myself. Follow the steps in order, skip the mistakes, and ask me if you get stuck.</p>
</div>
<section class="topic"><div class="grid">{cards}</div></section>
<section class="topic"><h2>Quick answers</h2><p>Short, direct answers to the questions behind these playbooks.</p><p><a class="btn btn-dark" href="/answers/">Browse all answers</a></p></section>
</main>
""" + cta("Playbooks hub") + FOOTER + "</body>\n</html>\n"
    write(root, "/playbooks/", phub)
    urls.insert(1, ("/playbooks/", "0.9"))


    # ---------- case studies (/work/)
    case_urls = []
    for c in CASES:
        check_text(c["slug"], c["title"], c["short"], c["challenge"], c["lessons"], *c["what_i_did"], *c["results"])
        path = f"/work/{c['slug']}/"
        rel_a = [r for r in c.get("related_answers", []) if r in by_slug][:6]
        rel_p = [r for r in c.get("related_playbooks", []) if r in pb_by_slug][:4]
        t = c.get("testimonial")
        tq = f'<blockquote class="tq"><p>&ldquo;{esc(t["quote"])}&rdquo;</p><cite>{esc(t["person"])}, {esc(t["role"])}</cite></blockquote>' if t else ""
        schema = {"@context": "https://schema.org", "@graph": [
            {"@type": "Article", "headline": c["title"], "description": c["desc"], "url": SITE + path,
             "datePublished": UPDATED, "dateModified": UPDATED, "inLanguage": "en", "image": OG_IMG,
             "author": {"@id": SITE + "/#person"}, "publisher": {"@id": SITE + "/#person"},
             "about": {"@type": "Organization", "name": c["company"]}},
            PERSON, breadcrumb_schema([("Home", "/"), ("Work", "/work/"), (c["company"], path)])]}
        side = ""
        if rel_p: side += '<div class="card"><h3>Playbooks from this work</h3><ul>' + "".join(f'<li><a href="/playbooks/{r}/">{esc(pb_by_slug[r]["title"])}</a></li>' for r in rel_p) + "</ul></div>"
        if rel_a: side += '<div class="card"><h3>Related questions</h3><ul>' + "".join(f'<li><a href="/answers/{r}/">{esc(by_slug[r]["q"])}</a></li>' for r in rel_a) + "</ul></div>"
        html_out = head(f"{c['title']} · Pratik Renuse", c["desc"], path, schema) + nav("/work/") + f"""<main class="wrap">
<p class="crumbs"><a href="/">Home</a> / <a href="/work/">Work</a></p>
<div class="page">
<article>
<div class="lbl">Case study</div>
<h1>{esc(c['title'])}</h1>
<div class="meta"><span><b>Company:</b> {esc(c['company'])}</span><span><b>Industry:</b> {esc(c['industry'])}</span><span><b>Where:</b> {esc(c['country'])}</span><span><b>When:</b> {esc(c['years'])}</span><span><b>My role:</b> {esc(c['role'])}</span></div>
<div class="short"><div class="k">In short</div><p>{esc(c['short'])}</p></div>
<div class="body">
<h2>The challenge</h2>
<p>{esc(c['challenge'])}</p>
<h2>What I did</h2>
<ul>{''.join(f'<li>{esc(x)}</li>' for x in c['what_i_did'])}</ul>
<h2>Results</h2>
<ul>{''.join(f'<li>{esc(x)}</li>' for x in c['results'])}</ul>
{tq}
{md(c['lessons'])}
</div>
</article>
<aside>
{side}
{AUTHOR_CARD}
</aside>
</div>
</main>
""" + cta("Work: " + c["slug"]) + FOOTER + "</body>\n</html>\n"
        write(root, path, html_out)
        case_urls.append((path, "0.8"))
    if CASES:
        cards = "".join(f'<a href="/work/{c["slug"]}/">{esc(c["title"])}<span>{esc(c["industry"])} &middot; {esc(c["country"])} &middot; {esc(c["years"])}</span></a>' for c in CASES)
        wdesc = "Case studies from companies Pratik Renuse built, grew or advised: Infento, VU, Bueno and more. What the problem was, what he did, and what happened."
        wschema = {"@context": "https://schema.org", "@graph": [{"@type": "CollectionPage", "name": "Work and case studies", "url": SITE + "/work/", "description": wdesc,
            "hasPart": [{"@type": "Article", "headline": c["title"], "url": f"{SITE}/work/{c['slug']}/"} for c in CASES]}, PERSON, breadcrumb_schema([("Home", "/"), ("Work", "/work/")])]}
        write(root, "/work/", head("Case studies: startups built and grown · Pratik Renuse", wdesc, "/work/", wschema, "website") + nav("/work/") + f"""<main class="wrap">
<div class="hub-hero"><div class="lbl">Work</div><h1>What I built, grew and fixed.</h1><p>Real companies, real problems and the work I did on them, from a record Kickstarter to marketing across 28 countries.</p></div>
<section class="topic"><div class="grid">{cards}</div></section>
</main>
""" + cta("Work hub") + FOOTER + "</body>\n</html>\n")
        case_urls.insert(0, ("/work/", "0.9"))
    urls += case_urls

    # ---------- talks archive (/speaking/talks/)
    talk_urls = []
    def tdate(d, t=None): return str(d) if d else (t or {}).get("date_label", "Date not recorded")
    talks_sorted = sorted(TALKS, key=lambda t: str(t["date"] or "2020-12"), reverse=True)
    for t in talks_sorted:
        check_text(t["slug"], t["title"], t["short"], t["body"])
        if t.get("existing_page"):
            continue  # already has its own full page on the site
        path = f"/speaking/talks/{t['slug']}/"
        ev = {"@type": "Event", "name": t["title"], "startDate": tdate(t["date"]), "description": t["short"],
              "eventStatus": "https://schema.org/EventScheduled", "url": SITE + path, "performer": {"@id": SITE + "/#person"},
              "organizer": {"@type": "Organization", "name": t["organiser"] or t["event"]},
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode" if t["online"] else "https://schema.org/OfflineEventAttendanceMode",
              "location": {"@type": "VirtualLocation", "url": SITE + path} if t["online"] else {"@type": "Place", "name": t["event"], "address": {"@type": "PostalAddress", "addressLocality": t["city"], "addressCountry": t["country"]}}}
        if not t["date"]:
            ev = {"@type": "CreativeWork", "name": t["title"], "description": t["short"], "url": SITE + path, "author": {"@id": SITE + "/#person"}}
        schema = {"@context": "https://schema.org", "@graph": [ev, PERSON, breadcrumb_schema([("Home", "/"), ("Speaking", "/speaking/"), ("Talks", "/speaking/talks/"), (t["title"], path)])]}
        media = f'<p><a href="{esc(t["media_url"])}" rel="noopener">Watch or view the session</a></p>' if t.get("media_url") else ""
        more = f'<p><a class="btn btn-dark" href="{t["existing_page"]}">See the full session page</a></p>' if t.get("existing_page") else ""
        where = "Online" if t["online"] else ", ".join(x for x in [t["city"], t["country"]] if x)
        others = "".join(f'<li><a href="{o.get("existing_page") or "/speaking/talks/" + o["slug"] + "/"}">{esc(o["title"])}</a></li>' for o in talks_sorted if o["slug"] != t["slug"])[:4000]
        html_out = head(f"{t['title']} · {t['event']} · Pratik Renuse", t["short"][:157].rsplit(' ',1)[0] + ("..." if len(t["short"])>157 else ""), path, schema) + nav("/speaking/") + f"""<main class="wrap">
<p class="crumbs"><a href="/">Home</a> / <a href="/speaking/">Speaking</a> / <a href="/speaking/talks/">Talks</a></p>
<div class="page">
<article>
<div class="lbl">{esc(t['kind'])}</div>
<h1>{esc(t['title'])}</h1>
<div class="meta"><span><b>Event:</b> {esc(t['event'])}</span><span><b>Host:</b> {esc(t['organiser'] or t['event'])}</span><span><b>Where:</b> {esc(where)}</span><span><b>When:</b> {esc(tdate(t['date'], t))}</span><span><b>Audience:</b> {esc(t['audience'])}</span></div>
<div class="short"><div class="k">The session</div><p>{esc(t['short'])}</p></div>
<div class="body">
{md(t['body'])}
{media}
{more}
</div>
</article>
<aside>
<div class="card"><h3>Book a session like this</h3><p>I run keynotes and hands-on AI sessions for conferences, companies, communities and business schools.</p><p><a href="/speaking/">See talks and formats</a></p></div>
<div class="card"><h3>More talks</h3><ul>{others}</ul></div>
</aside>
</div>
</main>
""" + cta("Talks: " + t["slug"]) + FOOTER + "</body>\n</html>\n"
        write(root, path, html_out)
        talk_urls.append((path, "0.6"))
    if TALKS:
        rows = "".join(f'<a href="{t.get("existing_page") or "/speaking/talks/" + t["slug"] + "/"}">{esc(t["title"])}<span>{esc(t["kind"])} &middot; {esc(t["event"])} {(" &middot; " + esc("Online" if t["online"] else (t["city"] or t["country"]))) if (t["online"] or t["city"] or t["country"]) else ""} &middot; {esc(tdate(t["date"], t))}</span></a>' for t in talks_sorted)
        tdesc = "Every talk, keynote, workshop and class by Pratik Renuse: 3 TEDx talks, 50+ keynotes in 14 countries, business schools and hands-on AI sessions."
        tschema = {"@context": "https://schema.org", "@graph": [{"@type": "CollectionPage", "name": "Talks and workshops by Pratik Renuse", "url": SITE + "/speaking/talks/", "description": tdesc}, PERSON, breadcrumb_schema([("Home", "/"), ("Speaking", "/speaking/"), ("Talks", "/speaking/talks/")])]}
        write(root, "/speaking/talks/", head("All talks, keynotes and workshops · Pratik Renuse", tdesc, "/speaking/talks/", tschema, "website") + nav("/speaking/") + f"""<main class="wrap">
<div class="hub-hero"><div class="lbl">Talks archive</div><h1>Every stage, classroom and build night.</h1><p>From three TEDx stages to business schools and rooms full of marketers building with AI. Organisers: <a href="/speaking/">see what I run now</a>.</p></div>
<section class="topic"><div class="grid">{rows}</div></section>
</main>
""" + cta("Talks hub") + FOOTER + "</body>\n</html>\n")
        talk_urls.insert(0, ("/speaking/talks/", "0.8"))
    urls += talk_urls

    # ---------- testimonials (/testimonials/)
    if TESTIMONIALS:
        for t in TESTIMONIALS: check_text("testimonial " + t["person"], t["quote"], t["role"])
        secs = ""
        for key, label, intro in TESTIMONIAL_GROUPS:
            items = [t for t in TESTIMONIALS if t["group"] == key]
            if not items: continue
            qs = ""
            for t in items:
                who = esc(t["person"]) + ", " + esc(t["role"])
                if t.get("link"): who += f' &middot; <a href="{t["link"]}">see the work</a>'
                src = '<span class="src">From a recorded video</span>' if t["source"] == "video" else ""
                qs += f'<blockquote class="tq"><p>&ldquo;{esc(t["quote"])}&rdquo;</p><cite>{who}{src}</cite></blockquote>'
            secs += f'<section class="topic"><h2>{esc(label)}</h2><p>{esc(intro)}</p><div class="tq-grid">{qs}</div></section>'
        tdesc = "What founders, clients, event organisers and coachees say about working with Pratik Renuse, in their own words, including quotes from recorded video testimonials."
        tschema = {"@context": "https://schema.org", "@graph": [
            {"@type": "CollectionPage", "name": "Testimonials for Pratik Renuse", "url": SITE + "/testimonials/", "description": tdesc,
             "about": {"@id": SITE + "/#person"},
             "hasPart": [{"@type": "Quotation", "text": t["quote"], "creator": {"@type": "Person", "name": t["person"]}, "about": {"@id": SITE + "/#person"}} for t in TESTIMONIALS]},
            PERSON, breadcrumb_schema([("Home", "/"), ("Testimonials", "/testimonials/")])]}
        write(root, "/testimonials/", head("Testimonials: what founders, clients and coachees say · Pratik Renuse", tdesc, "/testimonials/", tschema, "website") + nav("") + f"""<main class="wrap">
<div class="hub-hero"><div class="lbl">Testimonials</div><h1>In their words, not mine.</h1><p>Founders I mentored, companies I grew, the people who put me on stage and the graduates I coached. Some of these come from written reviews, others straight from recorded video calls.</p></div>
{secs}
</main>
""" + cta("Testimonials") + FOOTER + "</body>\n</html>\n")
        urls.append(("/testimonials/", "0.8"))

    # ---------- sitemap
    all_urls = STATIC_PAGES + urls
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p, pr in all_urls:
        sm.append(f"  <url><loc>{SITE}{p}</loc><lastmod>{UPDATED}</lastmod><priority>{pr}</priority></url>")
    sm.append("</urlset>")
    open(os.path.join(root, "sitemap.xml"), "w").write("\n".join(sm) + "\n")

    # ---------- llms.txt
    L = ["# Pratik Renuse", "",
         "> Growth marketing leader, 3x TEDx speaker and startup mentor based in Pune, India. Built marketing from zero at Bueno, Infento ($848K Kickstarter, the most funded STEM project of 2018) and VU. Mentor at Techstars, EBRD Star Venture and Seedstars. Visiting professor at Masters' Union and Tetr College of Business. Runs hands-on AI sessions for marketers, including the sold-out Claude 101 masterclass with GrowthX.",
         "", "## Work with Pratik",
         f"- [Consulting]({SITE}/consulting/): AI-first growth marketing for seed-funded D2C and B2C startups",
         f"- [Advising]({SITE}/advising/): growth advisor and mentor to founders",
         f"- [Coaching]({SITE}/coaching/): career coaching for graduates and young professionals",
         f"- [Teaching]({SITE}/teaching/): growth marketing, go-to-market and AI for marketers",
         f"- [Speaking]({SITE}/speaking/): AI keynotes and hands-on AI workshops for marketers, founders and event organisers",
         "", "## Answers"]
    for key, (label, _) in TOPICS.items():
        for a in [x for x in ANSWERS if x["topic"] == key]:
            L.append(f"- [{a['q']}]({SITE}/answers/{a['slug']}/)")
    L += ["", "## Playbooks"] + [f"- [{p['title']}]({SITE}/playbooks/{p['slug']}/): {p['desc']}" for p in PLAYBOOKS]
    L += ["", "## Case studies"] + [f"- [{c['title']}]({SITE}/work/{c['slug']}/): {c['desc']}" for c in CASES]
    L += ["", "## Talks archive"] + [f"- [{t['title']}, {t['event']}]({SITE}{t.get('existing_page') or '/speaking/talks/' + t['slug'] + '/'})" for t in TALKS]
    if TESTIMONIALS: L += ["", "## Testimonials", f"- [What founders, clients, organisers and coachees say]({SITE}/testimonials/)"]
    L += ["", "## Talks", f"- [Claude 101 masterclass with GrowthX]({SITE}/speaking/claude-101/)",
          f"- [Deployed: AI showcase by Coditas]({SITE}/speaking/coditas-deployed/)",
          f"- [Builders Night Out, Pune]({SITE}/speaking/builders-night-out/)", ""]
    open(os.path.join(root, "llms.txt"), "w").write("\n".join(L))
    print(f"Built {len(ANSWERS)} answers, {len(PLAYBOOKS)} playbooks, {len(CASES)} cases, {len(TALKS)} talks, sitemap with {len(all_urls)} URLs")
    return all_urls

if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else ".")
