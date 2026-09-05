---
title: Configuration
description: Every option the theme accepts.
---

## `fonts`

**Type:** `boolean` · **Default:** `true`

Self-hosts Inter as the UI font — the variable cut with the optical sizing (`opsz`) axis intact,
which is the same face VitePress ships. Because `font-optical-sizing` defaults to `auto`, small text
picks up the wider, taller optical cut with no extra declarations.

Fontsource splits the family by Unicode range, so an English page downloads only the Latin subset
(about 72 kB) and nothing else.

Set it to `false` to fall back to Starlight's system stack, or to supply your own:

```css title="src/styles/custom.css"
:root {
  --sl-font: 'Geist Variable';
}
```

## `layoutMaxWidth`

**Type:** `string` · **Default:** `'88rem'`

The widest the whole layout is allowed to get, as any CSS length. This is the heart of the theme:
past this width the extra space becomes margin outside the layout rather than gap inside it, so the
sidebar, the prose and the contents list stay next to each other on a wide display.

VitePress itself uses `90rem`. The default here is a touch tighter so the contents list sits closer
to the text.

You can also set it from CSS, which is handy if you want it to vary:

```css title="src/styles/custom.css"
:root {
  --vp-layout-max-width: 100rem;
}
```

## `syntaxHighlighting`

**Type:** `boolean` · **Default:** `true`

Points Expressive Code at `github-dark` and `github-light`, the themes VitePress uses by default.
The chrome around the code — radius, padding, tab bar, terminal frame — is set with `--ec-*` custom
properties in the theme's stylesheet either way.

Set it to `false` if you configure `expressiveCode` yourself. Your own `expressiveCode` object is
otherwise preserved; only `themes` is set.

## Overriding a component

If you set one of the three components the theme replaces, yours wins and the theme logs a warning
so the layout change is not a surprise:

```js
starlight({
  plugins: [vitepress()],
  components: {
    // Yours. The theme will not touch it.
    PageSidebar: './src/components/MyContents.astro',
  },
});
```
