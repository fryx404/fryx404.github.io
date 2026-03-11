---
title: "ポートフォリオサイトをAstroで作った話"
pubDate: 2026-03-08
tags: ["Astro", "Web", "ポートフォリオ"]
description: "Astroのブログスターターを使って個人サイトを構築した記録です"
---

このサイトをAstroで作りました。テンプレートからスタートして、3つのページ（About・WORKS・BLOG）を追加しています。

## Astroを選んだ理由

- コンテンツ中心のサイトに最適
- MDX / Markdown でページを管理できる
- TypeScriptサポートが標準
- 必要なときだけJSを読み込む Island Architecture

## Content Collections

Astroの`Content Collections`機能を使うと、Markdownファイルを型安全に管理できます。

```ts
const works = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});
```

---

今後もこのサイトに機能を追加していく予定です。
