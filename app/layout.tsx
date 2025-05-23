// app/layout.tsx
import { ThemeProvider } from "next-themes";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Country Explorer",
  description: "Explore countries of the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
