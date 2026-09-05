import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StarlightPlugin } from '@astrojs/starlight/types';

export interface VitePressThemeConfig {
	/**
	 * Self-host Inter (variable, with the optical sizing axis) as the UI font, the
	 * way VitePress does. Only the Unicode subsets a page uses are downloaded.
	 *
	 * Set to `false` to keep Starlight's system font stack, or to use your own
	 * `--sl-font` from custom CSS.
	 *
	 * @default true
	 */
	fonts?: boolean;

	/**
	 * Widest the whole layout is allowed to get. Past this the extra space becomes
	 * margin on the outside of the page instead of gap between the sidebar, the
	 * prose and the table of contents — which is the entire point of the theme.
	 *
	 * Any CSS length works. VitePress uses `90rem`; the default here is slightly
	 * tighter so the contents list sits closer to the text.
	 *
	 * @default '88rem'
	 */
	layoutMaxWidth?: string;

	/**
	 * Apply VitePress's syntax highlighting themes (`github-light` / `github-dark`)
	 * and its code block chrome to Expressive Code.
	 *
	 * Set to `false` if you configure `expressiveCode` yourself.
	 *
	 * @default true
	 */
	syntaxHighlighting?: boolean;
}

/** Components this theme replaces, and the file each one is replaced with. */
const overrides = {
	PageFrame: 'i-cant-believe-its-not-vitepress/overrides/PageFrame.astro',
	Header: 'i-cant-believe-its-not-vitepress/overrides/Header.astro',
	TwoColumnContent: 'i-cant-believe-its-not-vitepress/overrides/TwoColumnContent.astro',
	PageSidebar: 'i-cant-believe-its-not-vitepress/overrides/PageSidebar.astro',
} as const;

/**
 * A Starlight theme that looks and lays out like VitePress.
 *
 * ```js
 * // astro.config.mjs
 * starlight({
 *   title: 'My docs',
 *   plugins: [vitepress()],
 * })
 * ```
 */
export default function vitepress(config: VitePressThemeConfig = {}): StarlightPlugin {
	const { fonts = true, layoutMaxWidth, syntaxHighlighting = true } = config;

	return {
		name: 'i-cant-believe-its-not-vitepress',
		hooks: {
			'config:setup'({ config: starlightConfig, updateConfig, addIntegration, logger }) {
				/*
				 * Anything the user has already overridden is left alone — their component
				 * wins, and we say so rather than silently dropping their choice.
				 */
				const components: Record<string, string> = {};
				for (const [name, path] of Object.entries(overrides)) {
					if (starlightConfig.components?.[name as keyof typeof overrides]) {
						logger.warn(
							`Not overriding the \`${name}\` component: it is already set in your Starlight config. ` +
								`The VitePress layout may not look right without it.`
						);
						continue;
					}
					components[name] = path;
				}

				updateConfig({
					components: { ...starlightConfig.components, ...components },
					/*
					 * The theme's CSS goes first so that anything in the user's own
					 * `customCss` still has the last word.
					 */
					customCss: [
						...(fonts ? ['i-cant-believe-its-not-vitepress/styles/fonts.css'] : []),
						'i-cant-believe-its-not-vitepress/styles/theme.css',
						...(starlightConfig.customCss ?? []),
					],
					...(syntaxHighlighting && starlightConfig.expressiveCode !== false
						? {
								expressiveCode: {
									// VitePress's own Shiki defaults.
									themes: ['github-dark', 'github-light'],
									/*
									 * VitePress renders a shell snippet exactly like any other code
									 * block. Expressive Code otherwise wraps it in a terminal frame
									 * with macOS window buttons, which is a long way from the look
									 * this theme is going for.
									 */
									defaultProps: { frame: 'code' },
									styleOverrides: {
										borderRadius: '0.5rem',
										borderWidth: '0px',
										borderColor: 'transparent',
										codeBackground: 'var(--vp-c-bg-alt)',
										codeFontSize: '0.875rem',
										codeLineHeight: '1.7',
										codePaddingBlock: '1rem',
										codePaddingInline: '1.25rem',
										uiFontFamily: 'var(--__sl-font)',
										uiFontSize: '0.8125rem',
										scrollbarThumbColor: 'var(--vp-c-divider)',
										frames: {
											editorBackground: 'var(--vp-c-bg-alt)',
											editorTabBarBackground: 'var(--vp-c-bg-alt)',
											editorTabBarBorderBottomColor: 'var(--vp-c-divider)',
											editorActiveTabBackground: 'var(--vp-c-bg-alt)',
											editorActiveTabForeground: 'var(--vp-c-text-1)',
											editorActiveTabBorderColor: 'transparent',
											editorActiveTabIndicatorTopColor: 'var(--vp-c-brand-1)',
											editorActiveTabIndicatorBottomColor: 'transparent',
											editorTabsMarginInlineStart: '0',
											terminalBackground: 'var(--vp-c-bg-alt)',
											terminalTitlebarBackground: 'var(--vp-c-bg-alt)',
											terminalTitlebarBorderBottomColor: 'var(--vp-c-divider)',
											terminalTitlebarForeground: 'var(--vp-c-text-2)',
											terminalTitlebarDotsForeground: 'transparent',
											terminalTitlebarDotsOpacity: '0',
											frameBoxShadowCssValue: 'none',
											inlineButtonBackground: 'var(--vp-c-text-3)',
											inlineButtonForeground: 'var(--vp-c-text-2)',
											inlineButtonBorder: 'var(--vp-c-divider)',
											tooltipSuccessBackground: 'var(--vp-c-brand-3)',
										},
										textMarkers: {
											markBackground: 'var(--vp-c-default-soft)',
											markBorderColor: 'var(--vp-c-text-3)',
											insBackground: 'var(--vp-c-green-soft)',
											insBorderColor: 'var(--vp-c-green-3)',
											delBackground: 'var(--vp-c-red-soft)',
											delBorderColor: 'var(--vp-c-red-3)',
										},
									},
									// Anything the user set themselves still wins.
									...(typeof starlightConfig.expressiveCode === 'object'
										? starlightConfig.expressiveCode
										: {}),
								},
							}
						: {}),
					/*
					 * The band width is a single custom property, so it ships as one
					 * declaration in the head rather than as a second stylesheet. The
					 * doubled `:root` makes it independent of where the tag lands.
					 */
					head: [
						...(starlightConfig.head ?? []),
						...(layoutMaxWidth
							? [
									{
										tag: 'style' as const,
										attrs: {},
										content: `:root:root{--vp-layout-max-width:${layoutMaxWidth}}`,
									},
								]
							: []),
					],
				});

				/*
				 * Vite's dev server only serves files under the project root. For a normal
				 * install the font files are already there, but for a linked or workspace
				 * install they resolve next to *this* package instead, and the dev server
				 * refuses them with "outside of Vite serving allow list". Allow wherever
				 * they actually landed.
				 */
				if (fonts) {
					const allow = [fileURLToPath(new URL('.', import.meta.url))];
					try {
						const require = createRequire(import.meta.url);
						allow.push(dirname(require.resolve('@fontsource-variable/inter/opsz.css')));
					} catch {
						// Resolved from somewhere else; the package directory above will do.
					}
					addIntegration({
						name: 'i-cant-believe-its-not-vitepress/fs-allow',
						hooks: {
							'astro:config:setup': ({ updateConfig: updateAstroConfig }) => {
								updateAstroConfig({ vite: { server: { fs: { allow } } } });
							},
						},
					});
				}
			},
		},
	};
}
