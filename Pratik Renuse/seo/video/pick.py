import json,sys
def word_at(tr, phrase, after=0):
    ws=[w for s in tr['segments'] for w in s['words'] if w['s']>=after-0.5]
    toks=[t.strip('.,?!') for t in phrase.lower().split()]
    for i in range(len(ws)):
        if all(ws[i+k]['w'].strip().lower().strip('.,?!')==toks[k] for k in range(len(toks)) if i+k<len(ws)) and i+len(toks)<=len(ws):
            return ws[i]['s'], ws
    raise SystemExit('not found '+phrase)
def end_at(tr, phrase, after):
    ws=[w for s in tr['segments'] for w in s['words'] if w['s']>=after]
    toks=[t.strip('.,?!') for t in phrase.lower().split()]
    for i in range(len(ws)-len(toks)+1):
        if all(ws[i+k]['w'].strip().lower().strip('.,?!')==toks[k] for k in range(len(toks))):
            return ws[i+len(toks)-1]['e']
    raise SystemExit('not found end '+phrase)
