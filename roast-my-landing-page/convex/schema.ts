import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  scans: defineTable({
    url: v.string(),
    hostname: v.string(),
    overallScore: v.number(),
    headlineBurn: v.string(),
    verdict: v.string(),
    benchmarkCite: v.optional(v.string()),
    sections: v.array(
      v.object({
        name: v.string(),
        score: v.number(),
        burn: v.string(),
        fix: v.string(),
      })
    ),
    email: v.optional(v.string()),
    unlocked: v.boolean(),
    shares: v.number(),
    refFrom: v.optional(v.string()), // scanId this scan was referred by
    createdAt: v.number(),
  })
    .index("by_score", ["overallScore"])
    .index("by_created", ["createdAt"]),

  // simple attribution log: which scan's share drove a visit / new scan
  referrals: defineTable({
    refScanId: v.string(),
    kind: v.string(), // "visit" | "scan" | "signup"
    at: v.number(),
  }).index("by_ref", ["refScanId"]),
});
