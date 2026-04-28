# Steel Concept — Project Operating File

> Created: 2026-04-28  
> Local path: `/mnt/ssd2/projects/github/b0r1v0j3/steel-concept`  
> Remote: `https://github.com/b0r1v0j3/steel-concept`

## Jedna rečenica

**Steel Concept je statičan prezentacioni sajt za Steel Concept d.o.o. Branislava, fokusiran na sendvič panele i kontakt/lead generation.**

## Biznis kontekst

- Sajt treba da bude brz, jednostavan i pouzdan.
- Primarni cilj je da korisnik razume ponudu i pozove/pošalje upit.
- Nema potrebe za komplikovanom aplikacijom dok statičan sajt radi posao.

## Stack

- Statičan HTML/CSS/JS sa root deploy-em
- Vercel
- Domen: `steel-concept.com` i `www.steel-concept.com`
- Assets u `assets/`

## Source of truth

Pre rada pročitati:

1. `README.md`
2. `index.html`
3. `products-data.js`
4. `product.js`, `product-details.js`, `product-description.js`, `product-hero-specs.js`
5. `styles.css`

## Lokalni rad

```bash
python -m http.server 4173
```

Zatim otvoriti lokalno:

```text
http://localhost:4173
```

## Kako agent treba da radi ovde

1. Držati projekat statičnim dok nema jak razlog za framework.
2. Svaka izmena proizvoda treba da ažurira listu, detalj, SEO title/meta i eventualno sitemap.
3. Proveriti mobile prikaz — većina leadova može doći sa telefona.
4. Paziti na OG image/meta tagove za link preview.
5. Nakon izmene proveriti da nema broken asset path-ova.

## Ne dirati bez eksplicitne odluke

- Ne uvoditi CMS/framework/build proces bez potrebe.
- Ne menjati domen/Vercel podešavanja bez provere.
- Ne uklanjati postojeće kontakt informacije bez zamene.

## Sledeći pametni koraci

1. Dodati jasniji lead form ili WhatsApp/telefon CTA ako biznis to želi.
2. Srediti SEO: title/description po proizvodu, sitemap, structured data.
3. Dodati nekoliko realnih case/project fotografija ako postoje.
4. Proveriti Core Web Vitals/mobile Lighthouse.
