import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chit-Chat Canada | バンクーバー Meetup 英語・日本語交流会",
  description:
    "バンクーバーのMeetupグループ Chit-Chat Canada。英語・日本語の言語交換、コーディング勉強会、異文化交流イベントを開催中。学生無料。メンバー4,700人以上。A bilingual community meetup in Vancouver for English & Japanese practice, coding, and cultural exchange. Free for students.",
  keywords: [
    "バンクーバー", "Meetup", "バンクーバー Meetup",
    "言語交換", "英語 日本語", "日本語 練習",
    "バンクーバー 日本人", "バンクーバー 交流会",
    "バンクーバー 英語 練習", "バンクーバー コミュニティ",
    "バンクーバー イベント", "バンクーバー 勉強会",
    "language exchange Vancouver", "Japanese meetup Vancouver",
    "Vancouver community", "English Japanese practice",
    "Chit-Chat Canada", "coding meetup Vancouver",
    "free for students Vancouver", "cultural exchange Vancouver",
  ],
  openGraph: {
    title: "Chit-Chat Canada | バンクーバー Meetup 英語・日本語交流会",
    description:
      "バンクーバーのMeetupグループ。英語・日本語の言語交換、コーディング、異文化交流。学生無料。メンバー4,700人以上。",
    locale: "ja_JP",
    alternateLocale: "en_CA",
    type: "website",
    siteName: "Chit-Chat Canada",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chit-Chat Canada | バンクーバー Meetup",
    description:
      "バンクーバーの英語・日本語交流 Meetup。学生無料。4,700人以上のコミュニティ。",
  },
  alternates: {
    languages: {
      "en-CA": "/",
      "ja-JP": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
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