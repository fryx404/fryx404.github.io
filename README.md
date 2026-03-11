# 古屋 匠 — ポートフォリオサイト

Astro 製のポートフォリオサイトです。

## 🧞 コマンド一覧

すべてプロジェクトのルートで実行します。

| コマンド          | 動作                                       |
| :---------------- | :----------------------------------------- |
| `npm run dev`     | 開発サーバーを `localhost:4321` で起動する |
| `npm run build`   | `./dist/` に本番ビルドを出力する           |
| `npm run preview` | ビルド結果をローカルでプレビューする       |

---

## 📁 プロジェクト構成

```
src/
├── components/           # 共有コンポーネント (Header, Footer など)
├── content/
│   ├── works/            # WORKS コンテンツ (Markdown)
│   └── blog/             # BLOG コンテンツ (Markdown)
├── layouts/
│   ├── WorksPost.astro   # WORKS 用レイアウト
│   └── BlogPost.astro    # BLOG 用レイアウト
├── pages/
│   ├── index.astro       # トップページ
│   ├── works/            # WORKS 一覧・詳細ページ
│   └── blog/             # BLOG 一覧・詳細ページ
├── styles/
│   ├── global.css        # サイト全体のスタイル
│   └── post.css          # 投稿ページ共通スタイル
└── utils/
    ├── slug.ts           # URL スラッグ生成ユーティリティ
    └── tagColors.ts      # タグカラーリングユーティリティ
public/
├── fonts/                # フォントファイル
├── icons/                # プロフィール画像など
└── portfolio/            # OGP 画像など公開用の静的ファイル
```

---

## 🖼️ WORKS を追加・更新するとき

### 1. ディレクトリを作成する

`src/content/works/YYYY/MM/作品名/` の形式でフォルダを作成します。

```
src/content/works/
└── 2026/
    └── 03/
        └── MyWork/
            ├── index.md
            └── images/      ← 使用する画像をここに配置
```

### 2. `index.md` を作成する

```markdown
---
title: "作品タイトル"
publishDate: YYYY-MM-DD
description: "作品の説明文"
tags: ["Tag1", "Tag2"]        # 任意
image: "./images/thumbnail.png" # 任意：サムネイル画像（相対パス）
url: "https://github.com/..."   # 任意：外部リンク
---

本文をここに書く。
```

**フロントマター一覧:**

| フィールド    | 型       | 必須 | 説明                           |
| :------------ | :------- | :--: | :----------------------------- |
| `title`       | string   |  ✅  | 作品タイトル                   |
| `publishDate` | date     |  ✅  | 公開日 (`YYYY-MM-DD` 形式)     |
| `description` | string   |  —   | 説明文（OGP にも使用）         |
| `tags`        | string[] |  —   | タグの配列                     |
| `image`       | image    |  —   | サムネイル（相対パス指定）     |
| `url`         | string   |  —   | 外部リンク（GitHub など）      |

### 3. 動作確認する

```sh
npm run dev
```

`http://localhost:4321/works/` を開き、カードが表示されることを確認します。

---

## 📝 BLOG を追加・更新するとき

### 1. ディレクトリを作成する

`src/content/blog/YYYY/MM/DD/` の形式でフォルダを作成します。

```
src/content/blog/
└── 2026/
    └── 03/
        └── 11/
            ├── index.md
            └── image/       ← 記事内で使う画像をここに配置
```

### 2. `index.md` を作成する

```markdown
---
title: "記事タイトル"
pubDate: YYYY-MM-DD
description: "記事の概要"
tags: ["Tag1", "Tag2"]         # 任意
heroImage: "/blog/YYYY/MM/DD/image/hero.png"  # 任意：ヘッダー画像（public/ 基準の絶対パス）
updatedDate: YYYY-MM-DD        # 任意：更新日
---

本文をここに書く。
```

**フロントマター一覧:**

| フィールド    | 型       | 必須 | 説明                                      |
| :------------ | :------- | :--: | :---------------------------------------- |
| `title`       | string   |  ✅  | 記事タイトル                              |
| `pubDate`     | date     |  ✅  | 公開日 (`YYYY-MM-DD` 形式)                |
| `description` | string   |  —   | 概要文（OGP にも使用）                    |
| `tags`        | string[] |  —   | タグの配列                                |
| `heroImage`   | string   |  —   | ヘッダー画像（`public/` 基準の絶対パス）  |
| `updatedDate` | date     |  —   | 更新日（`pubDate` と異なる場合に表示）    |

> **注意:** `heroImage` は `public/` フォルダ内のファイルを絶対パスで指定します。
> WORKS の `image` フィールドとは異なり、Astro の画像最適化は適用されません。

### 3. 動作確認する

```sh
npm run dev
```

`http://localhost:4321/blog/` を開き、カードと記事ページが正しく表示されることを確認します。

---

## 🚀 デプロイ前の確認

1. `astro.config.mjs` の `site:` を本番 URL に変更する
   ```js
   site: 'https://fryx404.github.io',
   ```
2. 本番ビルドを実行してエラーがないことを確認する
   ```sh
   npm run build
   npm run preview
   ```
