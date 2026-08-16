# 古屋 匠 — 個人サイト

Astroフレームワークを用いた個人サイト（ポートフォリオ＆ブログ）です。

---

## ディレクトリ構成

```
src/
├── components/           # 共有コンポーネント (Header, Footer, SocialIcon, SocialLinks など)
├── content/
│   ├── blog/            # BLOG コンテンツ (Markdown / MDX)
│   └── works/           # WORKS コンテンツ (Markdown / MDX)
├── layouts/
│   └── BlogPost.astro   # BLOG 用レイアウト
├── pages/
│   ├── index.astro       # トップページ (プロフィール・SNS等)
│   ├── blog/            # BLOG 一覧・詳細ページ
│   ├── works/           # WORKS 一覧ページ
│   └── rss.xml.js        # RSS フィード
├── styles/
│   ├── global.css        # サイト全体のスタイル
│   └── post.css          # 投稿ページ共通スタイル
├── utils/
│   ├── slug.ts           # URL スラッグ生成ユーティリティ
│   ├── tagColors.ts      # タグカラーリングユーティリティ
│   └── url.ts            # URL バリデーションユーティリティ
└── content.config.ts     # コンテンツコレクション定義
public/
├── fonts/                # フォントファイル (Atkinson)
└── icons/                # アイコン・アバター画像
```

---

## 使用ライブラリ・モジュール

| パッケージ | バージョン | 用途 |
| :--- | :--- | :--- |
| [`astro`](https://astro.build/) | ^5.17.1 | フレームワーク本体 |
| [`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/) | ^4.3.13 | MDX サポート（Markdown 内での JSX / コンポーネント使用） |
| [`@astrojs/rss`](https://docs.astro.build/en/guides/rss/) | ^4.0.15 | RSS フィード生成 |
| [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | ^3.7.1 | サイトマップ自動生成 |
| [`@astrojs/check`](https://docs.astro.build/en/guides/typescript/) | ^0.9.8 | TypeScript 型チェック |
| [`sanitize-html`](https://github.com/apostrophecms/sanitize-html) | ^2.17.2 | HTML サニタイズ処理 |
| [`sharp`](https://sharp.pixelplumbing.com/) | ^0.34.3 | 画像最適化 |
| [`typescript`](https://www.typescriptlang.org/) | ^5.9.3 | TypeScript サポート |

---

## コマンド一覧

すべてプロジェクトのルートで実行します。

| コマンド          | 動作                                       |
| :---------------- | :----------------------------------------- |
| `npm run dev`     | 開発サーバーを `localhost:4321` で起動する |
| `npm run build`   | `./dist/` に本番ビルドを出力する           |
| `npm run preview` | ビルド結果をローカルでプレビューする       |

---

## フロントマター仕様

`src/content.config.ts` で定義されているコンテンツコレクション（`works`, `blog`）のフロントマターフィールド一覧です。

| フィールド | 型 | 必須 | 対象コレクション | 説明 |
| :--- | :--- | :--: | :--- | :--- |
| `title` | `string` | ✅ | 全体 | タイトル |
| `pubDate` | `date` | ✅ | 全体 | 公開日 (`YYYY-MM-DD` 形式) |
| `updatedDate` | `date` | — | 全体 | 更新日（`pubDate` と異なる場合に表示） |
| `description` | `string` | — | 全体 | 説明文（OGP にも使用） |
| `tags` | `string[]` | — | 全体 | タグの配列 |
| `image` | `image()` | — | 全体 | サムネイル（相対パス指定） |
| `url` | `string` | — | Works | 外部リンク（GitHub / BOOTH など） |
| `features` | `string[]` | — | Works | 特徴・ハイライトリスト |

---

## SNS・外部リンク

トップページやコンポーネントから各種 SNS・リンクに対応しています。
- 対応アイコン: X, Bluesky, Instagram, Threads, LinkedIn, GitHub, Note, Behance, ArtStation, Mail