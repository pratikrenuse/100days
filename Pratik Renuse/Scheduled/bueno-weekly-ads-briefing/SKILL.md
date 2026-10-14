---
name: bueno-weekly-ads-briefing
description: Weekly Bueno (NOK) Meta Ads briefing, posted as a Slack DM every Monday 8am
---

You are generating a weekly Meta Ads performance briefing for the "Bueno" (NOK) ad account and posting it to the user as a Slack DM. Work autonomously; do not ask questions.

ACCOUNT
- Use the Meta Ads MCP (server prefix mcp__35569f71-3a8d-404d-900a-9d15b4309b13__).
- Ad account: Bueno (NOK), ad_account_id = 2716642581960365. NEVER use the Bueno Euro account (950938156109887).

DATA TO PULL (use tool ads_get_ad_entities)
1. Account totals for last_7d AND for the prior 7 days. Since there is no "previous_7d" preset, compute the prior week with an explicit time_range: this run's week is the 7 days ending last Sunday; the prior week is the 7 days before that. Use time_range '{"since":"YYYY-MM-DD","until":"YYYY-MM-DD"}'. Determine the dates from today's date at runtime.
   - level: account, fields: ["spend","impressions","reach","clicks","ctr","cpc","cpm"]
2. Campaign breakdown for last_7d:
   - level: campaign, fields: ["id","name","objective","effective_status","spend","impressions","clicks","ctr","cpc","cpm","results"], sort: "spend_descending", limit: 50
3. Ad set breakdown for last_7d:
   - level: adset, fields: ["id","name","effective_status","spend","impressions","clicks","ctr","cpc","cpm","results"], sort: "spend_descending", limit: 100
4. Anomalies: call ads_insights_anomaly_signal for ad_account_id 2716642581960365.

IMPORTANT FIELD NOTES (avoid validation errors)
- These field names are NOT valid and must NOT be requested: account_id, account_name, campaign_id, campaign_name, actions. Use "id" and "name" instead. Conversion counts come from the "results" object returned per entity.
- The response field ad_entities is a JSON STRING — parse it. Metric values come back pre-formatted (e.g. "NOK1.47", "4.72%").

ANALYSIS
- Compute week-over-week change for spend, CTR, CPC, CPM, and total clicks (this week vs prior week), with direction and % change.
- Identify cost per lead (campaigns/ad sets with leadgen results) and cost per registration (Registration Page pixel results) where derivable from spend / result counts.
- Call out the best and worst performing ad sets this week.
- IGNORE and do NOT mention anything about CAPI, Conversions API, CRM setup, or pixel/event-coverage recommendations. The user does not want those.

OUTPUT — post via Slack
- Use mcp__plugin_marketing_slack__slack_send_message with channel_id = "U0BAJ8RBZBQ" (the user's own DM).
- Format as a clean Slack markdown message titled "📊 Bueno Weekly Ads Briefing — <week date range>".
- Sections: (1) Headline — spend, clicks, CTR, CPC with WoW arrows (▲/▼ and %); (2) Campaigns — short table or list with spend, CTR, CPC, key result; (3) Ad set highlights — top performer and weakest, with cost per lead/registration; (4) Alerts — any anomalies in plain language; (5) 2-3 concrete action items (scale / fix / pause). Keep it tight and skimmable. Currency is NOK.
- After sending, report the Slack message link.