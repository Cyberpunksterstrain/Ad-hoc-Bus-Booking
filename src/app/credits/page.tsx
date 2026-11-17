import type { Metadata } from "next";
import Link from "next/link";

// The credits list the homepage's footer line opens (as photos.mjs credits printed it). Every photograph is a
// stand-in from Wikimedia Commons until the client's own are shot; remove each line when its photograph goes.
export const metadata: Metadata = {
  title: "Ad-hoc Bus Booking: photograph credits",
  description: "Who took the photographs on the Ad-hoc Bus Booking site, and their licences.",
};

const CREDITS = [
  {
    page: "https://commons.wikimedia.org/wiki/File:King_Long_coach_in_Singapore.jpg",
    by: "Ilya Plekhanov",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    page: "https://commons.wikimedia.org/wiki/File:Changi_Terminal_4_Arrival_Hall.jpg",
    by: "Michael",
    licence: "Public domain",
    licenceUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
  {
    page: "https://commons.wikimedia.org/wiki/File:GO_Transit_MCI_D45_CRT_Interior.jpg",
    by: "Kyy0602",
    licence: "CC0",
    licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
  },
  {
    page: "https://commons.wikimedia.org/wiki/File:J00_520_Reisebusladeraum.jpg",
    by: "Falk2",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
  },
  {
    page: "https://commons.wikimedia.org/wiki/File:Coach_bus_at_Ottawa_museum.jpg",
    by: "shankar s.",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0",
  },
];

export default function Credits() {
  return (
    <main id="top" className="legal">
      <div className="wrap stack-4">
        <p>
          <Link className="link" href="/">
            Ad-hoc Bus Booking
          </Link>
        </p>
        <h1>Photograph credits</h1>
        <ul className="rows">
          {CREDITS.map((c) => (
            <li key={c.page}>
              <span>
                <a className="link" href={c.page}>
                  {c.by}
                </a>
                , <a className="link" href={c.licenceUrl}>{c.licence}</a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
