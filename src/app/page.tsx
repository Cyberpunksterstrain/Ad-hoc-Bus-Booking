import QuoteForm from "@/components/QuoteForm";
import { BUSES } from "@/lib/pricing";

const FEATURES = [
  { title: "Instant prices", body: "See your full price in seconds. No waiting for a quote by email." },
  { title: "Flight tracking", body: "Airport pickups follow your flight. Late landing? Your driver waits." },
  { title: "Live bus tracking", body: "Every bus is GPS-tracked, so we know it's on the way before you ask." },
  { title: "Help in your language", body: "Message us any time on WhatsApp, in English, 中文, 日本語, 한국어 and more." },
];

export default function Home() {
  return (
    <main className="flex-1">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-lg font-semibold tracking-tight">
          <span className="text-brand">●</span> Ad-hoc Bus Booking
        </span>
        <a href="#quote" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80">
          Get a quote
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-6 pt-8 sm:pt-14">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-brand">Bus charter in Singapore</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Book a bus for your group in two minutes.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-black/65">
          Changi Airport transfers, event shuttles and hourly charters, from 13 to 45 seats. Instant prices, paid
          online, tracked live.
        </p>
      </section>

      <section id="quote" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-6">
        <QuoteForm />
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-black/10 bg-white p-5">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-[15px] text-black/60">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Our fleet</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BUSES.map((b) => (
            <div key={b.id} className="rounded-2xl border border-black/10 bg-white p-5">
              <p className="text-3xl font-semibold">{b.seats}</p>
              <p className="text-sm text-black/60">seats · up to {b.maxLuggage} large suitcases</p>
              <p className="mt-3 text-[15px]">
                From <span className="font-semibold">S${b.transferPrice}</span> per transfer
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/10 py-6 text-center text-sm text-black/50">
        © 2026 Ad-hoc Bus Booking · Singapore
      </footer>
    </main>
  );
}
