import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DMMTV Pics - 気分診断で作品をレコメンド",
  description:
    "今日の気分でサクッと決めよう！4つの質問に答えるだけで、あなたにぴったりの作品をレコメンドします。",
  generator: "Next.js",
  keywords: ["気分診断", "映画", "ドラマ", "アニメ", "レコメンド", "DMMTV"],
  authors: [{ name: "DMMTV Pics" }],
  creator: "DMMTV Pics",
  publisher: "DMMTV Pics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"), // 実際のドメインに変更してください
  openGraph: {
    title: "DMMTV Pics - 気分診断で作品をレコメンド",
    description:
      "今日の気分でサクッと決めよう！4つの質問に答えるだけで、あなたにぴったりの作品をレコメンドします。",
    url: "https://your-domain.com", // 実際のドメインに変更してください
    siteName: "DMMTV Pics",
    images: [
      {
        url: "/og-image.svg", // OGP用の画像を追加してください
        width: 1200,
        height: 630,
        alt: "DMMTV Pics - 気分診断で作品をレコメンド",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DMMTV Pics - 気分診断で作品をレコメンド",
    description:
      "今日の気分でサクッと決めよう！4つの質問に答えるだけで、あなたにぴったりの作品をレコメンドします。",
    images: ["/og-image.svg"], // OGP用の画像を追加してください
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Google Search Consoleのコード
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
