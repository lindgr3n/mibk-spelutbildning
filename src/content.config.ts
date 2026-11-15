import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Allt innehåll ligger som Markdown i mappen innehall/. Det är källan; webbsidan byggs från den.
const niva = z.enum(['gron', 'bla', 'rod']);

// Planen, nivådokumenten, ordlistan med flera: ett dokument per fil.
const dokument = defineCollection({
	loader: glob({ pattern: ['*.md', 'nivaer/*.md'], base: './innehall' }),
	schema: z.object({
		titel: z.string(),
		niva: niva.optional(),
	}),
});

// Övningsbanken: ett kort per fil (o01.md … o67.md).
const ovningar = defineCollection({
	loader: glob({ pattern: '*.md', base: './innehall/ovningsbank/ovningar' }),
	schema: z.object({
		nr: z.number().int().positive(),
		titel: z.string(),
		tema: z.string(),
		namn: z.string(),
		niva,
		typ: z.enum(['sasongsplan', 'alternativ']),
		nivaText: z.string().optional(),
		princip: z.string().optional(),
		roll: z.string().optional(),
		temaFull: z.string().optional(),
		fardighet: z.string().optional(),
	}),
});

// Exempelpass (ett per nivå).
const pass = defineCollection({
	loader: glob({ pattern: '*.md', base: './innehall/ovningsbank/pass' }),
	schema: z.object({ titel: z.string(), niva }),
});

// Övningsbankens inledning.
const ovningsbank = defineCollection({
	loader: glob({ pattern: 'index.md', base: './innehall/ovningsbank' }),
	schema: z.object({ titel: z.string() }),
});

// Spelformsblad: ett enkelt blad per nivå, i samma anda som fotbollens nationella spelformer.
const spelformsblad = defineCollection({
	loader: glob({ pattern: '*.md', base: './innehall/spelformsblad' }),
	schema: z.object({
		niva: z.enum(['ljusgron', 'gron', 'bla', 'rod']),
		nivaNamn: z.string(),
		undertitel: z.string(),
		alder: z.string(),
		spelform: z.string(),
		kort: z.string(),
		forutsattningar: z.array(
			z.object({
				ikon: z.enum(['court', 'goal', 'users', 'clock', 'swap', 'trophy', 'calendar', 'megaphone']),
				rubrik: z.string(),
				varde: z.string(),
				tips: z.string().optional(),
			}),
		),
	}),
});

export const collections = { dokument, ovningar, pass, ovningsbank, spelformsblad };
