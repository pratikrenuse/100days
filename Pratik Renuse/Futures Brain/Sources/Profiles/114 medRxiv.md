# medRxiv

#source
Domain: Research repositories
Verified: June 2026

## What it is
The free preprint server for health sciences, run by openRxiv alongside bioRxiv (founding partners Cold Spring Harbor Laboratory, Yale and BMJ). It posts not-yet-peer-reviewed clinical and public-health research, making it the earliest public view of where medicine, diagnostics and human longevity work is moving.

## Access
- URL: https://www.medrxiv.org
- RSS / feeds: Atom 1.0 feeds for the 30 most recent posts, by subject collection or combined. Builder page: https://www.medrxiv.org/alertsrss . Pattern: https://connect.medrxiv.org/medrxiv_xml.php?subject=SUBJECT . Combine subjects with `+`, replace spaces with `_`. Subject collection list at https://www.medrxiv.org/collection/ . Also mirrors to social streams.
- API: Open, no key, shares bioRxiv's infrastructure. Detail endpoint `https://api.biorxiv.org/details/medrxiv/[YYYY-MM-DD]/[YYYY-MM-DD]?category=cardiovascular%20medicine` returns title, authors, date, DOI, abstract, category in JSON or XML. Single-paper lookup by DOI. Full-corpus XML and bulk full text for text and data mining via a dedicated Amazon S3 resource (see https://www.medrxiv.org/tdm).
- Key sections or categories for future tech: Epidemiology, Genetic and Genomic Medicine, Neurology, Geriatric Medicine, Health Informatics, and the aging/biomarker work that spans them. These hold the longevity, AI-diagnostics and precision-medicine signals.
- Paywall: no. Free and unrestricted full-text access for humans and machines.

## How to mine it for the future
Track the Genetic and Genomic Medicine, Neurology, Health Informatics and Epidemiology collections for clinical-translation signals: aging biomarkers, AI diagnostic models, gene-therapy case reports. Use the API by date range and category to pull abstracts in bulk and watch for cohort-scale studies (UK Biobank, large registries) that validate biological-age or risk-prediction tools. Cross-check any preprint DOI against the `pubs` endpoint to see if it later passed peer review, and always flag findings as preprints, since clinical claims carry real-world stakes before review.

## Notable recent work or trends (2025 to 2026)
- "Comparing Fourteen Consensus Biomarkers of Aging: Epigenetic Pace of Aging as the Strongest Predictor of Mortality in BASE-II" (20 Nov 2025), https://www.medrxiv.org/content/10.1101/2025.11.20.25340648v1
  First study to test all 14 expert-consensus aging biomarkers in one cohort (the Berlin Aging Study II, 1,671 older adults) against mortality. The DunedinPACE epigenetic clock was the single strongest and most consistent predictor of death, and a minimal trio of epigenetic age, muscle mass and standing balance performed almost as well as the full panel. This is direct evidence for which aging clocks deserve to be trial endpoints.
- "Multimodal Ageing Biomarkers and Plasma Proteomics" (Mar 2026), https://www.medrxiv.org/content/10.64898/2026.03.09.26347914v1
  Argues for biomarkers that beat chronological age at predicting age-related outcomes and combines multimodal aging measures with plasma proteomic data. Frames such biomarkers as surrogate endpoints for longevity trials and inputs to personalized prevention, a core piece of the geroscience-goes-clinical story.
- "Genetic predisposition to longer lifespan, lifestyle factors, and all-cause mortality: a 17-year prospective cohort study" (19 Aug 2025), https://www.medrxiv.org/content/10.1101/2025.08.19.25333952v1
  A long-horizon cohort study weighing genetic longevity predisposition against modifiable lifestyle factors for all-cause mortality. It speaks to how much of lifespan is destiny versus behavior, central to any honest forecast of human healthspan gains.

## Hooks for the brain
- Feeds the longevity-and-healthspan thesis on the clinical side: which aging biomarkers and clocks actually predict outcomes, and how close they are to being usable as trial endpoints and prevention tools.
- Pair with bioRxiv (mechanisms) and Nature Medicine (peer-reviewed validation) to trace an idea from bench to clinic. Use it as the early signal for AI-diagnostics and precision-medicine adoption, while clearly marking everything as pre-peer-review.
