# TV Pics - 気分診断で作品をレコメンド

今日の気分でサクッと決めよう！4 つの質問に答えるだけで、あなたにぴったりの作品をレコメンドします。

## 🎬 特徴

- **気分にピッタリ**: 今の気分を分析して、最適な作品をレコメンド
- **超簡単診断**: 4 つの質問に答えるだけ！サクッと 1 分で完了
- **新しい発見**: 今みるべき作品との出会いが待ってる

## 🚀 技術スタック

- **Next.js 14** - React フレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **shadcn/ui** - UI コンポーネント
- **Lucide React** - アイコン

## 📦 セットアップ

### 前提条件

- Node.js 18.0.0 以上
- npm, yarn, または pnpm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/あなたのユーザー名/リポジトリ名.git
cd mood-diagnosis-app

# 依存関係をインストール
npm install
# または
yarn install
# または
pnpm install
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリを確認してください。

## 🎯 機能

### 気分診断

- 4 つの質問で現在の気分を分析
- 7 つの気分カテゴリ（癒し、元気、感動、ワクワク、刺激、笑い、落ち着き）

### レコメンドシステム

- 気分スコアに基づくパーソナライズされたレコメンド
- 多様性を確保した作品選択
- ジブリ作品を除外したレコメンド

### UI/UX

- モダンなグラデーションデザイン
- レスポンシブ対応
- スムーズなアニメーション

## 📁 プロジェクト構造

```
mood-diagnosis-app/
├── app/                    # Next.js アプリケーション
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # メインページ
│   └── globals.css        # グローバルスタイル
├── components/             # Reactコンポーネント
│   ├── ui/               # shadcn/uiコンポーネント
│   └── content-card.tsx  # コンテンツカード
├── data/                  # データファイル
│   ├── mock-data.ts      # モックデータ
│   ├── mood-config.ts    # 気分設定
│   └── question-pool.ts  # 質問プール
├── utils/                 # ユーティリティ
│   ├── diagnosis.ts      # 診断ロジック
│   ├── dmm-scraper.ts    # DMMスクレイピング
│   └── tmdb.ts          # TMDB API
├── types/                 # TypeScript型定義
│   └── mood.ts          # 気分関連の型
└── public/               # 静的ファイル
    ├── favicon.svg       # ファビコン
    └── og-image.svg      # OGP画像
```

## 🎨 カスタマイズ

### 新しい質問の追加

`data/question-pool.ts` に質問を追加できます。

### コンテンツの追加

`data/mock-data.ts` に新しい作品を追加できます。

### 気分カテゴリの変更

`types/mood.ts` と `data/mood-config.ts` で気分カテゴリをカスタマイズできます。

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

## 📞 サポート

何か問題があれば、GitHub のイシューを作成してください。
