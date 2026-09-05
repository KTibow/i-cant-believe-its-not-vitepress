# i-cant-believe-its-not-vitepress

A [Starlight](https://starlight.astro.build) theme that looks and lays out like [VitePress](https://vitepress.dev).

Starlight's default layout spreads to fill the window. That is fine at laptop width and less fine at
3440 pixels: the navigation ends up pinned to the far left edge, the prose drifts right, and the
table of contents lands near the opposite edge of the desk. Reading is fine — *navigating* means a
long mouse journey every time.

VitePress refuses to spread. Everything sits inside one band, centred, and past that width the extra
space becomes margin. This theme brings that layout to Starlight, along with VitePress's palette,
type scale, nav bar, callouts and code blocks.

## Install

```sh
pnpm add i-cant-believe-its-not-vitepress
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vitepress from 'i-cant-believe-its-not-vitepress';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My docs',
      plugins: [vitepress()],
    }),
  ],
});
```

That is the whole setup. There is nothing to import into your own CSS.

## Options

| Option | Type | Default | What it does |
| --- | --- | --- | --- |
| `fonts` | `boolean` | `true` | Self-host Inter — the variable cut with the optical sizing axis, as VitePress ships it. Only the Unicode subsets a page uses are downloaded (Latin is ~72 kB). |
| `layoutMaxWidth` | `string` | `'88rem'` | Widest the whole layout gets. VitePress itself uses `90rem`; the default here is a touch tighter so the contents list sits closer to the text. |
| `syntaxHighlighting` | `boolean` | `true` | Point Expressive Code at `github-light` / `github-dark` and give it VitePress's code block chrome — including no macOS window buttons on shell snippets. |

Your own `expressiveCode` config still wins over the theme's; only the keys you leave unset are
filled in.

## How it is built

The point of the design is that it is a *token layer*, not a second stylesheet layered over
Starlight's.

- Starlight's CSS is written against `--sl-*` custom properties and lives inside
  `@layer starlight.*`. The theme re-points those properties from an unlayered sheet, so it restyles
  Starlight at the source and wins the cascade without `!important` or specificity games.
- The palette is declared twice — once for dark, once for light — and the mapping from Starlight's
  vocabulary onto it is declared once. Retinting is four declarations.
- Four components are replaced: `PageFrame`, `Header`, `TwoColumnContent` and `PageSidebar`. A
  Starlight component override *replaces* a component rather than wrapping it, so the CSS for the
  originals is never emitted — the overrides cost nothing on top of what Starlight already ships.
- Nothing else is forked. The sidebar list, search, callouts, code blocks, badges, pagination and
  every user component are Starlight's own, restyled in place, so badges, collapsible groups, the
  persisted open/closed state and i18n keep working and there is no copy of Starlight's markup here
  to drift out of date.

If you set one of those four components yourself, yours wins and the theme logs a warning rather
than silently dropping it.

## Copy page, `.md` routes and `llms.txt`

The theme does not ship a copy-page button, because
[`starlight-page-actions`](https://github.com/dlcastillop/starlight-page-actions) already does that
job — and does more of it than a theme should: a copy-as-markdown button, an "open in
ChatGPT/Claude/…" menu, a `<page>.md` rendering of every page, and an `llms.txt` index. Reaching for
it is the right call, and the theme styles its buttons so they read as native rather than bolted on.

```sh
pnpm add starlight-page-actions
```

```js
import vitepress from 'i-cant-believe-its-not-vitepress';
import pageActions from 'starlight-page-actions';

starlight({
  plugins: [
    vitepress(),
    pageActions({
      baseUrl: 'https://my-docs.example.com',
      position: 'page-title',
      actions: { markdown: true, chatgpt: true, claude: true },
    }),
  ],
});
```

The `.md` routes are what make a docs build worth checking out as a submodule for an agent: the
prose is readable without a HTML parser, and `/llms.txt` gives it a table of contents.

> [!NOTE]
> As of `starlight-page-actions` 0.7.1, `llms.txt` URLs are built from the *origin* of `baseUrl`, so
> a site served under an Astro `base` (a GitHub Pages project site, say) gets URLs missing that
> segment. Everything else works; only that file is affected.

## Styling

Everything worth changing is one custom property in your own `customCss`.

```css
/* Re-tint the whole theme. */
:root {
  --vp-c-brand-1: var(--vp-c-green-1);
  --vp-c-brand-2: var(--vp-c-green-2);
  --vp-c-brand-3: var(--vp-c-green-3);
  --vp-c-brand-soft: var(--vp-c-green-soft);
}

/* Or change the geometry. */
:root {
  --vp-layout-max-width: 100rem;
  --sl-sidebar-width: 17rem;
  --sl-content-width: 45rem;
  --vp-toc-width: 14rem;
  --vp-toc-gap: 2rem;
}
```

`gray`, `indigo`, `purple`, `green`, `yellow` and `red` ramps ship in both light and dark, each with
`-1` (readable text), `-2` (hover), `-3` (solid background) and `-soft` (translucent tint).

## License

MIT
