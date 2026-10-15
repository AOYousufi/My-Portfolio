# Ahmad Ozair Yousufi | Developer portfolio

**Live:** https://ahmadyousufi.dev/  
**GitHub:** https://github.com/AOYousufi  
**LinkedIn:** https://www.linkedin.com/in/ahmad-ozair-yousufi-08b469326

A responsive React portfolio presenting my work in software development and commercial QA testing. I'm studying BSc (Hons) Software Development with a placement year at the University of Staffordshire and seeking a **2027 UK software engineering placement**.

## What you'll find

- **Home:** introduction, current placement goal, strengths and technology stack.
- **Projects:** three featured applications with consistent project cards and case studies.
- **Education:** degree study and technical training.
- **Work Experience:** commercial QA and other roles.
- **Contact:** an email-client-based enquiry form, plus direct email and profile links.
- **Interactive terminal:** optional Easter egg for visitors.

### Projects

| Project | Description | Code | Demo |
| --- | --- | --- | --- |
| NC News | React + Express + PostgreSQL publishing and discussion app, with accounts, moderation, notifications and automated QA | [Frontend](https://github.com/AOYousufi/NC-news-FE) / [Backend](https://github.com/AOYousufi/NC-News-BE) | [Live app](https://nc-news-sultan.netlify.app/) |
| Virtual Exhibition | Collaborative museum discovery app integrating Harvard and V&A collection APIs | [Frontend](https://github.com/AOYousufi/Virtual-Exhibition) / [Backend](https://github.com/AOYousufi/SE-Exhibiton-BE) | [Live app](https://mueseumexhibition.netlify.app/) |
| My Plants | Collaborative React Native plant care app backed by Express and MongoDB | [Mobile](https://github.com/AOYousufi/my-plants-FE) / [Backend](https://github.com/AOYousufi/my-plants-BE) | Mobile repository |

Each project has a case study under `/projects/:projectId`. The cards and detail pages share the same data file, `src/data/projects.js`, so URLs and descriptions stay consistent.

## Stack

React 19, React Router 7, Vite 6, JavaScript, CSS, GSAP, and Node.js for build and QA scripts. This portfolio is a **static frontend** and does not require a database or server API.

## Develop locally

Requires Node.js 22 or a compatible current release.

```bash
git clone https://github.com/AOYousufi/My-Portfolio.git
cd My-Portfolio
npm ci
npm run dev
```

### Quality checks

```bash
npm run lint
npm run build
npm run budget
npm run test:smoke
```

GitHub Actions runs these four quality checks on pushes to `main` and pull requests. A separate Chromium browser job also tests direct route loading, mobile navigation and overflow, contact validation, theme persistence and automated axe-core accessibility rules. The asset budget limits compressed JavaScript + CSS to 200 KiB and each image asset to 600 KiB.

Smoke tests check route coverage, project metadata consistency, project source URL structure, sitemap coverage and contact form attributes. Browser tests exercise actual navigation and apply WCAG A/AA axe rules, failing for serious or critical violations. CI checks Chromium only; Safari/Firefox and the exact live deployment still require separate verification.

To run the same browser suite locally after `npm run build`:

```bash
npm install --no-save --no-package-lock --ignore-scripts @playwright/test@1.56.1 @axe-core/playwright@4.11.0
npx playwright install chromium
npx playwright test
```

## Deployment

The Vite output goes into `dist/`. The `public/_redirects` file ensures direct links to React routes work when served by Netlify. `public/_headers` adds browser security headers and immutable caching for hashed assets.

The contact form opens the visitor's configured email application. **It does not send a message directly from the browser**; visitors must press Send in their email app.

## Updating the portfolio

- Change project information in `src/data/projects.js`.
- Add or change routes and page titles in `src/App.jsx`.
- Keep `public/sitemap.xml` in sync with canonical routes.
- Run `npm run lint && npm run build && npm run budget && npm run test:smoke` before deploying.

---
Contact: [ozairyousufi1400@gmail.com](mailto:ozairyousufi1400@gmail.com)
