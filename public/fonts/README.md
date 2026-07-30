# Self-hosted fonts

Place the Helvetica Neue Roman webfont files here:

```
public/fonts/HelveticaNeue-Roman.woff2
public/fonts/HelveticaNeue-Roman.woff
```

The `@font-face` declaration in `src/index.css` points at these exact paths and
is applied through the `.font-helvetica-neue` class on the hero wrapper.

Helvetica Neue is a licensed typeface and is not redistributed with this
project. Until the files are added, the font stack falls back to a locally
installed Helvetica Neue, then Inter. Vite prints a resolve warning for the
missing URLs at build time; it is harmless and disappears once the files exist.