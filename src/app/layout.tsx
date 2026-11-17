import type { Metadata, Viewport } from "next";
import Script from "next/script";

// tasteskill 2.5 page shell (references/system.md, Head). The kit's CSS and JS live in public/assets
// and load as plain files; page CSS is public/assets/page.css, linked last.
export const metadata: Metadata = {
  title: "Ad-hoc Bus Booking: bus charter in Singapore, 13 to 45 seats",
  description:
    "Hire a coach or minibus with a driver for Changi Airport transfers, point-to-point trips and hourly charters. See the full price before you book.",
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: {
    type: "website",
    title: "Ad-hoc Bus Booking: bus charter in Singapore",
    description: "Airport transfers, point-to-point trips and hourly charters from S$90, priced as you type.",
    images: ["/share.jpg"],
  },
  twitter: { card: "summary_large_image" },
  // canonical: add alternates.canonical once the client's domain is known
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f6f2",
};

const ENTER_GUARD =
  "document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700);" +
  "document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500);";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-type="service" data-radius="soft" data-buttons="solid" data-motion="" suppressHydrationWarning>
      <head>
        <meta name="site-kind" content="other" />
        <meta name="page-type" content="service" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400..700&family=Red+Hat+Text:wght@400..600&display=swap"
        />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/backgrounds/backgrounds.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <link rel="stylesheet" href="/assets/page.css" />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
        <link rel="modulepreload" href="/assets/moments/picture-develops/moment.js" />
      </head>
      <body>
        <Script id="enter-guard" strategy="beforeInteractive">
          {ENTER_GUARD}
        </Script>
        {children}
      </body>
    </html>
  );
}
