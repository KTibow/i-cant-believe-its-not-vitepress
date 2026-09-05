# I Can't Believe It's Not VitePress

A [Starlight](https://starlight.astro.build) theme that looks and lays out like
[VitePress](https://vitepress.dev) — one centred band, Inter, and a table of contents that stays
next to the words it describes instead of drifting to the far edge of a wide monitor.

```
packages/i-cant-believe-its-not-vitepress/   the theme
docs/                                        a demo site that uses it
```

## Develop

```sh
pnpm install
pnpm dev       # demo site at localhost:4321
pnpm build
```

The theme is consumed by the demo through a workspace link, so edits to
`packages/i-cant-believe-its-not-vitepress` show up in `pnpm dev` immediately.

See [the package README](packages/i-cant-believe-its-not-vitepress/README.md) for installation,
options and how the theme is put together.

## License

MIT
