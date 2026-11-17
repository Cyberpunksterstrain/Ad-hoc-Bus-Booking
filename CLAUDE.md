@AGENTS.md

# Ad-hoc Bus Booking: project context (updated 17 Nov 2026)

## Goal

Become the number one ad-hoc bus provider in Singapore. Public booking website, AI agents handling customer support, linked to operations and bus GPS (alert operators when a bus isn't moving or isn't near pickup). Owner runs an existing bus company and already invoices corporate customers in Xero.

## Accounts and setup (done)

- GitHub repo: Cyberpunksterstrain/Ad-hoc-Bus-Booking (private)
- Local copy: `C:\WebsiteProjects\Ad-hoc-Bus-Booking` (Windows, outside OneDrive). Dev server: `npm run dev` → localhost:3000. Preview launch config lives in `C:\WebsiteProjects\.claude\launch.json`.
- Vercel project: busbookings → busbookings-five.vercel.app (auto-deploys from GitHub; every branch gets a preview link)
- Supabase project: busdomination (ID eezihgtheeaocogwxufp), region ap-southeast-1 Singapore, org "Ad Hoc Bus Booking", free plan
- Supabase ↔ Vercel linked via integration, no prefix, keys marked Sensitive, Production + Preview only. For local dev, copy `NEXT_PUBLIC_SUPABASE_URL` and the publishable/anon key from Supabase into `.env.local`. Never commit `.env.local` or any key.
- Design skills installed: Emil Kowalski skills (emil-design-eng, prototype, review-animations, break-ui, etc.) and Impeccable.

## What's built

- Branch `feat/homepage-quote`, PR #1 (not merged). Preview: busbookings-git-feat-homepage-quote-ad-hoc-bus-booking.vercel.app
- Next.js 16 (App Router, TypeScript), Tailwind 4, @supabase/ssr browser client helper (`src/lib/supabase/client.ts`). `vercel.json` sets framework nextjs.
- Homepage + instant quote form (`src/components/QuoteForm.tsx`): airport pickup/drop-off, point to point, hourly charter; Changi terminal picker; quick-pick hotels/attractions; Singapore time; 24h minimum notice; flight number; luggage-based bus pick; midnight/Sunday/airport surcharges; 50% deposit; display currencies (charged in SGD)
- All prices are PLACEHOLDERS in `src/lib/pricing.ts`. Places list in `src/lib/places.ts`.
- Homepage feature cards mention flight tracking, live GPS and WhatsApp help: not built yet.

## Decisions so far

- Customers include overseas visitors: flight tracking for airport pickups, international WhatsApp numbers, multi-language bot replies, Alipay/WeChat Pay via Stripe, bigger deposit or full prepayment, clear cancelled-flight policy.
- B2B: business accounts for travel agents and event planners, paid by monthly Xero invoice.
- Bots: Concierge (triage), Booking (quotes, changes), Dispatch (GPS + flights), Billing (refunds, Xero), human operator for escalations. Owner sets spending/refund limits; bots act alone only within them.
- AI model must be one setting (Claude, Grok via xAI's OpenAI-compatible API, or both).
- WhatsApp: needs a new dedicated number (not already on WhatsApp) on the WhatsApp Business Platform; Meta verification takes days.
- Workflow: work on branches, owner reviews Vercel preview before merging. Owner is non-technical: explain in plain words, step by step.

## Build plan

1. Rules and brand: real rates, deposit/cancellation policy, name, logo, domain
2. Design: brand kit, real bus photos, trust signals, mobile first, translated pages later (Chinese first)
3. Booking flow: customer details, save to Supabase, Stripe (cards, PayNow, Alipay, WeChat Pay), email + WhatsApp confirmations, My booking page
4. Operations: dispatch board, driver trip links, Xero draft invoices, business accounts
5. GPS: provider API, live map, not-moving / not-near-pickup alerts
6. AI agents with limits and human escalation
7. SEO: one page per search (Changi transfer, 40-seater charter, JB, weddings, events), Google Business Profile, reviews, structured data, sitemap, FAQ
8. Marketing: Google Search ads, Klook/KKday/Viator, outreach to hotels/planners/agents, referral code, TikTok/Instagram videos

## Waiting on the owner

- Real rates, surcharges, deposit and cancellation policy
- Company name, logo, domain
- Whether to do Malaysia cross-border trips (adds passport details and border pricing)
- Stripe business verification and new WhatsApp number + Meta verification (both have waiting periods)

## Before launch

- Build or remove the unbuilt claims on the homepage
- Upgrade Supabase to paid; privacy policy (PDPA), terms, GST shown clearly on prices

## Next step

Design pass on the homepage and quote form using the installed design skills, then the booking flow.

Tracker (owner ticks progress here): https://claude.ai/artifact/JHNM4anXuHg7mSUkCXYFvj
