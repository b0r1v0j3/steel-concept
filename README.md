# Steel Concept

Statičan prezentacioni sajt spreman za GitHub + Vercel deploy.

## Lokalno

Za lokalni pregled može da se pokrene jednostavan static server, na primer:

```powershell
python -m http.server 4173
```

## GitHub + Vercel

1. Napravi GitHub repo i poveži ovaj folder kao `origin`.
2. Pushuj `main` granu na GitHub.
3. U Vercel-u izaberi `Add New Project` i importuj repo.
4. Vercel će ovaj projekat tretirati kao statičan sajt iz root foldera.
5. Dodaj domen `steel-concept.com` i `www.steel-concept.com` u Project Settings > Domains.

## Domen

Po aktuelnoj Vercel dokumentaciji, apex domen (`steel-concept.com`) se tipično povezuje preko `A` zapisa ka `76.76.21.21`, dok se `www` dodaje kao `CNAME` koji Vercel prikaže u panelu za konkretan projekat.
