export type NivaKey = 'ljusgron' | 'gron' | 'bla' | 'rod';

// Nivåerna i spelutbildningen, yngst först. Svart har inget eget dokument än.
export const nivaer: { key: NivaKey; namn: string; undertitel: string; alder: string; spelform: string }[] = [
	{ key: 'ljusgron', namn: 'Ljusgrön nivå', undertitel: 'Lek och rörelse', alder: '0–6 år', spelform: 'Inga matcher' },
	{ key: 'gron', namn: 'Grön nivå', undertitel: 'Jag och bollen', alder: '6–9 år', spelform: '3 mot 3' },
	{ key: 'bla', namn: 'Blå nivå', undertitel: 'Jag, du och bollen', alder: '9–12 år', spelform: '4 mot 4 med målvakt' },
	{ key: 'rod', namn: 'Röd nivå', undertitel: 'Jag, vi och spelet', alder: '12–16 år', spelform: '5 mot 5' },
];

// Ledarguiden äger regler och administration (spelform, plan, mål, domare, anmälan, matchdagen) och ett blad per nivå.
export const LEDARGUIDEN_URL = 'https://mibk-ledarguiden.vercel.app';

export const nivaNamn = (key: NivaKey) => nivaer.find((n) => n.key === key)!.namn;
