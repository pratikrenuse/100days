# bioRxiv

#source
Domain: Research repositories
Verified: June 2026

## What it is
The free preprint server for biology, run by the nonprofit openRxiv (formerly hosted by Cold Spring Harbor Laboratory). It posts not-yet-peer-reviewed papers across all life-science fields, often months ahead of journal publication, which makes it the earliest public signal of where biology is heading.

## Access
- URL: https://www.biorxiv.org
- RSS / feeds: Atom 1.0 feeds for the 30 most recent posts, by subject or combined. Builder page: https://www.biorxiv.org/alertsrss . Pattern: https://connect.biorxiv.org/biorxiv_xml.php?subject=SUBJECT (e.g. `synthetic_biology`, `neuroscience`, `bioengineering`, `genomics`). Combine subjects with `+`, replace spaces with `_`. Also mirrors to Bluesky, Mastodon and X per subject stream.
- API: Open, no key. https://api.biorxiv.org . Detail endpoint `https://api.biorxiv.org/details/biorxiv/[YYYY-MM-DD]/[YYYY-MM-DD]?category=cell_biology` returns title, authors, date, DOI, abstract, category, funding in JSON or XML. Single-paper lookup by DOI. Bulk text/data mining via S3 (see https://www.biorxiv.org/tdm).
- Key sections or categories for future tech: Synthetic Biology, Bioengineering, Genomics, Bioinformatics, Neuroscience, Systems Biology, Cell Biology, Genetics, Molecular Biology. These hold most of the AI-in-biology, gene-editing, organoid and aging-mechanism work.
- Paywall: no. Fully open access, free full text for humans and machines.

## How to mine it for the future
Subscribe to the Synthetic Biology, Bioengineering, Neuroscience and Systems Biology Atom feeds for a daily firehose of frontier methods. For structured tracking, hit the API by date range and category and sort by abstract views or downloads (usage endpoint) to surface what the field is paying attention to. Watch for foundation-model and "virtual cell" preprints from labs like Arc Institute, and cross-reference a preprint DOI against the `pubs` endpoint to see if and where it later got published, a quick credibility check.

## Notable recent work or trends (2025 to 2026)
- "Genome modeling and design across all domains of life with Evo 2" (Feb 2025), https://www.biorxiv.org/content/10.1101/2025.02.18.638918v1
  Arc Institute's Evo 2 is a genome foundation model trained on DNA sequence alone that predicts the functional impact of genetic variants, including clinically significant BRCA1 mutations, without task-specific tuning, and can generate genome-scale sequences. It is an early sign that AI is becoming a design tool for the genetic code itself, not just an analysis aid.
- "Maximal human lifespan in light of a mechanistic model of aging" (22 Dec 2025), https://www.biorxiv.org/content/10.64898/2025.12.22.695887v1
  Uses a Saturating-Removal mathematical model of stochastic damage accumulation to ask why maximal human lifespan has barely moved while median life expectancy doubled. It separates which aging processes affect median versus maximal lifespan, pointing to where future longevity interventions would have to act to push the ceiling.
- "SWR1C loss promotes longevity through tRNA-mediated proteostasis" (5 Dec 2025), https://www.biorxiv.org/content/10.64898/2025.12.05.692690v1
  Links chromatin remodeling (the SWR1C complex), tRNA biology and protein-quality-control stress responses as a single lifespan-regulating axis in a model organism. It is the kind of mechanistic target that geroscience drug programs mine for druggable longevity pathways.
- "Are Current AI Virtual Cell Models Useful for Scientific Discovery?" (Apr 2026), https://www.biorxiv.org/content/10.64898/2026.04.23.719015v1
  A critical appraisal of whether the wave of AI "virtual cell" and single-cell foundation models actually generate new biological insight versus reproducing known patterns. Useful as a reality check on the hype curve around computational biology.

## Hooks for the brain
- Feeds the theses on AI becoming a generative engine for biology (genome and protein design) and on engineered/synthetic biology going mainstream. Best treated as the leading indicator: catch directions here 6 to 18 months before they hit Nature or Science.
- Pair with the longevity-and-aging thesis: bioRxiv is where the mechanistic targets (proteostasis, damage models, reprogramming) show up first. Use the API plus usage stats to separate genuine momentum from noise, and always note these are preprints (not peer reviewed) when citing.
