import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bus charter Singapore | Airport transfers and group bus booking",
  description:
    "Book a 13 to 45-seater bus in Singapore in minutes. Instant quotes for Changi Airport transfers, hourly charters and group trips.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
