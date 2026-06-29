# Tests Documentation

## Automated Tests

### 1. lib/__tests__/auditEngine.test.js
**What it covers:** Core audit engine logic including savings calculations, plan recommendations, and optimal detection

**Test cases:**
- Should detect overkill team plan for single user
- Should find cheaper alternatives for coding use case
- Should calculate correct monthly savings
- Should identify optimal setups correctly
- Should handle invalid inputs gracefully

**Run with:** `npm test`

### 2. lib/__tests__/pricingData.test.js
**What it covers:** Pricing data integrity and calculation functions

**Test cases:**
- All tools have valid pricing data
- Price calculations account for per-seat correctly
- Individual plans exist for each tool

### 3. lib/__tests__/rateLimit.test.js
**What it covers:** Rate limiting functionality for API protection

**Test cases:**
- Allows requests under limit
- Blocks requests over limit
- Resets after time window