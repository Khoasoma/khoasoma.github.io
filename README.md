# Khoasoma — SSH Portfolio

An interactive command-line portfolio for [khoasoma.github.io](https://khoasoma.github.io), built as a zero-build static site for GitHub Pages.

## Local preview

Run any static HTTP server from the repository root, for example:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Main files

- `index.html` — terminal client shell
- `index_en.html` — redirect to the English terminal mode
- `portfolio.css` — responsive SSH client interface
- `portfolio.js` — command parser, output renderers, history and autocomplete

Run `help` inside the terminal to list the available commands.
