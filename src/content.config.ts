import { defineCollection, z } from 'astro:content';

const works = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		image: image().optional(),
		description: z.string().optional(),
		tags: z.array(z.string()).optional(),
		url: z.string().optional(), // 外部リンク（任意）
		features: z.array(z.string()).optional(), // ショーケース用の特徴リスト
	}),
});

const blog = defineCollection({
	schema: ({ image }) => z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		description: z.string().optional(),
		image: image().optional(),
	}),
});

const journal = defineCollection({
	schema: ({ image }) => z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		description: z.string().optional(),
		image: image().optional(),
	}),
});

export const collections = { works, blog, journal };