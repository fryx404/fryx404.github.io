# index.astro & global.css リファクタリング計画

## 実装のゴールと要件
- `index.astro` と `global.css` をリファクタリングする。
- 不要なコード・重複している設定を削除する。
- 統一できる装飾（他のページやセクションでも使い回せそうなコンポーネントスタイル）を `global.css` に移動する。
- `index.astro` のCSSの並び順を、サイトのDOMツリーと同じように上から順番に設定する。

## 変更するファイル一覧と影響範囲
1. `src/pages/index.astro`
   - `<style>` タグ内のCSSを整理、並び替え、重複排除、一部を削除。
2. `src/styles/global.css`
   - `index.astro` から汎用的なスタイル（例：`.section-title-tag`など）を移植し、共通クラスとして定義。
   - 影や角丸などの共通スタイルを変数として追加・整理し、重複を減らす。

## 具体的なステップ（Step-by-Step）
1. **現状の分析・整理対象の選定**:
   - DOMの並びは `hero` -> `features` -> `likes` -> `connect`。現状のCSSは `connect` と `likes` が逆転しているため修正する。
   - 重複している `box-shadow` などを汎用クラスやCSS変数に置き換える。
   - `.section-title-tag` は汎用性が高いため、`global.css` へ移動する。
2. **`global.css` の更新**:
   - `section-title-tag` 関連のスタイルを追加。
3. **`index.astro` の `<style>` の更新**:
   - `.section-title-tag` 関連のスタイルを削除。
   - `main` -> `.hero` -> `.features-section` -> `.likes-section` -> `.connect-section` の順番でスタイルを再配置。
   - 重複している変数の使用や不必要な記述があれば削除・最適化。
4. **検証**:
   - `npm run dev` によるローカルサーバーが起動中なので、ターミナルログのエラーを確認。
   - 念のため構文エラー等がないかチェック。

## リスクと対策
- スタイルのスコープ（Astroのデフォルトではコンポーネント内にスコープされる）が変わることで、意図しないスタイル崩れが起きる可能性がある。
  - 対策: `global.css` に移すスタイルは、影響範囲が明確なクラス名（`.section-title-tag`など）に限定する。
