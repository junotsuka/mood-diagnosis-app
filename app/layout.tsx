import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TV Pics - 気分診断で作品をレコメンド",
  description:
    "今日の気分でサクッと決めよう！4つの質問に答えるだけで、あなたにぴったりの作品をレコメンドします。",
  generator: "Next.js",
  keywords: ["気分診断", "映画", "ドラマ", "アニメ", "レコメンド", "TV"],
  authors: [{ name: "TV Pics" }],
  creator: "TV Pics",
  publisher: "TV Pics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"), // 実際のドメインに変更してください
  openGraph: {
    title: "TV Pics - 気分診断で作品をレコメンド",
    description:
      "今日の気分でサクッと決めよう！4つの質問に答えるだけで、あなたにぴったりの作品をレコメンドします。",
    url: "https://your-domain.com", // 実際のドメインに変更してください
    siteName: "TV Pics",
    images: [
      {
        url: "/og-image.svg", // OGP用の画像を追加してください
        width: 1200,
        height: 630,
        alt: "TV Pics - 気分診断で作品をレコメンド",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TV Pics - 気分診断で作品をレコメンド",
    description:
      "今日の気分でサクッと決めよう！4つの質問に答えるだけで、あなたにぴったりの作品をレコメンドします。",
    images: ["/og-image.svg"], // OGP用の画像を追加してください
  },
  robots: {
    index: false, // 検索エンジンにインデックスされないように設定
    follow: false, // リンクを辿らないように設定
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "none",
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
        {/* 追加のnoindex設定 */}
        <meta
          name="robots"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="googlebot"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="bingbot"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
