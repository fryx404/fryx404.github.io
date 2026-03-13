// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://fryx404.github.io',
	integrations: [mdx(), sitemap()],
	vite: {
		resolve: {
			alias: {
				'@components': '/src/components',
			},
		},
	},
});
