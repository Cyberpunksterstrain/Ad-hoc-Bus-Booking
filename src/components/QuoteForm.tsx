"use client";

import { useMemo, useState } from "react";
import { CURRENCIES, RULES, calculateQuote, hoursUntilSgt, type TripType } from "@/lib/pricing";
import { AIRPORT_TERMINALS, POPULAR_PLACES } from "@/lib/places";

const TRIP_TYPES: { id: TripType; label: string }[] = [
  { id: "airport-arrival", label: "Airport pickup" },
  { id: "airport-departure", label: "Airport drop-off" },
  { id: "transfer", label: "Point to point" },
  { id: "hourly", label: "Hourly charter" },
];

const inputCls =
  "w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelCls = "mb-1 block text-sm font-medium text-black/70";

function money(sgd: number, cur: string) {
  const c = CURRENCIES[cur];
  return `${c.label}${(sgd * c.perSgd).toLocaleString("en-SG", { maximumFractionDigits: 0 })}`;
}

export default function QuoteForm() {
  const [tripType, setTripType] = useState<TripType>("airport-arrival");
  const [pickup, setPickup] = useState(AIRPORT_TERMINALS[0]);
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(10);
  const [luggage, setLuggage] = useState(10);
  const [hours, setHours] = useState(RULES.minCharterHours);
  const [flight, setFlight] = useState("");
  const [currency, setCurrency] = useState("SGD");
  const [submitted, setSubmitted] = useState(false);

  const isArrival = tripType === "airport-arrival";
  const isDeparture = tripType === "airport-departure";

  function chooseTrip(t: TripType) {
    setTripType(t);
    if (t === "airport-arrival") {
      setPickup(AIRPORT_TERMINALS[0]);
      if (AIRPORT_TERMINALS.includes(dropoff)) setDropoff("");
    } else if (t === "airport-departure") {
      setDropoff(AIRPORT_TERMINALS[0]);
      if (AIRPORT_TERMINALS.includes(pickup)) setPickup("");
    } else {
      if (AIRPORT_TERMINALS.includes(pickup)) setPickup("");
      if (AIRPORT_TERMINALS.includes(dropoff)) setDropoff("");
    }
    setSubmitted(false);
  }

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!pickup.trim()) e.pickup = "Enter a pickup point";
    if (tripType !== "hourly" && !dropoff.trim()) e.dropoff = "Enter a drop-off point";
    if (!date) e.date = "Choose a date";
    if (!time) e.time = "Choose a time";
    if (date && time && hoursUntilSgt(date, time) < RULES.minHoursInAdvance)
      e.time = `Book at least ${RULES.minHoursInAdvance} hours ahead`;
    if (isArrival && !/^[A-Za-z0-9]{2}\s?\d{1,4}[A-Za-z]?$/.test(flight.trim()))
      e.flight = "Enter your flight number, like SQ 231";
    if (passengers < 1) e.passengers = "At least 1 passenger";
    return e;
  }, [pickup, dropoff, date, time, flight, passengers, tripType, isArrival]);

  const quote = useMemo(
    () => (date && time ? calculateQuote({ tripType, date, time, passengers, luggage, hours }) : null),
    [tripType, date, time, passengers, luggage, hours],
  );

  const showErr = (k: string) =>
    submitted && errors[k] ? <p className="mt-1 text-[13px] text-red-700">{errors[k]}</p> : null;

  const placeList = isArrival || isDeparture ? POPULAR_PLACES : [...AIRPORT_TERMINALS, ...POPULAR_PLACES];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <form
        className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        noValidate
      >
        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Trip type">
          {TRIP_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tripType === t.id}
              onClick={() => chooseTrip(t.id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                tripType === t.id ? "bg-brand text-white" : "bg-black/5 text-black/70 hover:bg-black/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <datalist id="places">
          {placeList.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className={tripType === "hourly" ? "sm:col-span-2" : ""}>
            <label className={labelCls} htmlFor="pickup">
              Pickup
            </label>
            {isArrival ? (
              <select id="pickup" className={inputCls} value={pickup} onChange={(e) => setPickup(e.target.value)}>
                {AIRPORT_TERMINALS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            ) : (
              <input
                id="pickup"
                list="places"
                className={inputCls}
                placeholder="Hotel name, address or attraction"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            )}
            {showErr("pickup")}
          </div>

          {tripType !== "hourly" && (
            <div>
              <label className={labelCls} htmlFor="dropoff">
                Drop-off
              </label>
              {isDeparture ? (
                <select id="dropoff" className={inputCls} value={dropoff} onChange={(e) => setDropoff(e.target.value)}>
                  {AIRPORT_TERMINALS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              ) : (
                <input
                  id="dropoff"
                  list="places"
                  className={inputCls}
                  placeholder="Hotel name, address or attraction"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                />
              )}
              {showErr("dropoff")}
            </div>
          )}

          <div>
            <label className={labelCls} htmlFor="date">
              Date
            </label>
            <input id="date" type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
            {showErr("date")}
          </div>
          <div>
            <label className={labelCls} htmlFor="time">
              {isArrival ? "Flight lands at" : "Pickup time"} <span className="font-normal text-black/50">(Singapore time)</span>
            </label>
            <input id="time" type="time" className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} />
            {showErr("time")}
          </div>

          {isArrival && (
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="flight">
                Flight number
              </label>
              <input
                id="flight"
                className={inputCls}
                placeholder="SQ 231"
                value={flight}
                onChange={(e) => setFlight(e.target.value.toUpperCase())}
              />
              <p className="mt-1 text-[13px] text-black/50">We track your flight and adjust pickup if it&apos;s delayed.</p>
              {showErr("flight")}
            </div>
          )}

          <div>
            <label className={labelCls} htmlFor="pax">
              Passengers
            </label>
            <input
              id="pax"
              type="number"
              min={1}
              max={200}
              className={inputCls}
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            />
            {showErr("passengers")}
          </div>
          <div>
            <label className={labelCls} htmlFor="bags">
              Large suitcases
            </label>
            <input
              id="bags"
              type="number"
              min={0}
              max={200}
              className={inputCls}
              value={luggage}
              onChange={(e) => setLuggage(Number(e.target.value))}
            />
          </div>

          {tripType === "hourly" && (
            <div>
              <label className={labelCls} htmlFor="hours">
                Hours needed <span className="font-normal text-black/50">(min {RULES.minCharterHours})</span>
              </label>
              <input
                id="hours"
                type="number"
                min={RULES.minCharterHours}
                max={24}
                className={inputCls}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-brand py-3 text-[15px] font-medium text-white transition hover:bg-brand-dark"
        >
          Get my quote
        </button>
      </form>

      <aside className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6" aria-live="polite">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your quote</h2>
          <select
            aria-label="Display currency"
            className="rounded-md border border-black/15 bg-white px-2 py-1 text-sm"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {!quote ? (
          <p className="text-[15px] text-black/60">Pick a date and time to see your price instantly.</p>
        ) : !quote.ok ? (
          <p className="text-[15px] text-black/70">{quote.reason}</p>
        ) : (
          <div>
            <p className="mb-3 inline-block rounded-md bg-brand-light px-2.5 py-1 text-sm font-medium text-brand-dark">
              Recommended: {quote.bus.name} · up to {quote.bus.maxLuggage} suitcases
            </p>
            <ul className="space-y-2 border-b border-black/10 pb-3 text-[15px]">
              {quote.lines.map((l) => (
                <li key={l.label} className="flex justify-between gap-4">
                  <span className="text-black/70">{l.label}</span>
                  <span>{money(l.amount, currency)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-medium">Total</span>
              <span className="text-2xl font-semibold">{money(quote.total, currency)}</span>
            </div>
            {currency !== "SGD" && (
              <p className="mt-1 text-right text-[13px] text-black/50">
                Approximate. You&apos;ll be charged S${quote.total.toLocaleString("en-SG")}.
              </p>
            )}
            <p className="mt-3 text-sm text-black/60">
              Pay {RULES.depositPct}% ({money(quote.deposit, currency)}) to confirm. Free cancellation up to{" "}
              {RULES.freeCancellationHours} hours before pickup.
            </p>

            {submitted && Object.keys(errors).length === 0 ? (
              <div className="mt-5 rounded-lg bg-brand-light p-3 text-sm text-brand-dark">
                Online booking and payment are coming in the next update. Your quote is ready.
              </div>
            ) : submitted ? (
              <p className="mt-5 text-sm text-red-700">Fix the highlighted fields to continue.</p>
            ) : null}
          </div>
        )}
        <p className="mt-6 border-t border-black/10 pt-4 text-[13px] text-black/45">
          Prices shown are sample prices while the site is being set up.
        </p>
      </aside>
    </div>
  );
}
