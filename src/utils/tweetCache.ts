// Map that stores Promises of HTML strings or null.
// Using a Promise cache ensures that concurrent requests for the same Tweet URL
// will await the same fetch operation instead of triggering duplicate fetches.
// A null value indicates a failed fetch or invalid response, acting as a negative cache.
export const tweetHtmlCache = new Map<string, Promise<string | null>>();
