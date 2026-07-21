# AGENTS.md

## Cursor Cloud specific instructions

### What this is
A static personal portfolio website (Amirhossein Ahmadi). Stack: Grunt build system, Dart Sass, and Materialize CSS. There is no backend — it is served as static files.

### Services / commands
- Dev server: `yarn serve` (alias for `grunt serve`). Compiles SCSS, copies `src/` → `dist/`, then serves `dist/` on `http://localhost:8000` with `connect` + `watch` livereload. This is a long-running foreground process (keep it running in a background terminal/tmux).
- Production build: `yarn build` (alias for `grunt build`). Cleans `dist/`, compiles/minifies, and revs assets. Note: running `build` overwrites `dist/`, so re-run `yarn serve` afterwards to restore dev-mode output.
- Lint/tests: none are configured. `grunt-contrib-jshint`/`grunt-contrib-nodeunit` are installed but no task targets or test files exist, so there is nothing to lint or test.

### Non-obvious gotchas
- Frontend vendor libraries (materialize, jquery, jquery_lazyload, normalize-css) are installed via **Bower** into `src/vendors/` (gitignored). They are required for both `serve` and `build`: `src/scss/app.scss` imports `materialize/sass/materialize.scss` (via Sass `includePaths`), and `src/index.html` references `vendors/...` JS/CSS. If `src/vendors/` is empty, run `bower install`.
- Bower is installed globally via `yarn global add bower` but its bin dir (`$(yarn global bin)`, i.e. `~/.yarn/bin`) is not on `PATH` by default. Invoke it as `"$(yarn global bin)/bower"` or add that dir to `PATH` for the session.
- Bower resolves `jquery` to a 4.x release (Materialize 0.97 only pins `>=2.1.1`). The site renders and is interactive, but very heavy scrolling occasionally crashes the browser tab during headless testing — not an environment setup problem.
- The `connect` task has `open: true`; in a headless VM it simply fails to launch a browser and keeps serving — harmless.
- Sass emits many `DEPRECATION WARNING` lines (legacy `@import`, `lighten()/darken()`, `/` division) from the vendored Materialize source. These are warnings only; the build completes successfully.
