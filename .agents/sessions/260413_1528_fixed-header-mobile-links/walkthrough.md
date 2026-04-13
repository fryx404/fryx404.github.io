# ヘッダーリンクのスマホ表示対応

スマホ表示時（画面幅768px以下）においても、ヘッダーに「HOME」と「WORKS」へのリンクが常に表示されるように修正しました。

## 概要

`src/components/Header.astro` のCSSを調整し、モバイルのレイアウトにおいてトップレベルのリンクの中から「HOME」(`href="/"`)と「WORKS」(`href="/works"`)だけを残してインライン表示し、残りのリンクはハンバーガーメニュー開閉時にのみ表示されるようにスタイル定義を変更しました。

## 修正内容

*   `src/components/Header.astro`: 
    *   `.internal-links` の `display: none;` を `display: flex;` に変更し、常に要素自体は表示されるようにしました。
    *   `.internal-links > a:not([href="/"], [href="/works"])` に対して `display: none;` を適用し、ハンバーガーメニューが閉じているときはHOMEとWORKS以外を隠すようにしました。
    *   `.internal-links.open > a` に関してはハンバーガーメニューが開いた状態できちんと全リンクが表示されるように `display: flex;` を定義しました。

## バリデーション

*   `npm run build` が正常に完了することを確認しました。
