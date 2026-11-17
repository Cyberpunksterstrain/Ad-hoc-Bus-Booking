/*
  type: service (page-type service, site-kind other): ad-hoc bus charter in Singapore
  deal: hero film (no film yet: a still photograph in the cinema frame, no play control), nav nav-mega,
        close close-type, footer footer-columns (footer-visit re-dealt: no door to visit), rhythm dark-band,
        buttons solid, mark stack, palette the client's own colours (start.mjs brand: #f7f6f2 / #1c1c1a /
        #0f6e56), type red-hat, radius soft
  moments: picture-develops on the fleet photograph (#fleet)
  screens at 1440x900: hero 1, quote 1, included 1, trips 1, fleet 1, questions 1, footer.closing 1
  photographs: every one is a stand-in from Wikimedia Commons until the client's own are shot
*/
import KitScripts from "@/components/KitScripts";
import QuoteForm from "@/components/QuoteForm";
import { BUSES, RULES } from "@/lib/pricing";

const MAIN_ACTION = "Get a quote";

const smallest = BUSES[0];
const largest = BUSES[BUSES.length - 1];

const TRIPS = [
  {
    name: "Airport pickup",
    line: "Your driver meets you in arrivals and follows your flight.",
    from: `from S$${smallest.transferPrice + RULES.airportPickupFee}`,
  },
  { name: "Airport drop-off", line: "From your hotel to any Changi terminal or Seletar Airport.", from: `from S$${smallest.transferPrice}` },
  { name: "Point to point", line: "Hotels, attractions, cruise centres and the land checkpoints.", from: `from S$${smallest.transferPrice}` },
  {
    name: "Hourly charter",
    line: `A bus and driver for as long as you need, ${RULES.minCharterHours} hours at least.`,
    from: `from S$${smallest.hourlyRate} an hour`,
  },
];

const INCLUDED = [
  { title: "The full price before booking", body: "Surcharges and airport fees are in the price you see, before you pay anything." },
  { title: "A bus that waits for late flights", body: "Airport pickups move with your landing time. If the flight is late, your driver waits." },
  { title: "GPS on every bus", body: "We know where your bus is before you need to ask." },
  { title: "WhatsApp help in your language", body: "Message us in English, 中文, 日本語, 한국어 and more." },
];

const QUESTIONS = [
  { q: "How far ahead do I need to book?", a: `At least ${RULES.minHoursInAdvance} hours before pickup.` },
  {
    q: "Does the bus wait if my flight is late?",
    a: "Yes. We track your flight and move the pickup to when it lands. Your driver waits for you in arrivals.",
  },
  {
    q: "Which surcharges are added to the price?",
    a: `${RULES.midnight.surchargePct}% from 23:00 to 06:59, ${RULES.sundaySurchargePct}% on Sundays, and S$${RULES.airportPickupFee} for airport meet-and-greet and parking. The quote lists each one.`,
  },
  {
    q: "How do I pay for a booking?",
    a: `A ${RULES.depositPct}% deposit confirms the booking. We charge in Singapore dollars; other currencies in the quote are a guide.`,
  },
  { q: "Can I cancel a booking?", a: `Yes. Cancelling is free up to ${RULES.freeCancellationHours} hours before pickup.` },
  {
    q: `What if my group is bigger than ${largest.seats}?`,
    a: "Then you need more than one bus. Send us your trip and we quote you within the hour.",
  },
];

function Arrow() {
  return (
    <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
      <path className="m-arrow__stem" d="M1 6h8" />
      <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
    </svg>
  );
}

function Logo() {
  return (
    <a className="nav__logo" href="#top">
      <span className="mark" data-mark="stack" aria-hidden="true"></span>Ad-hoc Bus Booking
    </a>
  );
}

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#top">
            Skip to content
          </a>
          <Logo />
          <nav className="nav__links" aria-label="Main">
            <div className="nav__item">
              <a className="nav__link" href="#trips">
                Trips{" "}
                <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div className="nav__menu">
                <div className="wrap grid">
                  <div className="menu-col span-3">
                    <p className="t-label">Airport</p>
                    <a href="#trips">
                      Airport pickup<span>Met in arrivals</span>
                    </a>
                    <a href="#trips">
                      Airport drop-off<span>To any Changi terminal</span>
                    </a>
                  </div>
                  <div className="menu-col span-3">
                    <p className="t-label">Around Singapore</p>
                    <a href="#trips">
                      Point to point<span>Hotels, attractions, checkpoints</span>
                    </a>
                    <a href="#trips">
                      Hourly charter<span>{RULES.minCharterHours} hours at least</span>
                    </a>
                  </div>
                  <a className="menu-card span-3 start-10" href="#fleet">
                    <div className="panel">
                      <img
                        className="frame__img"
                        src="/assets/img/photo-f116687946-960.jpg"
                        alt="The open luggage hold of a coach, with room for suitcases"
                        width="960"
                        height="640"
                        data-source="stand-in"
                        data-subject="luggage hold"
                      />
                    </div>
                    <span className="t-card">Room for bags</span>
                    <span className="t-small muted">Up to {largest.maxLuggage} large suitcases</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="nav__item">
              <a className="nav__link" href="#fleet">
                Buses
              </a>
            </div>
            <div className="nav__item">
              <a className="nav__link" href="#included">
                Included
              </a>
            </div>
            <div className="nav__item">
              <a className="nav__link" href="#questions">
                Questions
              </a>
            </div>
          </nav>
          <div className="nav__actions">
            <a className="btn btn--primary" href="#quote">
              {MAIN_ACTION}
            </a>
          </div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero hero--film" data-enter="" aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text hero__in">
              <div className="hero__media hero__fill">
                {/* stand-in: replace with the client's own photograph of one of its buses */}
                {/* the tablet's frame is portrait, so it takes the 1920 file; the phone and desktop the 1280 */}
                <picture>
                  <source media="(min-width: 640px) and (max-width: 1023px)" srcSet="/assets/img/photo-f25446956-1920.jpg" />
                  <img
                    src="/assets/img/photo-f25446956-1280.jpg"
                    srcSet="/assets/img/photo-f25446956-960.jpg 960w, /assets/img/photo-f25446956-1280.jpg 1280w"
                    sizes="(max-width: 639px) 300vw, 100vw"
                    width="1280"
                    height="853"
                    alt="A pale blue coach parked under tropical trees in Singapore"
                    style={{ ["--ly-pos" as string]: "50% 55%", ["--ly-pos-phone" as string]: "62% 50%" }}
                    fetchPriority="high"
                    decoding="async"
                    data-source="stand-in"
                    data-subject="coach"
                  />
                </picture>
                <div className="hero__over">
                  <div>
                    <h1 id="hero-h">Bus charter in Singapore, 13 to 45 seats</h1>
                    <p className="hero__lead">
                      Airport transfers, point-to-point trips and hourly charters. Enter your trip and see the full price at
                      once, from S${smallest.transferPrice}.
                    </p>
                    <div className="btn-row">
                      <a className="btn btn--primary" href="#quote">
                        {MAIN_ACTION}
                        <Arrow />
                      </a>
                      <a className="btn btn--secondary" href="#fleet">
                        See bus sizes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="quote" aria-labelledby="quote-h" style={{ ["--hm" as string]: 2 }}>
          <div className="wrap">
            <div className="grid grid--top quote">
              <QuoteForm>
                <div className="section-head">
                  <h2 id="quote-h">
                    Instant quote. <span className="muted">The price changes as you type.</span>
                  </h2>
                </div>
              </QuoteForm>
            </div>
          </div>
        </section>

        <section className="section g2m" id="included" aria-labelledby="included-h">
          <div className="wrap">
            <div className="group">
              <div className="section-head">
                <h2 id="included-h">Included with every booking</h2>
              </div>
              <div className="grid included__list">
                {INCLUDED.map((f) => (
                  <div key={f.title} className="span-3 included__item">
                    <h3 className="t-card">{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="frame frame--photo included__photo">
              {/* stand-in: replace with the client's own coach on a Singapore street */}
              <img
                className="frame__img"
                src="/assets/img/photo-f123065409.jpg"
                srcSet="/assets/img/photo-f123065409-500.jpg 500w, /assets/img/photo-f123065409-960.jpg 960w, /assets/img/photo-f123065409.jpg 1280w"
                sizes="(max-width: 639px) 160vw, (max-width: 1023px) 100vw, 1280px"
                width="1280"
                height="962"
                alt="A white coach waiting at the kerb outside a modern building"
                loading="lazy"
                decoding="async"
                data-source="stand-in"
                data-subject="coach"
              />
            </div>
          </div>
        </section>

        <section className="section" id="trips" aria-labelledby="trips-h" style={{ ["--hm" as string]: 2 }}>
          <div className="wrap">
            <div className="grid grid--top">
              <div className="span-5">
                <div className="section-head">
                  <h2 id="trips-h">Trips and prices</h2>
                  <p>Prices from the {smallest.name}. The quote picks the bus size.</p>
                </div>
                <ul className="rows">
                  {TRIPS.map((t) => (
                    <li key={t.name}>
                      <span className="rows__name">{t.name}</span>
                      <p>{t.line}</p>
                      <span className="rows__value">{t.from}</span>
                    </li>
                  ))}
                </ul>
                <p className="trips__more">
                  <a className="link" href="#fleet">
                    Compare bus sizes
                  </a>
                </p>
              </div>
              <div className="frame frame--photo span-6 start-7 trips__photo">
                {/* stand-in: replace with the client's driver meeting a group in a Changi arrival hall */}
                <img
                  className="frame__img"
                  src="/assets/img/photo-f123303562-960.jpg"
                  srcSet="/assets/img/photo-f123303562-500.jpg 500w, /assets/img/photo-f123303562-960.jpg 960w"
                  sizes="(max-width: 639px) 240vw, (max-width: 1023px) 100vw, 628px"
                  style={{ objectPosition: "40% 50%" }}
                  width="960"
                  height="540"
                  alt="The arrival hall of Changi Airport Terminal 4"
                  loading="lazy"
                  decoding="async"
                  data-source="stand-in"
                  data-subject="Changi arrival hall"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section ground-inverse" id="fleet" aria-labelledby="fleet-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="fleet-h">
                Four bus sizes. <span className="muted">The quote picks the smallest that fits.</span>
              </h2>
            </div>
            {/* stand-in: replace with the client's own coach interior */}
            <figure className="develop" data-moment="picture-develops">
              <img
                src="/assets/img/photo-f180683020-960.jpg"
                srcSet="/assets/img/photo-f180683020-500.jpg 500w, /assets/img/photo-f180683020-960.jpg 960w"
                sizes="(max-width: 639px) 100vw, 1280px"
                width="960"
                height="640"
                alt="Rows of cloth coach seats down a lit aisle, with luggage racks overhead"
                loading="lazy"
                decoding="async"
                data-source="stand-in"
                data-subject="coach interior"
              />
            </figure>
            <ul className="grid fleet__list">
              {BUSES.map((b) => (
                <li key={b.id} className="span-3 fleet__item">
                  <h3 className="t-card">{b.seats} seats</h3>
                  <p>Up to {b.maxLuggage} large suitcases</p>
                  <p className="muted">
                    S${b.transferPrice} a transfer, S${b.hourlyRate} an hour
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="questions" aria-labelledby="questions-h" style={{ ["--hm" as string]: 2 }}>
          <div className="wrap">
            <div className="grid grid--top">
              <div className="span-5">
                <div className="section-head">
                  <h2 id="questions-h">Questions</h2>
                  <p>About booking, surcharges and cancelling.</p>
                </div>
                <div className="frame frame--photo questions__photo">
                  {/* stand-in: replace with the client's own coach with its luggage hold open */}
                  <img
                    className="frame__img"
                    src="/assets/img/photo-f116687946-960.jpg"
                    srcSet="/assets/img/photo-f116687946-960.jpg 960w, /assets/img/photo-f116687946.jpg 1280w"
                    sizes="(max-width: 639px) 170vw, (max-width: 1023px) 100vw, 519px"
                    width="1280"
                    height="853"
                    alt="The open luggage hold of a coach, with room for suitcases"
                    loading="lazy"
                    decoding="async"
                    data-source="stand-in"
                    data-subject="luggage hold"
                  />
                </div>
              </div>
              <div className="faq span-6 start-7">
                {QUESTIONS.map((item) => (
                  <div key={item.q} className="faq__item">
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer closing g2m" id="contact" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--type">
            <div className="section-head">
              <h2 id="close-h">Get a quote in two minutes</h2>
              <p className="t-small muted">
                Bus charter from S${smallest.transferPrice}, booked at least {RULES.minHoursInAdvance} hours ahead.
              </p>
            </div>
            <a className="btn btn--primary btn--xl" href="#quote">
              {MAIN_ACTION}
              <Arrow />
            </a>
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-4 stack-4">
                <Logo />
                <p className="footer__lede">Airport transfers and group trips across Singapore.</p>
              </div>
              <div className="span-2 footer__col">
                <h3>Trips</h3>
                <ul>
                  <li>
                    <a href="#trips">Airport pickup</a>
                  </li>
                  <li>
                    <a href="#trips">Hourly charter</a>
                  </li>
                </ul>
              </div>
              <div className="span-2 footer__col">
                <h3>Buses</h3>
                <ul>
                  <li>
                    <a href="#fleet">Bus sizes</a>
                  </li>
                </ul>
              </div>
              <div className="span-2 footer__col">
                <h3>Included</h3>
                <ul>
                  <li>
                    <a href="#included">Flight tracking</a>
                  </li>
                </ul>
              </div>
              <div className="span-2 footer__col">
                <h3>Questions</h3>
                <ul>
                  <li>
                    <a href="#questions">Cancelling</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__legal">
              <span>&copy; 2026 Ad-hoc Bus Booking</span>
              <div className="socials"></div>
              <a className="credits" href="/credits">
                Photographs via Wikimedia Commons
              </a>
            </div>
          </div>
        </div>
      </footer>

      <nav className="actionbar" aria-label="Quick actions">
        <a className="btn btn--primary" href="#quote">
          {MAIN_ACTION}
        </a>
      </nav>
      <KitScripts />
    </>
  );
}
