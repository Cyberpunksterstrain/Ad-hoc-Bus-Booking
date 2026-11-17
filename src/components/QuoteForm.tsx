"use client";

// The instant quote, in the kit's field markup (references/system.md, Forms). Nothing is sent yet: online booking
// and payment come in a later update, so this is a price calculator, not a form, and it has no submit button.
// It opens on a sample trip (an airport pickup three days ahead at 10:00) so the price shows at once.
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CURRENCIES, RULES, calculateQuote, hoursUntilSgt, type TripType } from "@/lib/pricing";
import { AIRPORT_TERMINALS, POPULAR_PLACES } from "@/lib/places";

const TRIP_TYPES: { id: TripType; label: string }[] = [
  { id: "airport-arrival", label: "Airport pickup" },
  { id: "airport-departure", label: "Airport drop-off" },
  { id: "transfer", label: "Point to point" },
  { id: "hourly", label: "Hourly charter" },
];

function money(sgd: number, cur: string) {
  const c = CURRENCIES[cur];
  return `${c.label}${(sgd * c.perSgd).toLocaleString("en-SG", { maximumFractionDigits: 0 })}`;
}

// A date a few days ahead, as YYYY-MM-DD in Singapore time.
function sgtDateInDays(days: number) {
  const d = new Date(Date.now() + days * 86_400_000 + 8 * 3_600_000);
  return d.toISOString().slice(0, 10);
}

// Renders the split's two halves (the fields under the section's heading, then the price card) into the
// section's .wrap, which is the grid: on a tablet or phone each half takes a screen of its own.
export default function QuoteForm({ children }: { children: ReactNode }) {
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

  // Set after hydration, so the server and the browser render the same first HTML.
  useEffect(() => {
    // a timer, not requestAnimationFrame, which never fires in a tab opened in the background
    const id = setTimeout(() => {
      setDate((d) => d || sgtDateInDays(3));
      setTime((t) => t || "10:00");
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const isArrival = tripType === "airport-arrival";
  const isDeparture = tripType === "airport-departure";
  const isHourly = tripType === "hourly";

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
  }

  const quote = useMemo(
    () => (date && time ? calculateQuote({ tripType, date, time, passengers, luggage, hours }) : null),
    [tripType, date, time, passengers, luggage, hours],
  );
  const tooSoon = Boolean(date && time && hoursUntilSgt(date, time) < RULES.minHoursInAdvance);

  const placeList = isArrival || isDeparture ? POPULAR_PLACES : [...AIRPORT_TERMINALS, ...POPULAR_PLACES];

  return (
    <>
      <div className="quote__form span-6" role="group" aria-label="Trip details">
        {children}
        <fieldset className="trip">
          <legend className="sr-only">Trip</legend>
          {TRIP_TYPES.map((t) => (
            <label key={t.id} className="trip__opt">
              <input type="radio" name="trip" value={t.id} checked={tripType === t.id} onChange={() => chooseTrip(t.id)} />
              <span>{t.label}</span>
            </label>
          ))}
        </fieldset>

        <datalist id="places">
          {placeList.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>

        <div className="form">
          <div className={`field${isHourly ? " field--full" : ""}`}>
            <label htmlFor="q-pickup">Pickup</label>
            {isArrival ? (
              <select id="q-pickup" value={pickup} onChange={(e) => setPickup(e.target.value)}>
                {AIRPORT_TERMINALS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            ) : (
              <input id="q-pickup" list="places" autoComplete="off" value={pickup} onChange={(e) => setPickup(e.target.value)} />
            )}
          </div>

          {!isHourly && (
            <div className="field">
              <label htmlFor="q-dropoff">Drop-off</label>
              {isDeparture ? (
                <select id="q-dropoff" value={dropoff} onChange={(e) => setDropoff(e.target.value)}>
                  {AIRPORT_TERMINALS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              ) : (
                <input id="q-dropoff" list="places" autoComplete="off" value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
              )}
            </div>
          )}

          <div className="field">
            <label htmlFor="q-date">Date</label>
            <input id="q-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="q-time">{isArrival ? "Flight lands, Singapore time" : "Pickup, Singapore time"}</label>
            <input
              id="q-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              aria-invalid={tooSoon || undefined}
              aria-describedby={tooSoon ? "q-time-err" : undefined}
            />
            {tooSoon && (
              <p className="field__error" id="q-time-err">
                Choose a time at least {RULES.minHoursInAdvance} hours from now
              </p>
            )}
          </div>

          {isArrival && (
            <div className="field field--full">
              <label htmlFor="q-flight">Flight number, if you have it</label>
              <input id="q-flight" autoComplete="off" value={flight} onChange={(e) => setFlight(e.target.value.toUpperCase())} />
            </div>
          )}

          <div className="field">
            <label htmlFor="q-passengers">Passengers</label>
            <input
              id="q-passengers"
              type="number"
              inputMode="numeric"
              min={1}
              max={200}
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label htmlFor="q-bags">Large suitcases</label>
            <input
              id="q-bags"
              type="number"
              inputMode="numeric"
              min={0}
              max={200}
              value={luggage}
              onChange={(e) => setLuggage(Number(e.target.value))}
            />
          </div>

          {isHourly && (
            <div className="field">
              <label htmlFor="q-hours">Hours, {RULES.minCharterHours} at least</label>
              <input
                id="q-hours"
                type="number"
                inputMode="numeric"
                min={RULES.minCharterHours}
                max={24}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>
          )}
        </div>
      </div>

      <aside className="quote__card span-6 start-7" aria-live="polite" aria-labelledby="quote-card-h">
        <div className="quote__head">
          <h3 id="quote-card-h" className="t-card">
            Your quote
          </h3>
          <div className="field quote__cur">
            <label htmlFor="q-currency">Currency</label>
            <select id="q-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {Object.keys(CURRENCIES).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {!quote ? (
          <p className="muted">Choose a date and time to see the price.</p>
        ) : !quote.ok ? (
          <p>{quote.reason}</p>
        ) : (
          <>
            <p className="quote__bus">
              {quote.bus.name}, up to {quote.bus.maxLuggage} large suitcases
            </p>
            <ul className="rows">
              {quote.lines.map((l) => (
                <li key={l.label}>
                  <span>{l.label}</span>
                  <span className="rows__value">{money(l.amount, currency)}</span>
                </li>
              ))}
            </ul>
            <p className="quote__total">
              <span>Total</span>
              <span className="t-stat">{money(quote.total, currency)}</span>
            </p>
            {currency !== "SGD" && (
              <p className="t-small muted">A guide only. We charge S${quote.total.toLocaleString("en-SG")}.</p>
            )}
            <p>
              A {RULES.depositPct}% deposit of {money(quote.deposit, currency)} confirms it. Free cancellation up to{" "}
              {RULES.freeCancellationHours} hours before pickup. Online booking and payment come in the next update.
            </p>
            <p>
              <a className="link" href="#fleet">
                Compare bus sizes
              </a>
            </p>
          </>
        )}
        <p className="t-small muted">Prices are not final while the site is being set up.</p>
      </aside>
    </>
  );
}
