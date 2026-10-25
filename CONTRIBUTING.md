# Contributing to My-Portfolio

Thanks for taking an interest in this portfolio. Changes should be small, reviewable and tested before merging.

## Local setup

Use Node.js 22 or a compatible release.

```bash
npm ci
npm run dev
```

The site is built with React and Vite. See [README.md](README.md) for the project overview.

## Before opening a pull request

Run the project checks:

```bash
npm run lint
npm run build
npm run budget
npm run test:smoke
```

For browser-level testing, follow [docs/QA_CHECKLIST.md](docs/QA_CHECKLIST.md).

## Changes to projects and routes

- Update `src/data/projects.js` when changing project descriptions or links.
- Check both project cards and individual case-study pages, which use shared project data.
- Keep `public/sitemap.xml` aligned with canonical routes when routes change.
- Test the contact experience with the understanding that it opens the user's email application rather than sending from the website.

## Pull request checklist

- [ ] Explain what changed and why.
- [ ] Run lint, build, budget and smoke checks.
- [ ] Verify relevant routes and responsive layouts.
- [ ] Check links and keyboard navigation if the UI changed.
- [ ] Add screenshots for visible UI changes.

Do not commit secrets, credentials, `.env` files or local build output.
