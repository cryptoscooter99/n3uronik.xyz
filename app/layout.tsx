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

export const metadata: Metadata = {
  metadataBase: new URL("https://n3uronik.xyz"),
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
  openGraph: {
    title: "n3uronik — Independent Systems Studio",
    description:
      "Independent systems, interfaces, and live experiences built across software, commerce, and performance.",
    url: "https://n3uronik.xyz",
    siteName: "n3uronik",
    type: "website",
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
