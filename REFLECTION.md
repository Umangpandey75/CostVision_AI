## 1. The hardest bug

The hardest bug was when the audit engine would incorrectly calculate savings for team plans. My initial logic assumed all plans were per-seat, but Claude and ChatGPT Team plans have minimum 2 seats even if you only need 1. I debugged by adding console logs for each calculation step, then realizing the pricing data needed a `minSeats` field. I fixed by updating the `getPlanPrice` function to enforce minimum seats.

## 2. Decision I reversed

Mid-week, I reversed my decision to use AI for the entire audit calculation. Initially I thought GPT-4 could handle the logic, but after testing, the AI would give inconsistent results and sometimes hallucinate pricing. I switched to hardcoded rules with the AI only used for the summary paragraph. This was the right call for accuracy and user trust.

## 3. What I'd build in week 2

In week 2, I'd add:
- Browser extension to auto-detect AI subscriptions from email
- Slack bot for team usage analytics
- Benchmarking against anonymized peer data
- PDF export with custom branding for agencies

## 4. How I used AI tools

I used Claude 3.5 Sonnet for:
- Initial component structure (80% generated, 20% modified)
- Writing test cases
- Generating documentation outlines

I didn't trust AI with:
- Financial calculation logic (too risky)
- Pricing data (needs human verification)
- User interview insights (needs real human conversations)

One time AI was wrong: It suggested GitHub Copilot Enterprise for a single developer, but that plan requires minimum 100 seats. I caught it by reading the actual pricing page.

## 5. Self-rating

- **Discipline: 8/10** - Worked 5+ distinct days, logged progress daily
- **Code quality: 8/10** - Clean components, good error handling, but could add more types
- **Design sense: 7/10** - Functional but not award-winning; Tailwind helped
- **Problem-solving: 9/10** - Debugged complex audit logic effectively
- **Entrepreneurial thinking: 8/10** - Did real user interviews, thought about GTM