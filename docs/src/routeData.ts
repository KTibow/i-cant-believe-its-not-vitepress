import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

/**
 * Starlight always emits a favicon link, defaulting to `/favicon.svg`, and
 * there is no way to switch it off through config. Dropping the tag restores
 * the browser's own behaviour: it asks the origin for `/favicon.ico`, which is
 * where this site already keeps one.
 */
export const onRequest = defineRouteMiddleware(({ locals }) => {
	const { head } = locals.starlightRoute;
	const favicon = head.findIndex(
		(entry) => entry.tag === 'link' && entry.attrs?.rel === 'shortcut icon'
	);
	if (favicon !== -1) head.splice(favicon, 1);
});
