export function idToSlug(id: string): string {
	return id.replace(/\/index\.(md|mdx)$/, "").replace(/\.(md|mdx)$/, "");
}
