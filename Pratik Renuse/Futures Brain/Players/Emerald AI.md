# Emerald AI

#player
**Proves:** [[Energy is the Ceiling]] (primary)
**Awareness:** Obscure (energy-transition and data-centre trade press only; the company is under two years old and what it sells is a software behaviour, not a thing anyone can point at)

## One line
Everyone else answers the power shortage by building more power. This one answers it by promising to stop drawing power for a few minutes, which turns out to be worth more.

## The chokepoint it owns
Not generation. **Queue position.**

The constraint in US AI infrastructure is no longer "is there enough electricity", it is "when can you connect". Interconnection queues in Northern Virginia, Phoenix and Dallas now run four to seven years, Texas paused all new data-centre grid connections outright on August 3, 2026, and roughly 12 GW of capacity promised for 2026 construction saw only about 5 GW break ground. A utility sizes a connection for a customer's **peak** draw, and a data centre that will pull 500 MW flat, forever, with no ability to back off, has to be planned for as 500 MW of new firm capacity.

Emerald AI's claim is that most of that peak is negotiable. AI workloads are not uniform: training can be paused or throttled, some inference is latency-tolerant, batch jobs can slide. Its software continuously profiles jobs by computational flexibility, time sensitivity and performance tolerance, and when the grid signals stress it models thousands of scheduling scenarios and sheds load without breaking the jobs that matter. A data centre that can prove it will drop 25% on demand is a different, smaller, faster-to-approve request than one that cannot.

That converts a data centre from a grid liability into a grid asset, and it is a route **past** the queue rather than through it.

## Key facts (dated)
- **In-window catalyst.** On **September 16, 2026**, Emerald AI **co-founded the AI Energy Management Alliance (AEMA) with Google and Nvidia**. Launch partners include **Anthropic, AES, Constellation, Generate, National Grid, NRG Energy, Analog Devices, Calibrant Energy, Camus, ClearPath, encoord, Fluence, GridUnity, PassKey, RWE, Splight, Verrus and Voltus.** The alliance's stated purpose is to advance data centres that dynamically manage electricity use in response to grid conditions, on the argument that **flexibility unlocks faster and larger connections**. (Axios / DCD / Business Wire, September 16, 2026)
  - Why the alliance is the story and not the footnote: a **22-month-old startup is a named co-founder alongside Nvidia and Google**, and nineteen of the largest names in AI and power signed on. Companies form trade bodies when there is a regulatory negotiation to win. This one exists to argue that flexibility should buy grid access.
- **The company.** Founded **November 2024** by **Varun Sivaram**, a former Biden administration energy official.
- **Funding, out of window and labelled as such.** **$150M Series A at a $1.05B valuation on August 25, 2026**, led by DCVC and Energize Capital, with **Nvidia, Samsung Ventures, GE Vernova and Salesforce Ventures** participating. Total raised more than **$220M**; the company says 12 Fortune Global 500 companies are now investors. Note [[GE Vernova]] on that cap table: the turbine maker in this brain's own published work is investing in the company whose product reduces the need for turbines.
- **The demonstrated result, out of window and labelled as such.** Under EPRI's **DCFlex** programme, with **Nvidia, Oracle Cloud Infrastructure, Salt River Project and Arizona Public Service**, a Phoenix data-centre cluster responded to a real power surge on a hot day (**May 3**) by cutting consumption **25%** and holding the reduction for **three consecutive hours**. This is the only independently-adjacent field result in the file and it is the one to lean on.
- **Vendor claims, flagged.** Nvidia's own case study cites **40% power-demand cuts in under a minute** and **100 GW of untapped grid capacity** unlockable through flexibility. Both are vendor figures published by an investor in the company. Use the Phoenix 25%-for-three-hours number in preference to either.

## Why it matters for the future
The 10-year read. Every player already in [[Energy is the Ceiling]] answers the ceiling by **adding supply** ([[GE Vernova]], [[Oklo]], [[Aalo Atomics]], [[Helion]], [[Commonwealth Fusion]], [[Mazama Energy]]) or by **owning permitted ground** ([[SB Energy]], [[Lancium]], Joulent). Emerald AI is the first that answers it by **subtracting demand at the moment demand is expensive**, and that is a fundamentally cheaper lever, because it requires no concrete. If flexibility becomes a standard condition of interconnection rather than a voluntary offer, then curtailable capacity becomes a priced, tradeable asset, and the most valuable thing a data centre owns after its chips is a credible promise about what it will not do.

The 20-year read, stated as a bet. Electricity has always been sold as a commodity with a price and, separately, rationed by physical queue. Flexible load collapses those two into one market: you will not buy megawatts, you will buy megawatts **with a shape**, and the shape will cost more than the energy. At that point the grid stops being a thing AI plugs into and becomes a thing AI is scheduled by, which reverses the direction of control that the whole buildout has assumed.

## Awareness watch
Obscure. Triggers to move it: any utility, ISO or state making flexibility a **condition** of a large-load interconnection; AEMA's first regulatory filings landing in the six federal proceedings opened in June; a hyperscaler publicly reporting curtailed hours as a metric; or a second flexibility software company raising at scale, which would make it a category.

## The honest risk
Four. First, **flexibility is unproven at the scale being claimed**: one Phoenix cluster for three hours is a demonstration, not a fleet behaviour, and the leap from that to 100 GW of unlocked capacity is enormous. Second, the economics depend on operators genuinely accepting slower jobs, and a company paying $50,000 an hour for a training cluster has a strong incentive to defect the moment it costs them a deadline. Third, **AEMA may be lobbying for an exemption rather than a standard**: a trade body whose members are the largest loads on the grid arguing about how those loads get treated is not a neutral party, and this note should not assume its aims and the public interest coincide. Fourth, the company is not yet two years old, and the most valuable asset on its balance sheet may be its investor list.

## Related
[[Energy is the Ceiling]], [[GE Vernova]], [[Lancium]], [[SB Energy]], [[Ore Energy]], [[Mazama Energy]], [[Eaton]]

## Used in
Lead for the story "Emerald AI - The Power You Promise Not to Use" (Content Engine/Ready to Ship, 2026-09-22). Do not reuse as a lead.
