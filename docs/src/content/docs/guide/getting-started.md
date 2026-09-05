---
title: Getting started
description: Install the theme and add it to your Starlight config.
---

## Install

```sh
pnpm add i-cant-believe-its-not-vitepress
```

## Add it to your config

The theme is a Starlight plugin. Add it to `plugins` and you are done — there is nothing to import
into your own CSS.

```js title="astro.config.mjs" {3,9}
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

## Options

Every option has a sensible default; you can pass nothing at all.

```js
vitepress({
  // Self-host Inter (variable, with the optical sizing axis).
  fonts: true,
  // Widest the whole layout is allowed to get.
  layoutMaxWidth: '88rem',
  // Use VitePress's Shiki themes and code block chrome.
  syntaxHighlighting: true,
});
```

:::tip
Prefer VitePress's exact geometry? Pass `layoutMaxWidth: '90rem'`. Working on a very wide display
and want to use more of it? `'104rem'` still keeps the columns together while giving the prose more
room to breathe.
:::

## Next

- [Configuration](../../reference/configuration/) — every option in detail.
- [Styling](../../reference/styling/) — the custom properties to reach for when you want a different
  accent colour or a wider content column.
