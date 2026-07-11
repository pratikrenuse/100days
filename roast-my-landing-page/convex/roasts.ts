import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const sectionValidator = v.object({
  name: v.string(),
  score: v.number(),
  burn: v.string(),
  fix: v.string(),
});

// Store a completed roast. Returns the scanId (also used as the share ref code).
export const createScan = mutation({
  args: {
    url: v.string(),
    hostname: v.string(),
    overallScore: v.number(),
    headlineBurn: v.string(),
    verdict: v.string(),
    benchmarkCite: v.optional(v.string()),
    sections: v.array(sectionValidator),
    refFrom: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("scans", {
      ...args,
      unlocked: false,
      shares: 0,
      createdAt: Date.now(),
    });
    // if this scan came from someone's share, log the attribution
    if (args.refFrom) {
      await ctx.db.insert("referrals", {
        refScanId: args.refFrom,
        kind: "scan",
        at: Date.now(),
      });
    }
    return id;
  },
});

// Email gate: capture the email and unlock the full teardown + voice.
export const unlockScan = mutation({
  args: { scanId: v.id("scans"), email: v.string() },
  handler: async (ctx, args) => {
    const scan = await ctx.db.get(args.scanId);
    if (!scan) throw new Error("Scan not found");
    await ctx.db.patch(args.scanId, { email: args.email, unlocked: true });
    if (scan.refFrom) {
      await ctx.db.insert("referrals", {
        refScanId: scan.refFrom,
        kind: "signup",
        at: Date.now(),
      });
    }
    return true;
  },
});

// Fetch one scan (returning founder, or opening a shared link).
export const getScan = query({
  args: { scanId: v.id("scans") },
  handler: async (ctx, args) => await ctx.db.get(args.scanId),
});

// Count a share click on a scan.
export const logShare = mutation({
  args: { scanId: v.id("scans") },
  handler: async (ctx, args) => {
    const scan = await ctx.db.get(args.scanId);
    if (!scan) return false;
    await ctx.db.patch(args.scanId, { shares: (scan.shares || 0) + 1 });
    return true;
  },
});

// Log a visit that arrived via a share ref code.
export const logVisit = mutation({
  args: { refScanId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("referrals", { refScanId: args.refScanId, kind: "visit", at: Date.now() });
    return true;
  },
});

// The "wall of shame" — most brutal (lowest) scores on top. Reactive.
export const topBrutal = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("scans").withIndex("by_score").order("asc").take(20);
    return rows.map((r) => ({
      hostname: r.hostname,
      overallScore: r.overallScore,
      headlineBurn: r.headlineBurn,
      shares: r.shares || 0,
    }));
  },
});

// Funnel numbers for the demo dashboard (scans, signups, shares, referred scans).
export const funnelStats = query({
  args: {},
  handler: async (ctx) => {
    const scans = await ctx.db.query("scans").collect();
    const referrals = await ctx.db.query("referrals").collect();
    return {
      totalScans: scans.length,
      totalSignups: scans.filter((s) => s.unlocked).length,
      totalShares: scans.reduce((n, s) => n + (s.shares || 0), 0),
      referredScans: referrals.filter((r) => r.kind === "scan").length,
      referredSignups: referrals.filter((r) => r.kind === "signup").length,
    };
  },
});
