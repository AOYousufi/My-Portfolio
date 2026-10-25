# Portfolio release checklist

This is a static React/Vite app deployed as a built `dist/` directory. A successful local build is necessary but not sufficient for production readiness.

## 1. Make the change

- Create a branch from current `main`; make a focused change with a descriptive commit.
- Check the relevant UI using keyboard only, at mobile and desktop widths and in both themes.
- Keep page titles, canonical links and `public/sitemap.xml` aligned when adding or renaming routes.
- Never commit API keys, private credentials or `.env` secrets. Vite `VITE_*` variables are public in browser bundles.

## 2. Validate locally

Use Node.js 22 and a clean install:

```bash
npm ci
npm run verify
```

`verify` runs ESLint, the optimized Vite build, gzip/image budget, fast project/route smoke tests, and tests against the actual `dist/` deployment artifact.

Run the full browser suite before publishing:

```bash
npm install --no-save --no-package-lock --ignore-scripts @playwright/test@1.56.1 @axe-core/playwright@4.11.0
npx playwright install chromium
npx playwright test
```

The browser suite covers navigation, route and form behavior, metadata, keyboard focus, responsive overflow, theme persistence and WCAG 2.0/2.1 A/AA automated rules. Automated scans do **not** guarantee full WCAG conformance. CI currently uses Chromium, not WebKit or Firefox.

## 3. Review the pull request

- Open a PR against `main`; use the PR checklist and describe user-visible behavior and rollback risks.
- Wait for the `quality` and `browser` GitHub Actions jobs to pass.
- Inspect the deployment preview if a Netlify GitHub integration has provided one. Confirm the build uses `npm run build` and publishes `dist`.
- Manually verify keyboard traversal, accessible labels, visible focus, Escape-to-close behavior, 200% zoom, contact mailto handoff, and external links.
- Do not merge if required checks or preview verification fail. Enable branch protection with required status checks in GitHub repository settings where available.

## 4. Deploy and smoke-test

After the approved PR is merged, confirm the hosting provider actually deployed the new `main` commit (the CI workflow alone does not deploy the site).

Check the live site:

- Open `/`, `/projects`, `/projects/nc-news`, `/work-experience`, and `/contact` directly in a fresh browser tab.
- Confirm no blank screen, runtime errors, missing assets or broken navigation.
- Check that the contact form opens an email draft, not that an email was automatically sent.
- Confirm theme toggle, mobile menu, keyboard Escape, page title and canonical URL.
- Verify that `/sitemap.xml` and `/robots.txt` load and static assets have expected cache/security headers.
- Test with JavaScript and network behavior typical of a production browser (not just the dev server).

## 5. Roll back if necessary

If the deploy breaks the site, restore the previous successful deploy through the hosting provider's deploy history (if supported), or revert the change on `main` and allow a new deployment. Record the faulty commit and reproduction steps; do not force-push the shared `main` branch.

## Ownership and quality gates

| Stage | Gate |
| --- | --- |
| Local | `npm ci`, `npm run verify`, browser tests |
| Pull request | Code review plus green GitHub Actions quality and browser jobs |
| Preview | Manual visual, keyboard, mobile, dark/light verification |
| Production | Verify deployed commit and perform live smoke checks |
| Incident | Revert or restore previous deploy, then add a regression test |

The production host configuration, required branch protections and deployment permissions must be verified separately in GitHub and Netlify. This document does not imply they are already enabled.
