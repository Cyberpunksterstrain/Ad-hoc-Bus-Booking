// ─────────────────────────────────────────────────────────────
// PRICING RULES — ALL NUMBERS BELOW ARE PLACEHOLDERS.
// Replace them with the real rates. Everything on the website
// (quotes, deposits, bus suggestions) is calculated from this file.
// ─────────────────────────────────────────────────────────────

export type BusSize = {
  id: string;
  name: string;
  seats: number;
  maxLuggage: number; // large suitcases
  transferPrice: number; // SGD, one-way point-to-point or airport transfer
  hourlyRate: number; // SGD per hour, hourly charter
};

export const BUSES: BusSize[] = [
  { id: "13", name: "13-seater", seats: 13, maxLuggage: 10, transferPrice: 90, hourlyRate: 55 },
  { id: "23", name: "23-seater", seats: 23, maxLuggage: 18, transferPrice: 120, hourlyRate: 65 },
  { id: "40", name: "40-seater", seats: 40, maxLuggage: 35, transferPrice: 160, hourlyRate: 75 },
  { id: "45", name: "45-seater", seats: 45, maxLuggage: 40, transferPrice: 180, hourlyRate: 85 },
];

export const RULES = {
  minCharterHours: 3,
  midnight: { fromHour: 23, toHour: 7, surchargePct: 20 }, // 23:00–06:59
  sundaySurchargePct: 10,
  airportPickupFee: 20, // meet-and-greet + airport parking, arrivals only
  depositPct: 50,
  minHoursInAdvance: 24,
  freeCancellationHours: 48,
};

// Approximate display rates only — charging is always in SGD.
export const CURRENCIES: Record<string, { label: string; perSgd: number }> = {
  SGD: { label: "S$", perSgd: 1 },
  USD: { label: "US$", perSgd: 0.77 },
  AUD: { label: "A$", perSgd: 1.17 },
  MYR: { label: "RM", perSgd: 3.4 },
  CNY: { label: "¥", perSgd: 5.5 },
};

export type TripType = "airport-arrival" | "airport-departure" | "transfer" | "hourly";

export type QuoteInput = {
  tripType: TripType;
  date: string; // YYYY-MM-DD (Singapore time)
  time: string; // HH:MM (Singapore time)
  passengers: number;
  luggage: number;
  hours?: number;
};

export type QuoteLine = { label: string; amount: number };

export type Quote =
  | { ok: true; bus: BusSize; lines: QuoteLine[]; total: number; deposit: number }
  | { ok: false; reason: string };

export function pickBus(passengers: number, luggage: number): BusSize | null {
  return BUSES.find((b) => b.seats >= passengers && b.maxLuggage >= luggage) ?? null;
}

const round = (n: number) => Math.round(n * 100) / 100;

export function calculateQuote(input: QuoteInput): Quote {
  if (!input.passengers || input.passengers < 1) {
    return { ok: false, reason: "Enter the number of passengers." };
  }
  const bus = pickBus(input.passengers, input.luggage || 0);
  if (!bus) {
    return {
      ok: false,
      reason:
        "Your group needs more than one bus. Send us your details and we'll quote you within the hour.",
    };
  }

  const lines: QuoteLine[] = [];
  if (input.tripType === "hourly") {
    const hours = Math.max(RULES.minCharterHours, input.hours || 0);
    lines.push({ label: `${bus.name} charter, ${hours} hours × S$${bus.hourlyRate}`, amount: hours * bus.hourlyRate });
  } else {
    lines.push({ label: `${bus.name} transfer`, amount: bus.transferPrice });
  }
  const base = lines[0].amount;

  const hour = Number(input.time.split(":")[0]);
  const { fromHour, toHour, surchargePct } = RULES.midnight;
  if (hour >= fromHour || hour < toHour) {
    lines.push({ label: `Midnight surcharge (${surchargePct}%)`, amount: round((base * surchargePct) / 100) });
  }

  // Day of week for the Singapore date (date string has no timezone, so read it as UTC).
  const day = new Date(`${input.date}T00:00:00Z`).getUTCDay();
  if (day === 0) {
    lines.push({
      label: `Sunday surcharge (${RULES.sundaySurchargePct}%)`,
      amount: round((base * RULES.sundaySurchargePct) / 100),
    });
  }

  if (input.tripType === "airport-arrival") {
    lines.push({ label: "Airport meet-and-greet and parking", amount: RULES.airportPickupFee });
  }

  const total = round(lines.reduce((s, l) => s + l.amount, 0));
  return { ok: true, bus, lines, total, deposit: round((total * RULES.depositPct) / 100) };
}

// Current date-time in Singapore, as minutes since epoch-like comparable values.
export function hoursUntilSgt(date: string, time: string, now: Date = new Date()): number {
  const target = Date.parse(`${date}T${time}:00+08:00`);
  return (target - now.getTime()) / 3_600_000;
}
