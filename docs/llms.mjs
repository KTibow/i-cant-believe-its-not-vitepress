/**
 * Repairs `dist/llms.txt` after the build.
 *
 * `starlight-page-actions` generates it, but its `normalizeUrl()` reduces the
 * configured `baseUrl` to `origin`, so a site served under an Astro `base` —
 * this one is at /i-cant-believe-its-not-vitepress/ — gets links missing that
 * segment. They also point at the HTML page rather than the `.md`, which is the
 * thing an agent actually wants to fetch.
 *
 * Both are upstream issues. This rewrites only the URLs, leaving the plugin's
 * grouping and titles alone.
 */
import { readFile, writeFile } from 'node:fs/promises';

const SITE = 'https://kendell.dev';
const BASE = '/i-cant-believe-its-not-vitepress';
const LLMS = 'dist/llms.txt';

const original = await readFile(LLMS, 'utf8');

const repaired = original.replace(
	new RegExp(`\\(${SITE}(/[^)\\s]*)\\)`, 'g'),
	(whole, path) => (path.startsWith(`${BASE}/`) ? whole : `(${SITE}${BASE}${path}.md)`)
);

await writeFile(LLMS, repaired);
console.log(`repaired ${LLMS}`);
