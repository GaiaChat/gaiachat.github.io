# GitHub Pages Deployment

This is a Vite app. GitHub Pages must serve the built `dist/` folder, not the
repository root.

The preferred deployment is GitHub Actions serving `dist/`, but the repository
root is also safe for legacy GitHub Pages. The root `index.html` loads committed
production assets from `assets/` on `gaiachat.github.io`, and only loads
`/src/main.tsx` when running the Vite dev server on port `5173`.

## Setup

1. Push this repository to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Set `Build and deployment -> Source` to `GitHub Actions`.
4. Push to `main`, or run the `Deploy GitHub Pages` workflow manually.

That Pages source setting requires admin access to the repository. A user with
only write access can push the workflow, but GitHub Pages will keep serving the
root `index.html` until an admin switches the source to `GitHub Actions`.

Run `pnpm build` before committing site changes. The build refreshes both
`dist/` for the Actions artifact and the root `assets/` files used by legacy
Pages mode.

Optional repository variables for the workflow:

- `VITE_ADSENSE_CLIENT`
- `VITE_SOURCE_URL`
- `VITE_GAIA_RELEASE_URL`
- `VITE_GAIA_LINUX_URL`
- `VITE_GAIA_USAGE_COUNT_URL`
- `VITE_CURRENT_RELEASE_URL`
- `VITE_CURRENT_SOURCE_URL`
- `VITE_CURRENT_SERVER_LINUX_URL`

`VITE_ADSENSE_CLIENT` should look like `ca-pub-...`. The site-level AdSense
script is installed in `index.html` for verification. Fixed display ad units are
intentionally not rendered during site review.

The site also publishes `ads.txt` at the domain root:

```text
google.com, pub-1998367148417325, DIRECT, f08c47fec0942fa0
```

If the AdSense account changes, update `public/ads.txt`, `index.html`, and run
`pnpm build` so both `dist/ads.txt` and the legacy root `ads.txt` are refreshed.

## Live Usage Count

The launcher sends an anonymous heartbeat to `/api/usage/ping` by default.
Static GitHub Pages cannot receive that POST, so leave
`VITE_GAIA_USAGE_COUNT_URL` unset for the GitHub Pages deployment. The included
`functions/api/usage/[[path]].ts` endpoint is for Cloudflare Pages or another
host with function support. Bind a KV namespace named `GAIA_USAGE_KV`, then point
`VITE_GAIA_USAGE_COUNT_URL` at `/api/usage` and launcher `GAIA_USAGE_PING_URL`
at the deployed `/api/usage/ping` URL.

If AdSense only gives you this code, it is the site-level or Auto Ads script:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1998367148417325" crossorigin="anonymous"></script>
```

That script is installed in `index.html` for site verification and Auto Ads, but
it does not fill a specific fixed banner. After approval, add fixed display units
deliberately on content-led pages, not on empty, login, error, or download-only
screens.
