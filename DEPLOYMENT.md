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
- `VITE_ADSENSE_DOWNLOAD_SLOT`
- `VITE_SOURCE_URL`
- `VITE_GAIA_WINDOWS_URL`
- `VITE_GAIA_MAC_URL`
- `VITE_GAIA_LINUX_URL`
- `VITE_CURRENT_SERVER_WINDOWS_URL`
- `VITE_CURRENT_SERVER_MAC_URL`
- `VITE_CURRENT_SERVER_LINUX_URL`

`VITE_ADSENSE_CLIENT` should look like `ca-pub-...`. `VITE_ADSENSE_DOWNLOAD_SLOT`
is a separate numeric `data-ad-slot` value from the display ad unit code.

If AdSense only gives you this code, it is the site-level or Auto Ads script:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1998367148417325" crossorigin="anonymous"></script>
```

That script is installed in `index.html` for site verification and Auto Ads, but
it does not fill a specific fixed banner. The fixed download-page banner needs a
display ad unit with an `<ins class="adsbygoogle" ... data-ad-slot="...">`
snippet.
