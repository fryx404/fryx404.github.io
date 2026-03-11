import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

function idToSlug(id) {
	return id.replace(/\/index\.(md|mdx)$/, '').replace(/\.(md|mdx)$/, '');
}

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			pubDate: post.data.pubDate,
			link: `/blog/${idToSlug(post.id)}/`,
		})),
	});
}
