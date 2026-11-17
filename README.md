# Ad-hoc Bus Booking

Public booking website for ad-hoc bus trips in Singapore (airport transfers, point-to-point, hourly charters).

**Stack:** Next.js (App Router) · Supabase (Singapore region) · Vercel · Tailwind CSS

## Where to change things
- **Prices, surcharges, deposit, bus sizes:** `src/lib/pricing.ts` (currently placeholder numbers)
- **Quick-pick pickup/drop-off places:** `src/lib/places.ts`
- **Homepage text:** `src/app/page.tsx`
- **Quote form:** `src/components/QuoteForm.tsx`

## Environment variables
Set automatically in Vercel by the Supabase integration. Never commit keys to this repo.

## Run locally
```bash
npm install
npm run dev
```
