# Brand font files

Drop the licensed `.woff2` files here using **exactly** these filenames. They are
already declared in `app/styles/brand-fonts.css`, so nothing else needs changing —
the site picks them up on the next load and the stand-in fonts stop being used.

## The Seasons

```
TheSeasons-Light.woff2
TheSeasons-Regular.woff2
TheSeasons-Italic.woff2
TheSeasons-Bold.woff2
```

The Seasons is a commercial font and needs a webfont licence for use on a live
site. Until the files are here, headlines render in **Cormorant Garamond**.

## Glacial Indifference

```
GlacialIndifference-Regular.woff2
GlacialIndifference-Italic.woff2
GlacialIndifference-Bold.woff2
```

Glacial Indifference is free but is not served by Google Fonts, so it has to be
self-hosted. Until the files are here, body copy renders in **Jost**.

## Converting to woff2

If you have `.otf` or `.ttf` files, convert them first — woff2 is roughly a third
of the size. Any web font converter will do it, or:

```bash
npm install -g ttf2woff2
ttf2woff2 < TheSeasons-Regular.ttf > TheSeasons-Regular.woff2
```

Poppins needs nothing here. It comes from Google Fonts and is already exact.
