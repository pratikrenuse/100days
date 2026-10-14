# GE Vernova image -- reference render for the "engraved gold" standard.
# See ../Image Style.md. Built with Python + Pillow (no AI image gen).
# Concept: the glowing AI world balanced on one small turbine.
# Run in a sandbox with Pillow + DejaVu fonts; outputs a 1080x1350 PNG.
# Swap DejaVu Serif Italic for IBM Plex Serif Italic when font access is available.

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
import math
S=2; W,H=1080,1350; CW,CH=W*S,H*S
def px(v): return int(round(v*S))
def pf(v): return v*S
DEEP=(12,11,9); OFF=(238,234,228)
GB=(236,202,126); GM=(198,158,82); GD=(140,106,24)
DEJ="/usr/share/fonts/truetype/dejavu/"; LIB="/usr/share/fonts/truetype/liberation2/"
def serif_it(s): return ImageFont.truetype(DEJ+"DejaVuSerif-Italic.ttf", px(s))
def sans_b(s): return ImageFont.truetype(LIB+"LiberationSans-Bold.ttf", px(s))
def make_radial(w,h,ox,oy,r,c_in,c_out):
    ds=8; lw,lh=max(2,int(w//ds)),max(2,int(h//ds)); im=Image.new("RGB",(lw,lh)); p=im.load()
    for yy in range(lh):
        for xx in range(lw):
            t=min(1.0,math.hypot(xx*ds-ox,yy*ds-oy)/r)
            p[xx,yy]=tuple(int(c_in[k]+(c_out[k]-c_in[k])*t) for k in range(3))
    return im.resize((w,h),Image.BILINEAR)

cx=CW/2; oy=pf(452); R=pf(248)
ty=pf(800); tR=pf(96)

img=Image.new("RGB",(CW,CH),DEEP)
img=ImageChops.add(img, make_radial(CW,CH,cx,oy,pf(520),(40,30,14),(0,0,0)))
d=ImageDraw.Draw(img)

sh=Image.new("L",(CW,CH),0); ImageDraw.Draw(sh).ellipse([cx-pf(150),ty+tR+pf(6),cx+pf(150),ty+tR+pf(54)],fill=110)
sh=sh.filter(ImageFilter.GaussianBlur(px(26)))
img=Image.composite(Image.new("RGB",(CW,CH),(0,0,0)),img,sh); d=ImageDraw.Draw(img)

gl=Image.new("L",(CW,CH),0); ImageDraw.Draw(gl).ellipse([cx-R-px(26),oy-R-px(26),cx+R+px(26),oy+R+px(26)],outline=255,width=px(20))
gl=gl.filter(ImageFilter.GaussianBlur(px(26)))
img=Image.composite(Image.new("RGB",(CW,CH),(70,52,20)),img,gl); d=ImageDraw.Draw(img)
sphere=make_radial(CW,CH,cx-pf(70),oy-pf(80),R*1.4,(34,30,24),(12,11,10))
sm=Image.new("L",(CW,CH),0); ImageDraw.Draw(sm).ellipse([cx-R,oy-R,cx+R,oy+R],fill=255)
img=Image.composite(sphere,img,sm); d=ImageDraw.Draw(img)
for f in (-0.72,-0.4,0.0,0.4,0.72):
    dy=f*R; rx=math.sqrt(max(0,R*R-dy*dy)); ry=rx*0.24
    d.ellipse([cx-rx,oy+dy-ry,cx+rx,oy+dy+ry],outline=GM,width=px(2))
for lam in (0.34,0.70,0.94):
    rx=R*lam
    d.ellipse([cx-rx,oy-R,cx+rx,oy+R],outline=GM,width=px(2))
d.line([(cx,oy-R),(cx,oy+R)],fill=GM,width=px(2))
d.ellipse([cx-R,oy-R,cx+R,oy+R],outline=GD,width=px(3))
d.arc([cx-R,oy-R,cx+R,oy+R],start=150,end=250,fill=OFF,width=px(4))
for (fx,fy) in [(-0.3,-0.35),(0.34,-0.1),(-0.15,0.28),(0.28,0.42),(0.0,-0.6),(-0.5,0.05)]:
    nx=cx+fx*R; ny=oy+fy*R
    d.ellipse([nx-px(5),ny-px(5),nx+px(5),ny+px(5)],fill=GB)

goldgrad=make_radial(CW,CH,cx,ty,pf(150),GB,GD)
mask=Image.new("L",(CW,CH),0); m=ImageDraw.Draw(mask)
r_in=pf(20); r_out=tR; N=20; sweep=0.6
for k in range(N):
    a=k*2*math.pi/N; po=[]; pi=[]
    for s_ in range(14):
        t=s_/13; r=r_in+(r_out-r_in)*t; ang=a+sweep*t; hw=0.05*(1-t)+0.012*t
        po.append((cx+r*math.cos(ang+hw), ty+r*math.sin(ang+hw)))
        pi.append((cx+r*math.cos(ang-hw), ty+r*math.sin(ang-hw)))
    m.polygon(po+pi[::-1],fill=255)
img=Image.composite(goldgrad,img,mask); d=ImageDraw.Draw(img)
d.ellipse([cx-r_out-px(4),ty-r_out-px(4),cx+r_out+px(4),ty+r_out+px(4)],outline=GM,width=px(2))
d.ellipse([cx-pf(20),ty-pf(20),cx+pf(20),ty+pf(20)],fill=(20,18,15))
d.ellipse([cx-pf(20),ty-pf(20),cx+pf(20),ty+pf(20)],outline=GB,width=px(3))
d.ellipse([cx-pf(7),ty-pf(7),cx+pf(7),ty+pf(7)],fill=GB)
d.ellipse([cx-px(7),oy+R-px(3),cx+px(7),oy+R+px(9)],fill=GB)

def tw(t,f,tr): return sum(f.getlength(c)+px(tr) for c in t)-px(tr)
def tracked_c(cxx,y,t,f,fill,tr):
    x=cxx-tw(t,f,tr)/2
    for c in t: d.text((x,y),c,font=f,fill=fill); x+=f.getlength(c)+px(tr)
oy2=pf(936)
d.line([(cx-pf(58),oy2),(cx-pf(14),oy2)],fill=GM,width=px(1))
d.line([(cx+pf(14),oy2),(cx+pf(58),oy2)],fill=GM,width=px(1))
d.polygon([(cx,oy2-px(5)),(cx+px(5),oy2),(cx,oy2+px(5)),(cx-px(5),oy2)],fill=GB)
cap="The entire AI boom rests on this."
cs=52; cf=serif_it(cs)
while d.textlength(cap,font=cf)>CW-pf(160): cs-=1; cf=serif_it(cs)
d.text((CW/2-d.textlength(cap,font=cf)/2,pf(968)),cap,font=cf,fill=OFF)
tracked_c(CW/2,pf(1276),"PRATIK RENUSE",sans_b(14),GM,5.0)

fm=px(46); d.rectangle([fm,fm,CW-fm,CH-fm],outline=(74,60,30),width=px(1))
for (ax,ay) in [(fm,fm),(CW-fm,fm),(fm,CH-fm),(CW-fm,CH-fm)]:
    d.line([(ax-px(7),ay),(ax+px(7),ay)],fill=GM,width=px(1)); d.line([(ax,ay-px(7)),(ax,ay+px(7))],fill=GM,width=px(1))

noise=Image.effect_noise((CW,CH),12).convert("L").point(lambda p:int((p-128)*0.06+128)).convert("RGB")
img=ImageChops.overlay(img,noise)
vig=Image.new("L",(CW,CH),255); ImageDraw.Draw(vig).ellipse([-CW*0.3,-CH*0.28,CW*1.3,CH*1.28],fill=0)
vig=vig.filter(ImageFilter.GaussianBlur(px(150)))
img=Image.composite(Image.new("RGB",(CW,CH),(4,4,3)),img,vig)
out=img.resize((W,H),Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=1.0,percent=50,threshold=2))
out.save("GE_Vernova_concept.png","PNG"); print("saved", out.size)
