---
title: What is this?
description: Why a VitePress-shaped Starlight theme exists, and what it changes.
---

Starlight's default layout spreads to fill whatever screen you give it. That is fine at laptop
width, and less fine at 3440 pixels: the navigation ends up pinned to the far left edge, the prose
drifts right, and the table of contents lands somewhere near the other end of the desk. Reading is
fine. *Navigating* means a long mouse journey every time.

VitePress solves this by refusing to spread. Everything lives inside one band — 1440 pixels by
default — centred in the viewport. Past that width the extra space becomes margin. Sidebar, text and
contents stay a flick apart no matter how big the display is.

This theme brings that layout to Starlight, along with VitePress's palette, type scale and code
block chrome.

## What actually changes

Three of Starlight's layout components are replaced:

| Component | Why |
| --- | --- |
| `PageFrame` | Pins the header, sidebar and main frame to the centred band. |
| `TwoColumnContent` | Makes the contents rail a fixed column one gap away from the prose, instead of a share of the leftover viewport. |
| `PageSidebar` | Restyles the contents list as VitePress's document outline. |

Everything else — colours, type, tables, callouts, code blocks, the navigation list — is done by
re-pointing Starlight's own custom properties.

:::note
Component overrides in Starlight *replace* a component, they do not wrap it. The CSS for the
originals is never emitted, so the three overrides above cost nothing on top of what Starlight
already ships.
:::

## What it does not change

No markup is duplicated beyond those three files, so sidebar badges, collapsible groups, the
persisted open/closed state, search, i18n, the mobile menu and every user component keep working
exactly as documented. If a future Starlight release changes how the sidebar list is built, this
theme inherits the change instead of fighting it.
