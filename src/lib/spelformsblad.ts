import { getCollection } from 'astro:content';

// Bladen i nivåordning, yngst först.
const ordning = ['ljusgron', 'gron', 'bla', 'rod'];

export const hamtaBlad = async () =>
	(await getCollection('spelformsblad')).sort((a, b) => ordning.indexOf(a.data.niva) - ordning.indexOf(b.data.niva));
