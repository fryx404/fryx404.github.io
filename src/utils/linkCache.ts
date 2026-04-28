export interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
}

// Map that stores Promises of metadata.
// Using a Promise cache ensures that concurrent requests for the same URL
// will await the same fetch operation instead of triggering duplicate fetches.
export const linkMetadataCache = new Map<string, Promise<LinkMetadata>>();

export async function fetchLinkMetadata(url: string): Promise<LinkMetadata> {
  let metadataPromise = linkMetadataCache.get(url);

  if (!metadataPromise) {
    metadataPromise = (async (): Promise<LinkMetadata> => {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
        signal: AbortSignal.timeout(5000),
      });

      // Content-Length をチェックして大きすぎるレスポンスをブロック (例: 10MB)
      const contentLength = res.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > 10 * 1024 * 1024) {
        throw new Error("Response body is too large");
      }

      const html = await res.text();

      const headEndIndex = html.indexOf("</head>");
      const maxSearchLength = 30000;
      const searchLimit =
        headEndIndex !== -1
          ? Math.min(headEndIndex + 7, maxSearchLength)
          : maxSearchLength;
      const headHtml = html.slice(0, searchLimit);

      // og:title → <title> の順にフォールバック
      const ogTitle =
        headHtml.match(
          /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i,
        )?.[1] ??
        headHtml.match(
          /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i,
        )?.[1] ??
        headHtml.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1];

      const ogDesc =
        headHtml.match(
          /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i,
        )?.[1] ??
        headHtml.match(
          /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i,
        )?.[1] ??
        headHtml.match(
          /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
        )?.[1];

      const ogImg =
        headHtml.match(
          /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
        )?.[1] ??
        headHtml.match(
          /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
        )?.[1];

      return {
        title: ogTitle?.trim(),
        description: ogDesc?.trim(),
        image: ogImg?.trim(),
      };
    })();

    linkMetadataCache.set(url, metadataPromise);
  }

  return await metadataPromise;
}
