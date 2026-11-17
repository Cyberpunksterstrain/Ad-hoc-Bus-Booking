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
- Design skills installed: Emil Kowalski skills (emil-design-eng, prototype, review-animations, break-ui, etc.), Impeccable, and the tasteskill plugin (`/taste-skill:design-taste-frontend`, used for the homepage redesign).
- Git identity for this repo: `Cyberpunksterstrain <Cyberpunksterstrain@users.noreply.github.com>` (set per repo, keeps the owner's email private).

## What's built

- Branch `feat/homepage-quote`, PR #1 (not merged). Preview: busbookings-git-feat-homepage-quote-ad-hoc-bus-booking.vercel.app
- Next.js 16 (App Router, TypeScript), @supabase/ssr browser client helper (`src/lib/supabase/client.ts`). `vercel.json` sets framework nextjs. Tailwind 4 is still installed but no longer used (see Design system).
- Homepage (`src/app/page.tsx`), redesigned 17 Nov 2026 with the tasteskill design kit: photo hero, instant quote, what's included, trips and prices, bus sizes, questions, closing call to action. `/credits` page lists the photo credits (`src/app/credits/page.tsx`).
- Instant quote calculator (`src/components/QuoteForm.tsx`): airport pickup/drop-off, point to point, hourly charter; Changi terminal picker; quick-pick hotels/attractions; Singapore time; 24h minimum notice (shown as a warning under the time); optional flight number; luggage-based bus pick; midnight/Sunday/airport surcharges; 50% deposit; display currencies (charged in SGD). It opens on a sample airport pickup three days ahead at 10:00 so a price shows at once. It has no submit button: nothing is sent until the booking flow exists.
- All prices are PLACEHOLDERS in `src/lib/pricing.ts`; every price on the page is read from there. Places list in `src/lib/places.ts`.
- Unbuilt claims still on the homepage: flight tracking, GPS on every bus and WhatsApp help (the "Included with every booking" section, and the FAQ answer about late flights).

## Design system (homepage)

- Styling comes from the tasteskill kit, copied as plain files into `public/assets/` (`system.css`, `system.js`, `layout/`, `motion/`, `moments/`, `ui/`, ...). Do not edit the kit files; page-specific CSS goes in `public/assets/page.css`, which also holds the colour and font tokens.
- The kit's scripts must run after React has hydrated the page, so they are added by `src/components/KitScripts.tsx` at the end of the page. Loading them from the layout or with `next/script` gets their changes wiped by hydration.
- Look: the brand's own colours (green `#0f6e56` on cream `#f7f6f2`, ink `#1c1c1a`), Red Hat Display and Red Hat Text, soft corners, one green primary button style.
- Photos in `public/assets/img/` are all free Wikimedia Commons stand-ins until the owner's own bus photos exist. When one is replaced, remove its line from `src/app/credits/page.tsx`. Shots wanted: own buses side-on, interior, luggage hold open, a driver meeting a group in Changi arrivals.
- Design checks: the skill's checker and finish gate run against localhost:3000. The last gate ended OPEN with 1 finding (the gap under the hero on phones, from the kit's own padding). Accepted exceptions are in `.taste-skill/waivers.json`.

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

The homepage design pass is done and pushed to PR #1. Next: the owner reviews the Vercel preview (desktop and phone), then the booking flow (build plan step 3).

Tracker (owner ticks progress here): https://claude.ai/artifact/JHNM4anXuHg7mSUkCXYFvj
