# コンテンツ管理ガイド

## ディレクトリ構成

```
my-site/
├── src/
│   └── content/
│       ├── blog/
│       │   └── YYYY/          ← 年
│       │       └── MM/        ← 月
│       │           └── DD/    ← 日
│       │               └── index.md   ← 記事ファイル
│       └── works/
│           └── YYYY/
│               └── MM/
│                   └── project-name/  ← プロジェクト名
│                       └── index.md   ← 記事ファイル
└── public/
    ├── blog/
    │   └── YYYY/MM/DD/
    │       └── image/         ← ブログ画像
    └── works/
        └── YYYY/MM/project-name/
            └── image/         ← 作品画像
```

---

## ブログ記事の追加

### 1. ファイルを作成

`src/content/blog/2026/03/21/index.md` を作成：

```markdown
---
title: "記事タイトル"
pubDate: 2026-03-21
tags: ["タグ1", "タグ2"]
description: "記事の概要（任意）"
---

ここに記事の本文を書きます。
```

### 2. 画像を追加（任意）

画像ファイルを `public/blog/2026/03/21/image/` に配置すると、記事内で次のように参照できます：

```markdown
![説明](/blog/2026/03/21/image/photo.jpg)
```

**URL**: `/blog/2026/03/21/`

---

## 作品（WORKS）の追加

### 1. ファイルを作成

`src/content/works/2026/03/my-project/index.md` を作成：

```markdown
---
title: "プロジェクト名"
publishDate: 2026-03-21
description: "プロジェクトの概要（任意）"
tags: ["Astro", "TypeScript"]
url: "https://github.com/fryx404/project"  # 外部リンク（任意）
image: "/works/2026/03/my-project/image/thumbnail.jpg"  # サムネイル（任意）
---

プロジェクトの詳細説明をここに書きます。
```

### 2. 画像を追加（任意）

画像ファイルを `public/works/2026/03/my-project/image/` に配置します。

**URL**: `/works/2026/03/my-project/`

---

## 対応フォーマット

| フォーマット | 用途 |
|---|---|
| `.md` | 通常のMarkdown |
| `.mdx` | Markdown + JSXコンポーネント |

## 画像フォーマット

`jpg`, `png`, `webp`, `gif`, `svg` すべて利用可能です。
