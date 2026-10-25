# Portfolio QA checklist

Use this checklist before merging UI work or deploying. The automated checks catch regressions, but cannot replace a browser review.

## Automated checks

```bash
npm ci
npm run lint
npm run build
npm run budget
npm run test:smoke
```

The smoke suite lives in `tests/portfolio-smoke.test.mjs`. Browser scenarios live in `e2e/portfolio.spec.js`.

To run the browser suite locally, after building:

```bash
npm install --no-save --no-package-lock --ignore-scripts @playwright/test@1.56.1 @axe-core/playwright@4.11.0
npx playwright install chromium
npx playwright test
```

## Manual browser review

- [ ] Open the home page and each project case study directly, including a fresh page reload.
- [ ] Check project links and external profile links open the intended destinations.
- [ ] Check narrow mobile, tablet and desktop widths for clipped text, sideways scrolling and broken navigation.
- [ ] Try keyboard-only navigation; verify visible focus, meaningful link text and usable controls.
- [ ] Check light and dark theme contrast and theme persistence after refresh.
- [ ] Review the contact form: validation should make sense and successful interaction should open an email client, **not** claim to send directly.
- [ ] Check images for loading, appropriate alternative text and unintended layout shifts.
- [ ] Re-test changed flows in Safari and Firefox when available. CI's browser coverage is Chromium, not a guarantee of cross-browser parity.

## Deployment review

- [ ] Confirm `public/_redirects` still supports direct loading of client-side routes on Netlify.
- [ ] Confirm `public/sitemap.xml` covers the canonical routes.
- [ ] Verify the deployed site separately; a local build does not prove the production deployment works.
- [ ] Recheck changed pages after deployment.

If a check fails, record the browser, viewport, route, reproduction steps, expected behaviour and actual behaviour before fixing it.
