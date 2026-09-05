---
title: Styling
description: The custom properties to reach for when you want to change something.
---

The theme is a token layer. Almost everything you might want to change is one custom property in
your own `customCss`, and because Starlight's stylesheets are all inside `@layer starlight.*`, your
unlayered declarations win without needing `!important` or a specificity fight.

```js title="astro.config.mjs"
starlight({
  plugins: [vitepress()],
  customCss: ['./src/styles/custom.css'],
});
```

## Brand colour

Four properties re-tint the entire theme — links, the active sidebar item, the contents marker, the
code tab indicator and the `tip` callout all follow them.

```css title="src/styles/custom.css"
:root {
  --vp-c-brand-1: var(--vp-c-green-1);
  --vp-c-brand-2: var(--vp-c-green-2);
  --vp-c-brand-3: var(--vp-c-green-3);
  --vp-c-brand-soft: var(--vp-c-green-soft);
}
```

`-1` is the readable text colour, `-2` the hover state, `-3` a solid background, and `-soft` a
translucent tint. The theme ships `gray`, `indigo`, `purple`, `green`, `yellow` and `red` ramps in
both light and dark.

## Layout

| Property | Default | What it does |
| --- | --- | --- |
| `--vp-layout-max-width` | `88rem` | Widest the whole layout gets. |
| `--sl-sidebar-width` | `17rem` | Navigation column. |
| `--sl-content-width` | `45rem` | Prose column. |
| `--vp-toc-width` | `14rem` | Contents rail. |
| `--vp-toc-gap` | `2rem` | Space between the prose and the rail. |

To pull the contents list right up against the text, shrink the gap:

```css
:root {
  --vp-toc-gap: 1.5rem;
}
```

## Type

```css
:root {
  --sl-text-h1: 1.75rem;
  --sl-text-h2: 1.5rem;
  --sl-text-h3: 1.25rem;
  --sl-line-height: 1.7;
}
```

## Light and dark

Palette values are declared twice: once on `:root` for dark, once on `:root[data-theme='light']`.
The mapping from Starlight's vocabulary onto them is declared only once, so redefining a `--vp-c-*`
property under both selectors is all a new palette takes.

```css
:root {
  --vp-c-bg: #101014;
}
:root[data-theme='light'] {
  --vp-c-bg: #fdfdfc;
}
```

## Page actions

The theme has no copy-page button of its own — [`starlight-page-actions`][spa] covers that, plus
`<page>.md` for every page and an `llms.txt` index. Add it alongside `vitepress()` and the buttons
pick up this palette on their own; the theme adjusts their shape to match the search box.

```js title="astro.config.mjs"
plugins: [
  vitepress(),
  pageActions({ baseUrl: 'https://my-docs.example.com', position: 'page-title' }),
],
```

Those rules key off the plugin's class names, so they simply do not match when it is not installed.

[spa]: https://github.com/dlcastillop/starlight-page-actions
