import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chit-Chat Canada | Vancouver バンクーバー",
  description:
    "A bilingual community in Vancouver for English & Japanese practice, coding, and cultural exchange. 学生無料。",
  openGraph: {
    title: "Chit-Chat Canada | Vancouver バンクーバー",
    description:
      "A bilingual community in Vancouver for English & Japanese practice, coding, and cultural exchange.",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0D0806" }}>
        {children}
      </body>
    </html>
  );
}
