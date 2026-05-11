# GitHub Pages Deployment

This is a Vite app. GitHub Pages must serve the built `dist/` folder, not the
repository root.

If Pages serves the root `index.html`, the browser will try to load
`/src/main.tsx` and fail with a MIME error because GitHub Pages does not compile
TypeScript or JSX.

## Setup

1. Push this repository to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Set `Build and deployment -> Source` to `GitHub Actions`.
4. Push to `main`, or run the `Deploy GitHub Pages` workflow manually.

That Pages source setting requires admin access to the repository. A user with
only write access can push the workflow, but GitHub Pages will keep serving the
root `index.html` until an admin switches the source to `GitHub Actions`.

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
