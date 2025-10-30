import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const blMelodyMono = localFont({
  src: "../../public/fonts/BLMelodyMono-Book.otf",
  variable: "--font-bl-melody-mono",
});

const blMelody = localFont({
  src: "../../public/fonts/BLMelody-Medium.otf",
  variable: "--font-bl-melody",
});

export const metadata: Metadata = {
  title: "Re:ZERO - Starting Life in Another World",
  description: "Pixel game themed adventure with Subaru Natsuki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${blMelody.variable} ${blMelodyMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
