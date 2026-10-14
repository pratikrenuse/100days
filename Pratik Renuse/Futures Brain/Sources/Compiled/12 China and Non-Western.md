# China and non-Western voices (Full Detail)

Consolidated full-detail dossiers for sources 155 to 165 plus 204, covering China and non-Western AI builders, analysts, and outlets.

## Table of Contents

155. Liang Wenfeng
156. Kai-Fu Lee
157. Jeffrey Ding
158. Peng Xiao
159. Nandan Nilekani
160. Yao Shunyu
161. Yang Zhilin
162. Robin Li
163. Wang Xingxing
164. Ren Zhengfei
165. Dan Wang
204. ChinaTalk

---

## 155. Liang Wenfeng

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://www.deepseek.com/ (company site; English version at https://www.deepseek.com/en/)
- Blog: No personal blog. DeepSeek does not maintain a Western-style blog. Closest equivalents are the DeepSeek GitHub org (https://github.com/deepseek-ai) and the API news/changelog (https://api-docs.deepseek.com/news). Major model launches are announced via DeepSeek's WeChat account.
- X: No personal account found. The company account is https://twitter.com/deepseek_ai (also reachable as https://x.com/deepseek_ai).
- Podcast / other: None of his own. He appears only through rare Chinese-language interviews and occasional Chinese state media (CCTV Xinwen Lianbo) coverage. Chinese social presence for the company: Zhihu (https://www.zhihu.com/org/deepseek-75) and Xiaohongshu / RedNote.
- RSS: No personal feed. arXiv listing for DeepSeek-AI papers is the most reliable research feed: https://arxiv.org/a/deepseekai
- Paywall: partial (DeepSeek site and GitHub are free; some translated interviews sit behind soft paywalls or membership prompts, e.g. The China Academy)
- English content note: ENGLISH CONTENT IS LIMITED. Liang gives very few interviews, writes almost nothing in English, and has been largely out of public view since early 2025. He has no personal blog or X account. The best English sources are: (1) DeepSeek's official site and the deepseek-ai GitHub org for models and code; (2) DeepSeek's technical papers on arXiv (DeepSeek-V3 at arxiv.org/abs/2412.19437 and DeepSeek-R1 at arxiv.org/abs/2501.12948), which carry his name as Wenfeng Liang and are the clearest record of his thinking; (3) English translations of his two rare Chinese interviews (originally by 36Kr sub-brand An Yong / Waves 暗涌, July 2024 and 2023), most notably China Talk's annotated translation (chinatalk.media) and The China Academy's translation (thechinaacademy.org). Treat all interview translations as secondhand renderings of Chinese originals, not his own English words.

### Who they are
Liang Wenfeng (梁文锋, Liáng Wénfēng; born 1985, Guangdong) is the founder and CEO of DeepSeek, the Hangzhou AI lab he launched in 2023, and co-founder of the quantitative hedge fund High-Flyer (幻方 Huanfang), which funds and owns most of DeepSeek. As of June 2026 he still leads DeepSeek, which has shipped open-weight frontier models (V3, R1, and a V4 preview released April 2026); he was named to Time's 100 Most Influential People in AI and Fortune's Most Powerful People in Business in 2025, and remains famously low-profile, having largely stayed out of public view since meetings with Premier Li Qiang (January 2025) and Xi Jinping (February 2025).

### Their future thesis (one line)
Open, original AI built efficiently by homegrown talent will let China move from copying to contributing at the technological frontier, and no closed-source moat can hold once the underlying ideas are public.

### Key future-relevant pieces
- "Deepseek: The Quiet Giant Leading China's AI Race" (Nov 27, 2024), https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas
  China Talk's annotated English translation of Liang's July 2024 interview with the 36Kr sub-brand Waves (An Yong), the single richest English window into his thinking. He argues that closed-source moats are temporary, that China's real gap with the US is "between originality and imitation" rather than one or two years, and that China should stop free-riding on Western innovation and become a contributor. He frames DeepSeek's purpose as reaching AGI and building a technical ecosystem, not chasing quick commercial profit.

- "Interview with Deepseek Founder: We're Done Following. It's Time to Lead." (Jan 26, 2025), https://thechinaacademy.org/interview-with-deepseek-founder-were-done-following-its-time-to-lead/
  The China Academy's English translation (credited to Wave Media) of the same July 2024 An Yong interview, republished as DeepSeek-R1 was rattling global markets. It captures his views that money is not China's constraint (chip export bans are), that DeepSeek will not go closed-source, and that hardcore original innovation comes from confidence and high-density young talent rather than scale of spending. Useful as a second, slightly differently worded rendering to cross-check the China Talk version.

- "DeepSeek-V3 Technical Report" (submitted Dec 27, 2024; revised Feb 18, 2025), https://arxiv.org/abs/2412.19437
  The technical paper for DeepSeek-V3, a 671B-parameter Mixture-of-Experts model (37B active per token) trained for a reported 2.788M H800 GPU hours, far below typical frontier budgets. Submitted under Wenfeng Liang's name, it is the concrete proof of his efficiency-first, open-weights thesis: architectural innovations like Multi-head Latent Attention and an auxiliary-loss-free load-balancing strategy let a comparatively small lab match leading closed models. It signals a future where frontier capability is far cheaper to reach than incumbents assumed.

- "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning" (submitted Jan 22, 2025; revised Jan 4, 2026), https://arxiv.org/abs/2501.12948
  The paper behind DeepSeek-R1, the open reasoning model whose January 2025 release triggered a roughly $1 trillion drop in US tech market value and was widely called an AI turning point. It shows that strong reasoning can be drawn out through pure reinforcement learning, without large human-annotated reasoning data, and that those patterns can be distilled into smaller models. The work was later published in Nature (vol. 645, 2025), unusual recognition for an industry lab and a marker of how seriously DeepSeek's approach is taken.

- DeepSeek-AI on GitHub (ongoing; org page accessed June 2026), https://github.com/deepseek-ai
  The official open-source home for DeepSeek's models, weights, and code (V3, R1, Coder, Math, VL, and infrastructure tools), with roughly 35 repositories and a very large following. It is the most direct, primary-source way to follow what Liang's lab actually ships, since he rarely speaks publicly and DeepSeek publishes through code and papers more than press. For a Western audience this is effectively his and DeepSeek's main public-facing channel.

### Hooks for the brain
- Feeds the "open source vs closed frontier" thesis: a credible argument and a working example that open-weight models can track the frontier and that closed-source advantages erode quickly. Use as the strongest non-Western counterweight to US-lab assumptions.
- Feeds "China as AI contributor, not follower": primary-source evidence for the 10-to-20 year question of whether China shifts from imitation to original innovation. Use his "originality vs imitation" gap framing as a quotable thesis.
- Feeds "compute efficiency and the economics of AI": V3 and R1 are data points that frontier capability may get dramatically cheaper, which reshapes who can compete and undercuts pure scale-and-capital moats. Pair with debates on chip export controls (his stated real constraint).
- Feeds "talent and org design": his bottom-up, young-domestic-talent, low-hierarchy model is a testable claim about where breakthrough innovation comes from. Use when reasoning about how research institutions evolve.
- Caution for the brain: he is deliberately opaque, gives almost no English content, and has been near-silent since early 2025, so weight the papers and code heavily and treat interview translations as secondhand. Watch the DeepSeek GitHub and arXiv for the real signal.

---

## 156. Kai-Fu Lee

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://www.sinovationventures.com/portfolio/items/kaifulee (Sinovation Ventures founder profile). Company he founded in 2023: https://01.ai
- Blog: No standalone personal blog. He writes books and op-eds and posts threads on X. TED speaker hub: https://www.ted.com/speakers/kai_fu_lee
- X: https://x.com/kaifulee (handle @kaifulee, very active in English and Chinese). Also Instagram @kaifu_lee and LinkedIn https://cn.linkedin.com/in/kaifulee
- Podcast / other: Frequent long-form interview guest (TED Interview, Lex Fridman, NCUSCR). TED talk "How AI can save our humanity" (2018).
- RSS: None found for a personal feed. Follow via X or TED.
- Paywall: partial. Books are paid. His own X posts, TED talks, and most interviews are free, but some coverage of him sits behind paywalls (Reuters, FT, Bloomberg, WSJ).

### Who they are
Taiwanese-born computer scientist and venture capitalist, Chairman and CEO of Sinovation Ventures and founder and CEO of the Beijing AI company 01.AI (零一万物, Lingyi Wanwu, founded March 2023). Former president of Google China and founding head of Microsoft Research Asia, and earlier a researcher at Apple. Author of "AI Superpowers" (2018) and co-author of "AI 2041" (2021). Full name 李开复 (Lǐ Kāifù).

### Their future thesis (one line)
The US and China are the two AI superpowers, AI will challenge or automate roughly 40 to 50 percent of jobs over the next 15 to 20 years, and the right response is for humans to specialize in creativity, empathy and care while AI handles the routine, so that a chaotic transition gives way to long-term abundance.

### Key future-relevant pieces
- "AI Superpowers: China, Silicon Valley, and the New World Order" (September 25, 2018), https://en.wikipedia.org/wiki/AI_Superpowers
  His best-known book argues the AI center of gravity is shifting toward China because deep learning rewards scale of data, engineering effort and aggressive execution rather than only breakthrough research. He frames the US and China as the two dominant AI powers and warns that AI threatens a large share of both blue-collar and white-collar jobs, calling for new social contracts to manage the displacement.

- "AI 2041: Ten Visions for Our Future" (2021, co-authored with science-fiction writer Chen Qiufan), https://www.ai2041.com/
  Ten short stories set in 2041, each paired with Lee's analysis of the technology behind it, covering deepfakes, autonomous vehicles, AI education and the economics of mass automation. It is deliberately a roughly 80 percent optimistic vision: short-term job and social disruption is real, but Lee argues for moving past money as the measure of success toward an era of plenitude where care and human connection carry value.

- "AI's Threats to Jobs and Human Happiness Are Real" (IEEE Spectrum interview, May 12, 2022), https://spectrum.ieee.org/kai-fu-lee-ai-jobs
  Interview tied to "AI 2041" in which Lee says AI excels at routine, repetitive work, so the most exposed jobs are assembly-line, customer service and entry-level white-collar roles, on the order of 40 to 50 percent. He argues universal basic income is necessary but not sufficient, and that displaced workers need retraining plus meaning and dignity, since the jobs AI creates tend to demand more skill than the ones it removes.

- "How AI can save our humanity" (TED talk, posted August 2018), https://www.ted.com/talks/kai_fu_lee_how_ai_can_save_our_humanity
  Drawing on his own cancer diagnosis, Lee argues that as AI takes over analytical and routine tasks, humans should lean into love, compassion and care work that machines cannot replicate. He pairs a hard-nosed read of US and China AI leadership with a humanist conclusion: AI's real promise is freeing people to do the deeply human work that gives life meaning.

- 01.AI pivot away from pre-training large models (reported March 2025), https://en.wikipedia.org/wiki/01.AI
  In late 2024 and 2025, Lee restructured 01.AI: it stopped pre-training its own frontier large language models, moved its pre-training and infrastructure talent into an "industrial large model" joint lab with Alibaba Cloud, and refocused on selling tailored AI business solutions, in part built on DeepSeek's models. His public framing is that pre-training the largest models is no longer cost-effective for a startup, and that China can win by efficient engineering and applied products rather than chasing the frontier alone. (Note: Lee disputed early-2025 reports that he was "selling" the team to Alibaba, describing it instead as a partnership and joint lab.)

### Hooks for the brain
- Feeds the "US-China AI bipolarity" thesis: a credible insider voice arguing China is a co-equal AI superpower and is closing the gap (he claimed in 2025 that DeepSeek narrowed the lead to a few months), useful as a counterweight to US-centric forecasts.
- Feeds the "future of work and automation" thesis: his 40 to 50 percent job-displacement figure over 15 to 20 years, the split between routine work (exposed) and creative/empathetic/care work (durable), and his "human plus AI" architect model.
- Feeds the "post-scarcity and meaning" thesis: his argument that UBI alone fails and that society must redefine value around care and human connection in an age of abundance.
- Use as the China and non-Western lens on open vs closed models and on lean, capital-efficient AI: 01.AI's story (cheap training, open Yi models, then a pivot to applied/industrial AI tied to Alibaba and DeepSeek) is a concrete case study in how the Chinese AI ecosystem is consolidating.

---

## 157. Jeffrey Ding

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://jeffreyjding.github.io/ (also faculty pages at elliott.gwu.edu/jeffrey-ding and politicalscience.columbian.gwu.edu/jeffrey-ding)
- Blog / where published: ChinAI newsletter on Substack (chinai.substack.com); academic work via Princeton University Press and journals
- X / social: https://x.com/jjding99
- Best English source: ChinAI newsletter (his own, in English, free); ChinaTalk interviews and SCMP "Open Questions" profile
- Paywall: no (ChinAI is free; some opinion outlets that quote him are paywalled)

### Who they are
Assistant professor of political science at George Washington University, author of "Technology and the Rise of Great Powers" (Princeton, 2024), and writer of the ChinAI newsletter, which translates Chinese-language AI discourse for a Western audience of 12,000+ policymakers and scholars.

### Their future thesis (one line)
The country that wins the AI era will be the one that diffuses the technology most broadly across its whole economy, not the one that produces the flashiest frontier breakthroughs, and on that measure the US is "training for the wrong race."

### Key future-relevant pieces
- "Technology and the Rise of Great Powers" (2024), https://press.princeton.edu/books/hardcover/9780691260341/technology-and-the-rise-of-great-powers
  His core book argues that general-purpose technologies like electricity and now AI reshape global power only after decades of widespread adoption, not at the moment of invention. He introduces the idea that a state's "diffusion capacity" matters more than its raw innovation lead for long-run economic and military advantage. This reframes US-China competition away from a sprint toward AGI and toward the slower work of spreading AI through firms, workers, and institutions.

- "Jeffrey Ding on why diffusion, not innovation, is the secret to victory in the AI race" (2026), https://www.scmp.com/tech/tech-trends/article/3340976/jeffrey-ding-why-diffusion-not-innovation-secret-victory-ai-race
  In this SCMP "Open Questions" interview he applies his book's thesis directly to the 2026 moment, warning that the US is fixated on an "innovation sprint" while the real contest is a "diffusion marathon." He argues China faces its own "diffusion deficit" where its ability to invent outpaces its ability to spread technology economy-wide. The piece is a clean English-language summary of how he reads the AI race today.

- "Tech and the Rise and Fall of Great Powers" (ChinaTalk interview), https://www.chinatalk.media/p/tech-and-the-rise-and-fall-of-great
  A long-form ChinaTalk conversation where Ding walks through the historical cases behind his theory, from the Industrial Revolution to the present. He stresses that betting national strategy on a single frontier breakthrough is historically how rising powers have miscalculated. Useful as the most accessible spoken explainer of his framework.

- ChinAI newsletter (ongoing, weekly), https://chinai.substack.com/
  His weekly translations surface what Chinese engineers, executives, and officials actually say about AI, rather than what Western analysts assume they think. It is one of the few continuous primary-source feeds on Chinese AI sentiment in English. Read it to track shifts in China's self-assessment of its own AI position over time.

### Hooks for the brain
- Feeds the "diffusion beats frontier" thesis and the "US-China AI race is misframed" thesis. Use Ding as the analytical counterweight to hype about who has the best model: his framework predicts the 10-to-20-year winner is decided by adoption depth across the economy, which is a structural variable worth tracking. Pair with Nilekani (diffusion at population scale) and Robin Li (AI applications over models) as a cluster on diffusion as the real battleground.

---

## 158. Peng Xiao

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://www.g42.ai/about (company); leadership bio at https://mbzuai.ac.ae/about/leadership/peng-xiao/
- Blog / where published: No personal blog. Speaks through G42 press releases, World Governments Summit panels, and broadcast interviews (Bloomberg, CNBC)
- X / social: No prominent personal X account; G42 posts via @G42ai and LinkedIn
- Best English source: Bloomberg and Khaleej Times interview coverage; G42 newsroom (g42.ai/resources/news); Data Center Dynamics for infrastructure detail
- Paywall: partial (Bloomberg paywalled; G42 newsroom and Gulf press mostly free)

### Who they are
Group CEO of G42 since 2020, the Abu Dhabi AI and cloud conglomerate at the center of the UAE's national AI strategy and the Stargate UAE mega data-center buildout. US-educated (George Washington University, Hawaii Pacific) with a prior decade at MicroStrategy and earlier roles at Pegasus and DarkMatter.

### Their future thesis (one line)
AI is becoming a national utility more important than electricity, so sovereign nations must build their own "intelligence grid" of compute, data centers, and agents the way they once built power grids.

### Key future-relevant pieces
- "AI will be more important than electricity: G42 and Microsoft leaders at World Government Summit" (Feb 2026), https://gulfnews.com/uae/ai-will-be-more-important-than-electricity-microsoft-g42-leaders-at-dubais-world-government-summit-1.500430193
  At WGS 2026, Xiao framed AI as a utility that nations must own and control, declaring G42 is "connecting the national power grid to this new intelligence grid." He argued AI has moved past pilots into scaled government deployment, where sovereign control and secure infrastructure are decisive. This is his clearest statement of the intelligence-as-utility worldview.

- "G42 CEO Peng Xiao says over 7,000 workers and 100 cranes are building Stargate project in Abu Dhabi" (2026), https://www.khaleejtimes.com/business/tech/g42-ceo-peng-xiao-says-over-7000-workers-and-100-cranes-are-building-stargate-project-in-abu-dhabi
  Xiao detailed the physical scale of Stargate UAE, a 5-gigawatt AI campus being built in phases of roughly 200 to 500 megawatts per quarter. He tied the buildout to a national KPI of producing over 1 billion AI agents to lift regional GDP. The piece shows how he treats compute capacity as sovereign economic infrastructure.

- "G42 CEO says company will receive first AI chip shipments within months" (2026), https://www.datacenterdynamics.com/en/news/g42-ceo-says-company-will-receive-first-ai-chip-shipments-within-months-to-support-initial-200mw-of-capacity-for-planned-stargate-cluster/
  Xiao described the timeline for the first 200MW of the Stargate cluster coming online once advanced AI chips clear US export approval. The story underscores how dependent the UAE's AI ambitions remain on US semiconductor policy. It is a useful marker of how chip access gates the Gulf's intelligence-grid plans.

- "Watch G42 CEO Peng Xiao on Chip Imports, AI Developments" (Jan 2026), https://www.bloomberg.com/news/videos/2026-01-20/g42-ceo-peng-xiao-on-chip-imports-ai-developments-video
  A Bloomberg interview where Xiao discusses the geopolitics of importing AI chips into the UAE and the partnership structure linking G42 with OpenAI, Oracle, and Nvidia. He positions Abu Dhabi as a neutral hub building the largest AI campus outside the US. Good primary-source video for his framing of the UAE's role between the US and China.

### Hooks for the brain
- Feeds the "sovereign AI and compute geopolitics" thesis and the "AI as national infrastructure / new electricity" thesis. Xiao is the embodiment of the Gulf playing kingmaker between US and Chinese AI ecosystems, with capital and energy as its leverage. Track him to understand how non-US, non-China states acquire AI sovereignty, and how chip export policy reshapes the global compute map over the next decade.

---

## 159. Nandan Nilekani

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://nandannilekani.com/ ; Infosys profile at https://www.infosys.com/about/management-profiles/nandan-nilekani.html
- Blog / where published: Speaks via EkStep Foundation, People+AI, and conference keynotes (India AI Impact Summit, Raisina Dialogue); books and op-eds
- X / social: https://x.com/NandanNilekani
- Best English source: His own keynotes and interviews are in English; Business Standard, McKinsey "Future of Asia," and Times of Oman cover him well
- Paywall: no (most coverage free; some business outlets metered)

### Who they are
Co-founder and Chairman of Infosys, founding chairman of UIDAI where he architected Aadhaar (the world's largest biometric ID system), co-creator of the India Stack and UPI, and founder of the People+AI initiative. He is the leading voice for India's "digital public infrastructure" model.

### Their future thesis (one line)
India's edge is applying AI and frugal engineering at population scale through open digital public infrastructure, so it should become "the use case capital of the world" and lead AI diffusion for public good rather than chasing frontier models.

### Key future-relevant pieces
- "Voice AI is India's next UPI moment: Infosys chairman Nandan Nilekani" (Jan 2026), https://www.business-standard.com/technology/tech-news/voice-ai-is-india-s-next-upi-moment-infosys-chairman-nandan-nilekani-126012801369_1.html
  Nilekani argues that voice interfaces in 22 Indian languages will democratize AI the way UPI democratized payments, letting people who cannot type or read English simply talk to a computer. He frames population-scale voice AI as both India's domestic opportunity and a global export, since most countries cannot afford expensive systems. This is his sharpest recent prediction about what the next decade of inclusive AI looks like.

- "India can lead world in AI diffusion for public good: Nandan Nilekani" (Feb 2026), https://ddnews.gov.in/en/india-can-lead-world-in-ai-diffusion-for-public-good-nandan-nilekani/
  Speaking at the India AI Impact Summit 2026, he urged that AI investment focus on "diffusion pathways" rather than model-building, drawing on India's UPI and financial-inclusion experience. He declared India should aim to be "the use case capital of the world." The talk directly links India Stack's diffusion playbook to the AI era.

- "India to lead in frugal engineering, AI to resolve real issues: Nilekani" (Aug 2025), https://www.business-standard.com/companies/news/infosys-nandan-nilekani-ai-frugal-engineering-upi-aadhaar-125082900381_1.html
  Nilekani positions frugal engineering as India's structural advantage, predicting India will be the source of applying AI to real-world problems cheaply enough for the developing world to copy. He ties this to the existing rails of Aadhaar and UPI. It captures his "solve real problems at low cost" framing versus Silicon Valley's frontier race.

- "Why Infosys's Nandan Nilekani is urging leaders to use technology for social good" (McKinsey, Future of Asia), https://www.mckinsey.com/featured-insights/future-of-asia/why-infosys-nandan-nilekani-is-urging-leaders-to-use-tech-for-good
  A longer-form interview laying out his philosophy that open digital public infrastructure, rather than closed Big Tech platforms, is the model for inclusive growth. He generalizes the India Stack lesson into a template other nations can adopt. Useful for the systemic, institutional version of his argument.

### Hooks for the brain
- Feeds the "AI diffusion at population scale" thesis, the "Global South leapfrog / digital public infrastructure" thesis, and the "frugal AI vs frontier AI" split. Nilekani is the strongest non-Western voice arguing that the future is decided by who delivers AI to a billion ordinary people, not who builds the biggest model. Pair with Jeffrey Ding (diffusion theory) and Robin Li (applications over models) as a coherent diffusion cluster; use him specifically for the developing-world and open-infrastructure angle.

---

## 160. Yao Shunyu

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://ysymyth.github.io/ (personal site, in English)
- Blog / where published: Personal site and Google Scholar for papers; "The Second Half" essay at ysymyth.github.io/The-Second-Half/
- X / social: https://x.com/ShunyuYao12 (active in English)
- Best English source: His own blog and papers are in English; for the Tencent role, ChinaTalk, SCMP, Caixin Global, and Bloomberg
- Paywall: no for his blog and arXiv papers; partial for Bloomberg/Caixin/The Information coverage

### Who they are
Chief AI Scientist at Tencent (appointed December 2025), reporting to president Martin Lau and leading Tencent's restructured large-model and AI-infrastructure units. Princeton PhD and Tsinghua graduate, formerly at OpenAI where he was a core contributor to the Deep Research and Operator agents, and originator of ReAct, Tree of Thoughts, and SWE-bench.

### Their future thesis (one line)
AI has entered its "second half" where reinforcement learning now generalizes, so the bottleneck shifts from training models to defining the right problems and building better evaluations, and the AI race is a long game won through real-world agents, not benchmark scores.

### Key future-relevant pieces
- "The Second Half" (Apr 2025), https://ysymyth.github.io/The-Second-Half/
  Yao argues AI is at halftime: decades of work on training methods have paid off, RL has finally generalized across diverse tasks, and the recipe for solving defined problems is now largely known. The consequence is that evaluation, and choosing which problems are worth solving, becomes more important than training. This essay is his most influential statement and a widely cited framing for where agentic AI goes next.

- "ReAct: Synergizing Reasoning and Acting in Language Models" (2022, ongoing influence), https://arxiv.org/abs/2210.03629
  ReAct introduced the pattern of interleaving reasoning steps with tool-use actions, which became foundational to modern AI agents. It is the conceptual ancestor of the autonomous, tool-using systems now central to every frontier lab's product roadmap. Read it to understand the technical lineage of the agent era Yao now builds for at Tencent.

- "Tree of Thoughts: Deliberate Problem Solving with Large Language Models" (2023), https://arxiv.org/abs/2305.10601
  This paper generalized chain-of-thought into a search over multiple reasoning paths, letting models explore, backtrack, and self-evaluate. It is part of the intellectual scaffolding behind today's reasoning models. Relevant as a marker of how deliberate, search-based reasoning became a core capability direction.

- "Tencent's chief AI scientist dismisses lag concerns, says race a 'long-term game'" (2026), https://www.scmp.com/tech/big-tech/article/3356090/tencents-chief-ai-scientist-dismisses-lag-concerns-says-race-long-term-game
  In one of his first major statements at Tencent, Yao played down fears that Chinese labs trail US frontier models, framing AI as a multi-decade marathon. He emphasized practical, scenario-driven applications over chasing benchmark parity. The piece signals how he intends to steer Tencent's roughly doubled AI spend toward deployed agents.

### Hooks for the brain
- Feeds the "agentic AI / autonomous agents as the next paradigm" thesis and the "evaluation and problem-definition become the scarce skill" thesis. Yao is a rare figure who shaped the West's agent research and now leads one of China's largest AI efforts, so he is a bridge between the two ecosystems. Use him to track where capable Western-trained talent is migrating, and to anchor predictions that the 10-to-20-year story is agents doing real work, not bigger benchmarks.

---

## 161. Yang Zhilin

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://www.moonshot.ai (Moonshot AI / Kimi company site)
- Blog / where published: Kimi technical reports on arXiv and Hugging Face (e.g. the Kimi K2 paper, arxiv.org/abs/2507.20534); company releases via moonshot.ai
- X / social: Kimi.ai posts on X and LinkedIn (@Kimi_Moonshot); Yang himself rarely posts in English
- Best English source / podcast: English coverage in Forbes, TechNode, and the BigGo Finance and Bismarck Brief writeups; primary Chinese interviews surface through translated pieces on Substack (e.g. aiproem) and LinkedIn. Original long interviews are in Chinese.
- Paywall: partial (Forbes and some trade outlets meter articles; arXiv and Hugging Face are free)

### Who they are
Founder and CEO of Moonshot AI, the Chinese startup behind the Kimi chatbot and the open-weight Kimi K2 model family. A Tsinghua graduate and former Google and Meta researcher, he is one of China's most prominent frontier-model builders, with Kimi valued near 20 billion dollars in a 2026 raise.

### Their future thesis (one line)
Frontier AI is entering a third phase where models improve themselves and where open-source, agentic systems become the industry's default benchmark.

### Key future-relevant pieces
- "Kimi K2: Open Agentic Intelligence" (July 2025), https://arxiv.org/abs/2507.20534
  The technical report introducing Kimi K2, a trillion-parameter mixture-of-experts model released under a commercial-friendly open license. It frames the model around agentic tool use rather than chat, training it to plan multi-step tasks and call external tools, and positions open weights as a deliberate strategic choice against closed Western labs.

- "Moonshot AI's Yang Zhilin: AI R&D Enters New Era Led by AI Itself" (May 2026), https://finance.biggo.com/news/KyPoI50BNZYCTTDvO9Lw
  Coverage of Yang's keynote at the 2026 Zhongguancun Forum where he argues large-model development is entering a third phase driven by AI improving AI. He casts open-source models as the new yardstick for the field and downplays brute-force scaling in favor of self-directed research loops.

- "Chinese AI Model Developer Kimi Raising Funds Valuing It At 20 Billion Dollars" (May 2026), https://www.forbes.com/sites/ywang/2026/05/07/chinese-ai-model-developer-kimi-raising-funds-valuing-it-at-20-billion/
  Forbes reports Moonshot closing a roughly 2 billion dollar round at a 20 billion dollar valuation, with a possible Hong Kong listing under discussion. It signals that an open-weight Chinese lab can attract frontier-scale capital and compete on capability, not just cost.

- "AI 2026: China's Moonshot AI Contends For Technical Leadership" (2026), https://brief.bismarckanalysis.com/p/ai-2026-chinas-moonshot-ai-contends
  An analytical brief on how Moonshot moved from a long-context chatbot to a contender for genuine technical leadership in open models. It explains the rapid K2 release cadence and why Kimi's agentic focus matters for the US-China model race over the next decade.

### Hooks for the brain
- Feeds the thesis that AI capability is decentralizing and that open-weight Chinese models will close the gap with closed US labs.
- Supports the "AI improving AI" / recursive self-improvement thesis and the shift from chatbots to autonomous agents.
- Anchors the China-as-frontier-AI-power scenario for 2035 to 2045.

---

## 162. Robin Li

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://ir.baidu.com (Baidu investor relations) and https://www.baidu.com
- Blog / where published: Baidu newsroom and PR Newswire releases; keynote remarks at Baidu World and Baidu Create conferences
- X / social: Robin Li does not maintain an active English social account; Baidu posts via @Baidu_Inc. His keynotes appear on Baidu's official YouTube channel.
- Best English source / podcast: TIME interview (time.com/7357630/robin-li-baidu-interview/), South China Morning Post, TechNode, and Fortune Asia carry his views in English. Baidu Create keynote highlights are on YouTube.
- Paywall: partial (TIME, SCMP, and Fortune meter; Baidu IR and PR Newswire are free)

### Who they are
Co-founder, chairman, and CEO of Baidu, China's leading search company turned AI firm, and the force behind the ERNIE foundation models and Apollo Go robotaxis. He has bet on AI for over a decade and now frames Baidu around AI agents rather than search.

### Their future thesis (one line)
The real value of AI shifts from the model to the application and the autonomous agent, producing self-evolving agents, super individuals, and human-agent super-organizations.

### Key future-relevant pieces
- "Baidu Create 2026: CEO says AI focus is moving from models to AI agents, foresees rise of super individuals" (May 2026), https://technode.com/2026/05/14/baidu-create-2026-ceo-says-ai-is-moving-from-model-competition-to-ai-agent-era-foresees-rise-of-super-individuals/
  Reports Li's Create 2026 keynote built around self-evolution at three levels: agents, individuals, and enterprises. He argues the smallest productive unit will shift from a team to one person plus a fleet of agents, coining the "super individual," and that the model race is giving way to the agent race.

- "Baidu Advances Agent Portfolio to Embrace the Agent Era, Champions Daily Active Agents as Key Metric" (May 2026), https://www.prnewswire.com/news-releases/baidu-advances-agent-portfolio-to-embrace-the-agent-era-champions-daily-active-agents-as-key-metric-302771383.html
  Baidu's own release announcing a pivot from token-based metrics to "Daily Active Agents" as the core measure of AI value. It reframes the industry away from raw model output toward how many autonomous agents are actually doing useful work each day.

- "Baidu's Robin Li on China's Push to Diffuse AI Throughout Society" (2025), https://time.com/7357630/robin-li-baidu-interview/
  A TIME interview in which Li argues China's edge will come from diffusing AI broadly into the economy rather than only chasing the most capable model. He stresses applications creating far more value than the models beneath them and AI as a driver of "new productive forces."

- "Baidu Unveils ERNIE 5.0 and a Series of AI Applications at Baidu World 2025" (2025), https://www.prnewswire.com/news-releases/baidu-unveils-ernie-5-0-and-a-series-of-ai-applications-at-baidu-world-2025--ramps-up-global-push-302614531.html
  Announces ERNIE 5.0, a natively multimodal model jointly handling text, images, audio, and video, alongside a wider global push. It is the foundation Li points to when arguing that value should concentrate at the application layer, not the chip or model layer.

### Hooks for the brain
- Feeds the "value moves to the application and agent layer" thesis and the decline of pure model competition.
- Supports the super-individual / one-person-plus-agents future of work scenario.
- Anchors China's strategy of mass AI diffusion and robotaxi deployment (Apollo Go) over the next decade.

---

## 163. Wang Xingxing

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://www.unitree.com (Unitree Robotics global site) and https://shop.unitree.com
- Blog / where published: Unitree product pages and YouTube channel for robot demos; company announcements via the Unitree site
- X / social: Unitree posts demo videos on X and YouTube (@UnitreeRobotics). Wang himself has little English social presence and speaks mainly through Chinese-language interviews.
- Best English source / podcast: TIME100 AI profile (time.com/collections/time100-ai-2025/7305853/wang-xingxing/), South China Morning Post, and the ChinaTalk podcast interview (chinatalk.media/p/unitree-ceo-on-chinas-robot-revolution). Global Times carries his translated remarks.
- Paywall: partial (TIME and SCMP meter; ChinaTalk and Global Times are free)

### Who they are
Founder, CEO, and CTO of Unitree Robotics, the Hangzhou maker of low-cost quadruped "robot dogs" and the G1 and H1 humanoid robots. Born in 1990, he is a figurehead of China's humanoid robotics surge and was seated front-row at Xi Jinping's 2025 business symposium.

### Their future thesis (one line)
Affordable, mass-produced humanoid and legged robots will move from labs and demos into factories and homes, and China can lead by driving the price down fast.

### Key future-relevant pieces
- "We have been advancing robots that 'truly work,' says Unitree Robotics founder" (November 2025), https://www.globaltimes.cn/page/202511/1347439.shtml
  Translated remarks where Wang stresses building robots that do real work rather than perform stunts, with the goal of wide deployment in factories and households. He frames cost reduction and reliability, not flashy demos, as the path to mass adoption.

- "Wang Xingxing: The 100 Most Influential People in AI 2025" (2025), https://time.com/collections/time100-ai-2025/7305853/wang-xingxing/
  TIME's profile placing Wang among the most influential people in AI for making humanoid and quadruped robots dramatically cheaper than rivals. It documents Unitree's roughly two-thirds share of the robot-dog market and the viral synchronized-robot performance that made the company a household name in China.

- "Unitree targets 20,000 humanoid robots with fourfold capacity increase" (2026), https://interestingengineering.com/ai-robotics/unitree-targets-20000-humanoid-robots
  Reports Unitree's plan to ship around 20,000 humanoid robots in 2026, almost four times the prior year, signaling a real shift toward volume manufacturing. It is concrete evidence that humanoids are moving from one-off prototypes toward industrial-scale production.

- "Inside Unitree's landmark IPO: what to know about China's humanoid giant" (2026), https://www.scmp.com/tech/article/3347611/inside-unitrees-landmark-ipo-what-know-about-chinas-humanoid-giant
  Covers Unitree's filing to list on the Shanghai Stock Exchange, with audited 2025 revenue near 1.7 billion yuan and a 60 percent gross margin. The IPO marks humanoid robotics maturing into a fundable public-market business in China.

### Hooks for the brain
- Feeds the "humanoid robots reach the factory and home this decade" thesis, driven by cost collapse.
- Supports China's lead in embodied AI and hardware manufacturing scenarios for 2035 to 2045.
- Anchors questions about labor, automation, and the physical (not just digital) side of the AI buildout.

---

## 164. Ren Zhengfei

#source
Domain: China and non-Western
Verified: June 2026

### Read them
- Homepage: https://www.huawei.com (Huawei corporate site)
- Blog / where published: Ren rarely publishes directly; his views surface through rare set-piece interviews, most notably with People's Daily, and through Huawei press materials
- X / social: No personal account. Huawei posts via @Huawei. Ren communicates through occasional long interviews, not social media.
- Best English source / podcast: People's Daily English edition (en.people.cn), South China Morning Post tech coverage, and analysis from The National Interest and geopolitechs.org that translate and unpack his interviews. Original interviews are in Chinese.
- Paywall: partial (SCMP meters; People's Daily and most analysis pieces are free)

### Who they are
Founder and CEO of Huawei, the Chinese telecom and computing giant building Ascend AI chips and a domestic semiconductor stack under US sanctions. A former military engineer who founded Huawei in 1987, he is the most influential voice on China's drive for technology self-reliance.

### Their future thesis (one line)
China can overcome US chip curbs not by matching single-chip performance but by clustering and systems engineering, and AI's full impact will unfold over decades and centuries.

### Key future-relevant pieces
- "Huawei founder remains optimistic despite US curbs" (June 2025), https://en.people.cn/n3/2025/0611/c90000-20325959.html
  Coverage of Ren's rare front-page People's Daily interview, where he says there is no need to worry about US restrictions because clustering many Huawei chips can match top global offerings even if each chip lags a generation. He frames self-reliance and patient, long-horizon investment as China's answer to sanctions.

- "Recalibrating China's Tech Nationalism: Takeaways from Huawei Founder's People's Daily Interview" (2025), https://nationalinterest.org/blog/techland/recalibrating-chinas-tech-nationalism-takeaways-from-huawei-founders-peoples-daily-interview
  An analysis unpacking what Ren's state-media interview signals about Beijing's strategy. It reads his measured tone as a deliberate recalibration of tech nationalism, emphasizing systems-level competition and basic research over chasing single-chip parity.

- "Huawei boss Ren Zhengfei's Latest Remarks on AGI, Quantum, Talent, Compute, and AI's impact on Jobs" (2025), https://www.geopolitechs.org/p/huawei-boss-ren-zhengfeis-latest
  A translation and summary of Ren's wider remarks on AGI, quantum, talent, and jobs. He argues AI development will span decades and even centuries, and stresses theoretical research, noting a large slice of Huawei's roughly 25 billion dollar annual R&D budget goes to basic science.

- "Tech war: Huawei founder Ren says state-of-the-art chip performance can be achieved" (2025), https://www.scmp.com/tech/big-tech/article/3313779/tech-war-huawei-founder-ren-says-state-art-chip-performance-can-be-achieved
  Reports Ren's claim that competitive chip performance is achievable through next-generation materials and compound semiconductors rather than only advanced lithography. It points to China routing around export controls via alternative engineering paths over the coming decade.

### Hooks for the brain
- Feeds the US-China tech decoupling and chip-sovereignty thesis for 2035 to 2045.
- Supports the "systems and clustering beat single-chip leadership" view of compute competition.
- Anchors the long-horizon framing of AI as a multi-decade transformation and the role of state-backed basic research.

---

## 165. Dan Wang

#source
Domain: China and non-Western; Hoover fellow; author "Breakneck"; China industrial capacity analyst
Verified: June 2026

### Read them
- Homepage: https://danwang.co/
- Blog / where published: Personal essays and annual letters at https://danwang.co/ ; also writes for Foreign Affairs, The Atlantic, New York Times, Financial Times, Bloomberg
- X / social: https://twitter.com/danwwang (@danwwang)
- Podcast / other: Frequent guest on Bloomberg Odd Lots, Stratechery, Ezra Klein Show, Freakonomics; book talk recorded at Hoover Institution
- Paywall: no (personal site is free; some outlet pieces sit behind publication paywalls)

### Who they are
Research fellow at Stanford University's Hoover Institution (Hoover History Lab) and author of "Breakneck: China's Quest to Engineer the Future" (W. W. Norton, August 2025). A Canadian technology analyst who spent roughly a decade based in Hong Kong, Beijing, and Shanghai studying China's industrial and technology capabilities; previously at Yale Law's Paul Tsai China Center and Gavekal Dragonomics. Now based between Ann Arbor and Palo Alto.

### Their future thesis (one line)
China is an "engineering state" that builds physical capacity at breakneck speed while America has become a "lawyerly society" that excels at process and litigation but struggles to build, and this gap will define the next two decades of great-power competition.

### Key future-relevant pieces
- "Breakneck: China's Quest to Engineer the Future" (August 2025), https://danwang.co/breakneck/
  His book argues China is run by engineers and the US is run by lawyers, a framework for why China can mobilize infrastructure, manufacturing, and energy capacity at a pace the US cannot match. It pairs reportage from Shanghai, Chongqing, and Shenzhen with the costs of the engineering mindset, including surveillance, political suppression, and the social damage of policies like the one-child rule and zero-Covid. It was a New York Times #3 bestseller and FT/Schroders book of the year longlist.

- "2025 letter" (early January 2026), https://danwang.co/2025-letter/
  His annual reflection letter, this year weaving together compute, the new Cold War framing of US-China rivalry, and the industrial lens he has argued for over many years. He notes data points such as China's electrical generation capacity moving from one-third of US levels in 2000 to more than two-and-a-half times US levels by 2024. The letters are his core ongoing vehicle for tracking how China's capacity is shifting year over year.

- "Tariffs Won't Reindustrialize America. Here's What Will" (May 14, 2025), https://www.bloomberg.com/news/articles/2025-05-14/to-bring-manufacturing-back-to-the-us-copy-china-s-playbook
  Argues that tariffs alone will not rebuild US manufacturing and that the US should instead study China's actual industrial playbook of process knowledge, supply-chain density, and learning-by-doing. Directly relevant to forecasts about whether and how Western economies can reindustrialize over the next decade.

- "China's Sputnik Moment?" (July 29, 2021), https://www.foreignaffairs.com/articles/united-states/2021-07-29/chinas-sputnik-moment
  A Foreign Affairs essay on the trajectory of US-China technology competition and what would constitute a wake-up moment for American policy. Establishes his long-running argument that process knowledge and manufacturing scale, not just frontier research, determine technological leadership.

### Hooks for the brain
- Feeds the China-rises and US-China-rivalry theses, and any forecast about manufacturing, energy buildout, and reindustrialization. Use as the counterweight to AI-and-frontier-tech narratives that ignore physical capacity. His "engineers vs lawyers" frame is a fast diagnostic lens for why a country can or cannot build infrastructure at scale.

---

## 204. ChinaTalk

#source
Domain: China and non-Western
Verified: June 2026

### What it is
ChinaTalk is a hybrid think tank and media outlet founded and edited by Jordan Schneider, focused on China, emerging technology, and US-China relations. It publishes a Substack newsletter (over 70,000 free subscribers) and a podcast, mixing original analysis with translations of Chinese-language tech and policy media and interviews with analysts, policymakers, and executives.

### Access
- URL: https://www.chinatalk.media/
- RSS / feeds / newsletter / podcast / API:
  - Newsletter (Substack) with free and paid tiers; subscribe at https://www.chinatalk.media/
  - Podcast on Apple Podcasts: https://podcasts.apple.com/us/podcast/chinatalk/id1289062927 ; Spotify: https://open.spotify.com/show/448WaJhgJGJKnQ3HCE2EBa
  - Substack provides standard RSS for both posts and podcast
  - Founder site: https://jorschneider.com/
- Paywall: partial (large volume of free newsletter posts and the podcast; some posts and extras are reserved for paid subscribers)

### What it does for the future
ChinaTalk is one of the best English-language windows into how China's technology and policy ecosystem actually thinks, via translated primary sources and deeply sourced reporting on AI, semiconductors, export controls, and industrial policy. Because US-China tech competition is a master variable for the next 10 to 20 years, its near-real-time coverage of chip controls, Chinese AI labs, and Beijing's strategy is high-signal for anyone forecasting the global tech order. It pairs Silicon Valley and Washington audiences with a Beijing-literate lens.

### Notable recent work (2025 to 2026)
- "Chinese AI in 2025, Wrapped" by Irene Zhang (December 11, 2025), https://www.chinatalk.media/p/china-ai-in-2025-wrapped
  A year-end recap arguing 2025 was historic for Chinese AI: DeepSeek-R1's January launch reset assumptions about scaling and US dominance, and by December open Chinese models like Qwen and Kimi were powering a Silicon Valley startup gold rush. It walks through the year's model drops, the AGI debate inside Alibaba and the Politburo, the chaotic US-China chip war (five "emergency pods" worth), Beijing's AI+ plan, and the robotics surge. The single best map of where Chinese AI stands heading into 2026.
- "EMERGENCY EDITION: AI Diffusion Export Controls" (January 2025), https://www.chinatalk.media/p/emergency-edition-ai-diffusion-export
  A rapid-response analysis of the Biden-era AI diffusion rule, arguing that controls on semiconductor manufacturing equipment and leading-edge fabrication are the true crux, while questioning how developing economies and China will route around restrictions. It models the strategic logic and likely second-order effects of tiered chip access. A clear primer on the policy lever that will shape who gets compute.
- "DeepSeek V4" (April 27, 2026), https://www.chinatalk.media/p/deepseek-v4
  ChinaTalk reports that V4's delayed arrival was tied to migrating DeepSeek's training framework from Nvidia to Huawei Ascend, including a serious mid-2025 training failure during the re-adaptation. It is a concrete window into how export controls are forcing Chinese labs onto domestic silicon and what that costs them in time and stability. A leading indicator for the China-US compute and hardware decoupling story.
- "Why Huawei Can't Catch Nvidia" (October 2025), https://www.chinatalk.media/p/why-huawei-cant-catch-nvidia
  An interview with Chris McGuire, a former NSC deputy senior director for technology and national security, assessing Huawei's chip ambitions and the gap to Nvidia's ecosystem. It probes whether China can build a credible alternative to the CUDA moat, a question central to the AI hardware balance of power. Valuable for sizing how durable US compute advantage actually is.

### Hooks for the brain
- Primary-source access to Chinese thinking: translations of 36Kr interviews, Politburo study sessions, and Alibaba leadership speeches give insight you cannot get from Western coverage alone.
- The chip war as a recurring saga: ChinaTalk's blow-by-blow on export controls, H20/H200, Huawei Ascend, and rare earths is the tightest narrative thread on the decisive US-China tech contest.
- Open-source as geopolitics: its coverage frames China's open-model strategy (DeepSeek, Qwen, Kimi) as a deliberate bid for global influence, a major 10 to 20 year dynamic.
- High-output, multi-author, partly free; treat Schneider's interviews and the "Wrapped" year-in-review posts as anchor reads, and note some content is paid.
