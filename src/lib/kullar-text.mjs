// Byter platshållare i text mot säsong och födelseår som räknas ut när sidan byggs.
//   {{sasong}}        -> 2026/27
//   {{nivakullar:gron}} -> 2019, 2018 och 2017  (ljusgron, gron, bla, rod)
//   {{kull:gron1}}    -> 2019   (id:n finns i sasong.mjs: ljusgron, gron1–3, bla1–3, rod1–4)
import { kullDefinitioner, sasongNamn, fodelsear, nivaFodelsear } from './sasong.mjs';

const platshallare = /\{\{\s*(sasong|kull:[a-z0-9]+|nivakullar:[a-z]+)\s*\}\}/g;

export function ersattKullar(text) {
	return text.replace(platshallare, (traff, namn) => {
		if (namn === 'sasong') return sasongNamn();
		if (namn.startsWith('nivakullar:')) return nivaFodelsear(namn.slice(11));
		const kull = kullDefinitioner.find((k) => k.id === namn.slice(5));
		if (!kull) throw new Error(`Okänd kull i ${traff}. Giltiga: ${kullDefinitioner.map((k) => k.id).join(', ')}`);
		return String(fodelsear(kull));
	});
}
