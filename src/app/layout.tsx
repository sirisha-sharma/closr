import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Closr — Psychology-Powered Proposals for B2B Freelancers",
  description: "Analyze your prospect's DISC behavioral profile and generate personalized proposals + cold emails in under 60 seconds.",
  keywords: ["proposal generator", "cold email", "DISC psychology", "B2B freelancer", "sales outreach"],
  openGraph: {
    title: "Closr",
    description: "Psychology-powered proposals that win.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
