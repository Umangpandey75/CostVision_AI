# Metrics Strategy

## North Star Metric

**"Qualified Savings Identified per Audit"** 
= Total potential monthly savings across all users / number of audits

Why: This ties directly to Credex's core value - identifying overspend. Growth in this metric means the tool is finding more savings opportunities, which leads to more consultations.

## Three Input Metrics

### 1. Audit Completion Rate
**Current: 45%** (start form → see results)
**Target: 70%**

Drives: Form length (currently 2-3 min), tool discovery friction
Action: Add "quick add" buttons for common tools

### 2. Share Rate  
**Current: 5%** (results → share link)
**Target: 15%**

Drives: Results surprise/delight, visual design, incentive
Action: Add "share to unlock advanced benchmark" feature

### 3. High-Savings Rate (>$500/month)
**Current: 8%** of audits
**Target: 12%**

Drives: User targeting, enterprise features
Action: Add "enterprise audit" mode with deeper integration checks

## First Instrumentation

**Event tracking (MVP):**
- Form abandonment at each field
- Tool selection patterns
- Recommendation click-through
- Share button clicks by platform
- Email capture conversion

**Implementation:**
Segment snippet + custom events to Supabase analytics

## Pivot Trigger

**Number: <5% share rate for 2 consecutive weeks**

If share rate drops below 5%, the viral loop is broken. Pivot actions:
1. A/B test call-to-action copy on results page
2. Add savings badge generator (embed in blog)
3. Launch "compare with competitors" feature

**Secondary trigger:** Audit completion rate <30%
- Indicates form is too complex or value unclear
- Simplify to single-page form with progress indicator