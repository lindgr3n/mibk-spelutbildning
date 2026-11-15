# Moälvens IBK – Spelutbildning

Webbsida med Moälvens IBK:s spelutbildning: spelutvecklingsplanen, nivåerna (grön, blå, röd), övningsbanken, ordlista och material för nya lag.

Sidan är byggd med [Astro](https://astro.build) och följer samma stil som [ledarguiden](https://mibk-ledarguiden.vercel.app/).

## Innehållet ligger i `innehall/`

All text är vanlig Markdown och är källan till sidan. Ändra i filerna, så uppdateras sidan vid nästa bygge.

| Fil | Sida |
|---|---|
| `innehall/plan.md` | Spelutvecklingsplanen (`/plan/`) |
| `innehall/nivaer/ljusgron.md`, `gron.md`, `bla.md`, `rod.md` | Nivåerna (`/nivaer/gron/` osv.) |
| `innehall/ovningsbank/index.md` | Om övningsbanken (`/ovningar/`) |
| `innehall/ovningsbank/ovningar/o01.md` … | Ett övningskort per fil (`/ovningar/o1/` osv.) |
| `innehall/ovningsbank/pass/*.md` | Exempelpass per nivå |
| `innehall/ordlista.md` | Ordlista |
| `innehall/nya-lag.md` | Uppstart av nya lag och mentorrutin |
| `innehall/att-vara-med.md` | Att vara med i Moälvens IBK |

### Ändra direkt på GitHub

1. Öppna filen på github.com och klicka på pennan (Edit).
2. Skriv i Markdown: `## Rubrik`, `- punkt`, `**fet**`, tabeller med `|`.
3. Spara med "Commit changes". Varje sida har också en länk, "Källfilen på GitHub", som går direkt till rätt fil.

### Övningskort

Varje övning har uppgifter överst i filen (frontmatter), till exempel:

```yaml
---
nr: 4
titel: 360 kontroll – Innebandykull
niva: gron        # gron, bla eller rod
typ: sasongsplan  # sasongsplan eller alternativ
---
```

Nästa lediga nummer är Ö68. Länka till ett annat kort med `[Ö12](/ovningar/o12/)`.

## Köra lokalt

Kräver Node 22.12 eller senare.

```sh
npm install
npm run dev      # utvecklingsserver på http://localhost:4321
npm run build    # bygger den statiska sidan till dist/
```

## Ny säsong sker automatiskt

Säsong och rekommenderade födelseår (grön, blå, röd och ljusgrön) räknas ut från datumet när sidan byggs, i `src/lib/sasong.mjs`. Säsongen byter den 1 juli. Eftersom sidan är statisk byggs den om automatiskt den 1 juli varje år av `.github/workflows/ny-sasong.yml`.

Engångsinställning (annars körs bygget inte):

1. I Vercel: projektets **Settings → Git → Deploy Hooks**. Skapa en hook (till exempel "ny-sasong") för grenen `main` och kopiera adressen.
2. På GitHub: repots **Settings → Secrets and variables → Actions → New repository secret**. Namn `VERCEL_DEPLOY_HOOK`, värde adressen från steg 1.
3. Testa genom att köra arbetsflödet för hand under **Actions → Bygg om inför ny säsong → Run workflow**.

Vilken årskull som spelar i vilken division står i `kullDefinitioner` i `src/lib/sasong.mjs`.

## Licens och ursprung

Materialet bygger på Svensk Innebandys spel- och spelarutvecklingsplaner och Västernorrlands Innebandyförbunds dokument. Källorna anges i respektive dokument.
