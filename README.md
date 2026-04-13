# 古屋 匠 — 個人サイト

Astroフレームワークを用いたの個人サイトです。
バイブコーディングで作成しています。

## ディレクトリ構成

```
src/
├── components/           # 共有コンポーネント (Header, Footer など)
├── content/
│   ├── blog/            # BLOG コンテンツ (Markdown)
│   ├── journal/         # JOURNAL コンテンツ (Markdown)
│   └── works/           # WORKS コンテンツ (Markdown)
├── layouts/
│   ├── BlogPost.astro   # BLOG 用レイアウト
│   └── JournalPost.astro # JOURNAL 用レイアウト
├── pages/
│   ├── index.astro       # トップページ
│   ├── blog/            # BLOG 一覧・詳細ページ
│   ├── journal/         # JOURNAL 一覧・詳細ページ
│   └── works/           # WORKS 一覧ページ
├── styles/
│   ├── global.css        # サイト全体のスタイル
│   └── post.css          # 投稿ページ共通スタイル
└── utils/
    ├── slug.ts           # URL スラッグ生成ユーティリティ
    └── tagColors.ts      # タグカラーリングユーティリティ
public/
├── fonts/                # フォントファイル
└── icons/                # ブログ記事の画像など
```

---

## 使用ライブラリ・モジュール

| パッケージ | バージョン | 用途 |
| :--- | :--- | :--- |
| [`astro`](https://astro.build/) | ^5.17.1 | フレームワーク本体 |
| [`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/) | ^4.3.13 | MDX サポート（Markdown 内で JSX を使用） |
| [`@astrojs/rss`](https://docs.astro.build/en/guides/rss/) | ^4.0.15 | RSS フィード生成 |
| [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | ^3.7.1 | サイトマップ自動生成 |
| [`@astrojs/check`](https://docs.astro.build/en/guides/typescript/) | ^0.9.7 | TypeScript 型チェック |
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


## フロントマター一覧
| フィールド    | 型       | 必須 | 説明                           |
| :------------ | :------- | :--: | :----------------------------- |
| `title`       | string   |  ✅  | 作品タイトル                   |
| `pubDate`     | date     |  ✅  | 公開日 (`YYYY-MM-DD` 形式)     |
| `description` | string   |  —   | 説明文（OGP にも使用）         |
| `tags`        | string[] |  —   | タグの配列                     |
| `image`       | image    |  —   | サムネイル（相対パス指定）     |
| `url`         | string   |  —   | 外部リンク（GitHub など）      |
| `updatedDate` | date     |  —   | 更新日（`pubDate` と異なる場合に表示）    |

---