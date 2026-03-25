export interface LinkMetadata {
	title?: string;
	description?: string;
	image?: string;
}

// Map that stores Promises of metadata.
// Using a Promise cache ensures that concurrent requests for the same URL
// will await the same fetch operation instead of triggering duplicate fetches.
export const linkMetadataCache = new Map<string, Promise<LinkMetadata>>();
