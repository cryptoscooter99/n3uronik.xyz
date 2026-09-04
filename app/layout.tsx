import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * ⭐ THE CANONICAL HOST IS www, AND THAT IS NOT A STYLE CHOICE.
 *
 * These fields pointed at the bare apex, https://n3uronik.xyz — which serves a
 * certificate whose only subject name is www.n3uronik.xyz. The apex therefore
 * fails TLS outright: browsers show a full-page security interstitial, not a
 * 404. Every share card, every canonical URL and every crawler hint was
 * advertising a host that cannot be opened.
 *
 * Pointing at www makes the metadata describe the host that actually answers.
 * If the apex is later added as a domain on the Vercel project so it gets its
 * own certificate, and made the primary, this becomes a one-line change back —
 * but it must not be changed before that cert exists.
 */
const SITE = "https://www.n3uronik.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "n3uronik — Independent Systems Studio",
    template: "%s — n3uronik",
  },
  description:
    "A catalog of independent systems, interfaces, ventures, and live experiences built by Scooter in New Orleans.",
  keywords: [
    "n3uronik",
    "AI automation",
    "web design",
    "creative technology",
    "New Orleans",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "n3uronik — Independent Systems Studio",
    description:
      "Independent systems, interfaces, and live experiences built across software, commerce, and performance.",
    url: SITE,
    siteName: "n3uronik",
    type: "website",
    locale: "en_US",
    /*
     * There was no image at all before this, so every share on iMessage,
     * Slack, X or LinkedIn rendered as a bare line of text — the one place a
     * portfolio cannot afford to look like nothing. PNG rather than SVG on
     * purpose: the major scrapers do not rasterise SVG and would fall back to
     * no image again. Regenerate with scripts/generate-og.mjs.
     */
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "n3uronik — independent systems, interfaces, and live experiences.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "n3uronik — Independent Systems Studio",
    description:
      "Independent systems, interfaces, and live experiences built across software, commerce, and performance.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#050507",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
