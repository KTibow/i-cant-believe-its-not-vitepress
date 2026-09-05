// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vitepress from 'i-cant-believe-its-not-vitepress';
import pageActions from 'starlight-page-actions';

export default defineConfig({
	site: 'https://ktibow.github.io',
	base: '/i-cant-believe-its-not-vitepress/',
	integrations: [
		starlight({
			title: "I Can't Believe It's Not VitePress",
			description:
				'A Starlight theme that looks and lays out like VitePress, with the table of contents kept next to the text.',
			plugins: [
				vitepress(),
				/*
				 * Copy-as-markdown button, `<page>.md` for every page, and `/llms.txt`.
				 * The theme deliberately does not reimplement any of this — it just makes
				 * sure the buttons look native. See the styling reference.
				 */
				pageActions({
					baseUrl: 'https://ktibow.github.io/i-cant-believe-its-not-vitepress',
					position: 'page-title',
					actions: { markdown: true, chatgpt: true, claude: true },
					share: false,
				}),
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' },
			],
			sidebar: [
				{
					label: 'Introduction',
					items: [
						{ label: 'What is this?', slug: 'guide/what-is-this' },
						{ label: 'Getting started', slug: 'guide/getting-started' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Configuration', slug: 'reference/configuration' },
						{ label: 'Styling', slug: 'reference/styling' },
						{ label: 'Kitchen sink', slug: 'reference/kitchen-sink', badge: 'demo' },
					],
				},
			],
		}),
	],
});
