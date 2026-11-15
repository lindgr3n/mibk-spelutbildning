// Säsong och födelseår per nivå och år på nivån. Räknas ut från datumet när sidan byggs,
// så ingen behöver uppdatera årtal för hand.
//
// Säsongen börjar 1 juli (säsongen 2026/27 gäller från juli 2026).
// Åldern är det år barnet fyller under säsongens startår: födelseår = startår − ålder.
// Det stämmer med exemplet 2026/27: ljusgrön 2020 (6 år), grön 2019, 2018, 2017 (7, 8, 9 år).

export const SASONGSSTART_MANAD = 7; // juli

/** @typedef {{ id: string, division: string | null, niva: string, etikett: string, alder: number }} Kull */
// division är vilken division årskullen normalt spelar i. Grön: första året utan målvakt (div 9), därefter med (div 8).
// Blå: 10–11 år div 7 (rullande tid), 11–12 år div 6 (effektiv tid). Röd: divisionen beror på spelnivå, inte ålder.
// Uppskattning ur nivådokumenten och ska bekräftas.

/** @type {Kull[]} */
export const kullDefinitioner = [
	{ id: 'ljusgron', division: null, niva: 'Ljusgrön', etikett: 'Ljusgrön', alder: 6 },
	{ id: 'gron1', division: '9', niva: 'Grön', etikett: 'Första året', alder: 7 },
	{ id: 'gron2', division: '8', niva: 'Grön', etikett: 'Andra året', alder: 8 },
	{ id: 'gron3', division: '8', niva: 'Grön', etikett: 'Tredje året', alder: 9 },
	{ id: 'bla1', division: '7', niva: 'Blå', etikett: 'Första året', alder: 10 },
	{ id: 'bla2', division: '6–7', niva: 'Blå', etikett: 'Andra året', alder: 11 },
	{ id: 'bla3', division: '6', niva: 'Blå', etikett: 'Tredje året', alder: 12 },
	{ id: 'rod1', division: '1–5', niva: 'Röd', etikett: 'Första året', alder: 13 },
	{ id: 'rod2', division: '1–5', niva: 'Röd', etikett: 'Andra året', alder: 14 },
	{ id: 'rod3', division: '1–5', niva: 'Röd', etikett: 'Tredje året', alder: 15 },
	{ id: 'rod4', division: '1–5', niva: 'Röd', etikett: 'Fjärde året', alder: 16 },
];

/** Året säsongen startar, till exempel 2026 för säsongen 2026/27. */
/** @param {Date} [datum] */
export function sasongsStartAr(datum = new Date()){
	return datum.getMonth() + 1 >= SASONGSSTART_MANAD ? datum.getFullYear() : datum.getFullYear() - 1;
}

/** Säsongens namn, till exempel "2026/27". */
export function sasongNamn(datum = new Date()){
	const start = sasongsStartAr(datum);
	return `${start}/${String(start + 1).slice(-2)}`;
}

export function fodelsear(kull, datum = new Date()){
	return sasongsStartAr(datum) - kull.alder;
}

/** Alla kullar med födelseår för säsongen. */
export function kullar(datum = new Date()) {
	return kullDefinitioner.map((k) => ({ ...k, fodelsear: fodelsear(k, datum) }));
}

/** Födelseår för en hel nivå ('ljusgron' | 'gron' | 'bla' | 'rod'), äldst först, till exempel "2019, 2018 och 2017". */
export function nivaFodelsear(niva, datum = new Date()){
	const namn = { ljusgron: 'Ljusgrön', gron: 'Grön', bla: 'Blå', rod: 'Röd' }[niva];
	const ar = kullar(datum)
		.filter((k) => k.niva === namn)
		.map((k) => k.fodelsear);
	return ar.length > 1 ? `${ar.slice(0, -1).join(', ')} och ${ar[ar.length - 1]}` : String(ar[0]);
}
