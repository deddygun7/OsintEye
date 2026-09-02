import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OSINT Eye - Global Intelligence Tool",
  description: "Gather intelligence from public sources worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-white font-mono">
        {children}
      </body>
    </html>
  );
}
