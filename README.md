<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:050510,50:4f8eff,100:00d4ff&height=200&section=header&text=Ahmad%20Ozair%20Yousufi&fontSize=52&fontColor=f0f0ff&fontAlignY=38&desc=Full-Stack%20Developer%20%7C%20React%20%7C%20UI%20Craftsman&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Syne&weight=700&size=22&pause=1200&color=4F8EFF&center=true&vCenter=true&width=600&lines=Building+interfaces+that+feel+alive.;GSAP+animations+%2B+React+19.;From+concept+to+pixel-perfect+reality.;Northcoders+bootcamp+graduate.;BSc+Software+Development+%40+Staffordshire.)](https://git.io/typing-svg)

<br/>

[![Portfolio](https://img.shields.io/badge/🌐_Live_Portfolio-ahmadyousufi.dev-4f8eff?style=for-the-badge&labelColor=050510)](https://ahmadyousufi.dev/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=050510)](https://www.linkedin.com/in/ahmad-ozair-yousufi/)
[![GitHub](https://img.shields.io/badge/GitHub-AOYousufi-7c3aed?style=for-the-badge&logo=github&logoColor=white&labelColor=050510)](https://github.com/AOYousufi)
[![Email](https://img.shields.io/badge/Email-Say_Hello-00d4ff?style=for-the-badge&logo=gmail&logoColor=white&labelColor=050510)](mailto:ozairyousufi1400@gmail.com)

![Visitors](https://komarev.com/ghpvc/?username=AOYousufi&color=4f8eff&style=for-the-badge&label=PROFILE+VIEWS)

</div>

---

## 📖 Table of Contents

<details open>
<summary>Click to expand</summary>

- [✨ What This Is](#-what-this-is)
- [🎬 Tech Stack](#-tech-stack)
- [🗺️ Architecture](#%EF%B8%8F-architecture)
- [🚀 Featured Projects](#-featured-projects)
- [⚡ Animation System](#-animation-system)
- [🎨 Design System](#-design-system)
- [🛠️ Local Development](#%EF%B8%8F-local-development)
- [📁 Project Structure](#-project-structure)
- [🧑‍💼 About Me](#-about-me)
- [📊 GitHub Stats](#-github-stats)

</details>

---

## ✨ What This Is

> Not just a portfolio. A statement.

This is a **hand-crafted, zero-compromise personal portfolio** — every pixel intentional, every animation purposeful. Built entirely without UI kits, it demonstrates what's possible when you go deep on fundamentals instead of leaning on scaffolding.

| What it does | How |
|---|---|
| Feels cinematic on load | `canvas` starfield → GSAP timeline → page reveal |
| Transitions like a native app | React Router v7 + GSAP page transitions |
| Respects every user | `prefers-reduced-motion` gates every single animation |
| Loads instantly | Vite code-splitting, zero blocking resources |
| Works for everyone | Keyboard-navigable, ARIA-labelled, focus-visible throughout |

---

## 🎬 Tech Stack

<div align="center">

| Layer | Technology | Why |
|:---:|:---:|:---|
| ⚛️ **UI** | React 19 | Latest concurrent features, stable API |
| ⚡ **Build** | Vite 6 | Sub-second HMR, optimised production bundles |
| 🧭 **Routing** | React Router v7 | File-based routing, data loaders |
| 🎞️ **Animation** | GSAP 3 + ScrollTrigger | Industry-standard, silky 60fps |
| 🎨 **Styling** | Custom CSS (scoped) | Zero runtime cost, full control |
| 🔍 **Quality** | ESLint v9 flat config | Zero-warning policy enforced |

</div>

<div align="center">
<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

---

## 🗺️ Architecture

```mermaid
graph TD
    A["🌐 Browser"] --> B["index.html\n(OG meta · JSON-LD · fonts)"]
    B --> C["App.jsx\nReact Router v7"]

    C --> D["LoadingScreen\n(canvas starfield)"]
    C --> E["PageLoader\n(return visits)"]

    D -->|"sets sessionStorage\n'ay-intro-seen'"| F["Main Layout\nNavbar + Outlet + Footer"]
    E --> F

    F --> G["/ Home\nHero · About · Skills"]
    F --> H["/projects\nProject Gallery"]
    F --> I["/education\nAcademic Timeline"]
    F --> J["/work-experience\nCareer History"]
    F --> K["/contact\nContact Form"]

    H --> L["/projects/virtual-exhibition"]
    H --> M["/projects/nc-news"]
    H --> N["/projects/my-plants"]

    style A fill:#4f8eff,color:#fff
    style F fill:#7c3aed,color:#fff
    style G fill:#050510,color:#f0f0ff
    style H fill:#050510,color:#f0f0ff
    style I fill:#050510,color:#f0f0ff
    style J fill:#050510,color:#f0f0ff
    style K fill:#050510,color:#f0f0ff
```

<details>
<summary><strong>🔄 Loading Flow — how the first impression works</strong></summary>

```
First visit                          Return visit
────────────────                     ──────────────
Canvas starfield renders             PageLoader renders
   ↓                                    ↓
GSAP reveal timeline fires           Lighter transition plays
   ↓                                    ↓
sessionStorage flag set              Flag already present → skip intro
   ↓                                    ↓
Route renders normally               Route renders normally
```

Every GSAP animation is initialised **once** via `src/utils/gsap.js` and imported — never re-initialised per component.

</details>

---

## 🎨 Design System

The entire visual language lives in `src/index.css` as CSS custom properties. **Zero hardcoded values in components** — ever.

<details>
<summary><strong>📐 Full token reference</strong></summary>

```css
/* ─── Backgrounds ─────────────────────────────── */
--bg-base:        #050510   /* Page — outermost layer          */
--bg-surface:     #0a0a1a   /* Cards, panels                   */
--bg-elevated:    #0f0f22   /* Modals, tooltips                */

/* ─── Accents ─────────────────────────────────── */
--accent-blue:    #4f8eff   /* Primary CTA, links, focus rings */
--accent-violet:  #7c3aed   /* Secondary, gradients            */
--accent-cyan:    #00d4ff   /* Highlights, hover, glows        */

/* ─── Text ────────────────────────────────────── */
--text-primary:   #f0f0ff   /* Headings, key content           */
--text-secondary: #8888aa   /* Body copy, descriptions         */
--text-muted:     #44445a   /* Timestamps, metadata            */

/* ─── Borders ─────────────────────────────────── */
--border-subtle:  rgba(255,255,255,0.06)
--border-visible: rgba(255,255,255,0.12)

/* ─── Glows ────────────────────────────────────── */
--glow-blue:      0 0 40px rgba(79,142,255,0.15)
--glow-violet:    0 0 40px rgba(124,58,237,0.15)
--glow-cyan:      0 0 30px rgba(0,212,255,0.12)
```

**Spacing:** 8pt grid — `4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128px`

**Fonts:**
- Headings → `Syne` 700/800, tracking `-0.03em`
- Body → `Plus Jakarta Sans` 400/500/600
- Code → `JetBrains Mono`

</details>

---

## 🛠️ Local Development

```bash
# 1. Clone
git clone https://github.com/AOYousufi/My-Portfolio.git
cd My-Portfolio

# 2. Install
npm install

# 3. Dev server (Vite HMR — not npm start)
npm run dev

# 4. Lint (zero-warning policy)
npm run lint

# 5. Production build (run before every commit)
npm run build

# 6. Preview production build locally
npm run preview
```

> [!IMPORTANT]
> The dev command is `npm run dev` — **not** `npm start`. There is no `npm start` in this project.

> [!TIP]
> Run `npm run build` before committing. The CI check will fail if the build breaks.

---

## 📁 Project Structure

```
My-Portfolio/
├── public/
│   ├── robots.txt           ← SEO
│   ├── sitemap.xml          ← SEO
│   └── og-image.png         ← Social share preview
├── src/
│   ├── index.css            ← ⭐ DESIGN SYSTEM — read this first
│   ├── App.jsx              ← Router + top-level layout
│   ├── utils/
│   │   └── gsap.js          ← GSAP initialised once here only
│   ├── hooks/
│   │   ├── useTypewriter.js ← Hero phrase cycling
│   │   └── useReducedMotion.js ← a11y animation gate
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── pages/
│       ├── Home.jsx         ← Hero · About · Skills
│       ├── Projects.jsx     ← Gallery
│       ├── Education.jsx
│       ├── WorkExperience.jsx
│       ├── Contact.jsx
│       └── ProjectDetail/
│           ├── VirtualExhibition.jsx
│           ├── NCNews.jsx
│           └── MyPlants.jsx
├── index.html               ← OG meta · JSON-LD · font preloads
├── vite.config.js
└── package.json
```

---

## 🧑‍💼 About Me

<img align="right" src="https://github-readme-stats.vercel.app/api/top-langs/?username=AOYousufi&layout=compact&theme=tokyonight&bg_color=050510&border_color=4f8eff&title_color=4f8eff&text_color=f0f0ff&hide_border=false" width="340"/>

**Ahmad Ozair Yousufi** — Junior Developer building full-stack web experiences with an obsessive eye for detail.

- 🎓 **BSc Software Development** — Staffordshire University
- 🏕️ **Full-Stack Bootcamp** — Northcoders (Node.js, React, TDD, REST APIs)
- 📍 **Based in** Stone, Staffordshire, UK
- 💬 **Ask me about** GSAP, React architecture, CSS custom properties
- 📬 **Email** [ozairyousufi1400@gmail.com](mailto:ozairyousufi1400@gmail.com)
- 🌐 **Portfolio** [ahmadyousufi.dev](https://ahmadyousufi.dev/)

<br clear="right"/>

---

## 📊 GitHub Stats

<div align="center">

<img src="https://github-readme-stats.vercel.app/api?username=AOYousufi&show_icons=true&theme=tokyonight&bg_color=050510&border_color=4f8eff&title_color=4f8eff&icon_color=00d4ff&text_color=f0f0ff&ring_color=7c3aed&hide_border=false&count_private=true" height="170"/>
&nbsp;&nbsp;
<img src="https://github-readme-streak-stats.herokuapp.com/?user=AOYousufi&theme=tokyonight&background=050510&border=4f8eff&ring=7c3aed&fire=00d4ff&currStreakLabel=4f8eff&sideLabels=8888aa&dates=8888aa" height="170"/>

</div>

---

## ⭐ If This Helped You

<div align="center">

If you're using this as inspiration for your own portfolio — that's exactly what it's here for.

[![Star this repo](https://img.shields.io/badge/⭐_Star_this_repo-it_costs_nothing-4f8eff?style=for-the-badge&labelColor=050510)](https://github.com/AOYousufi/My-Portfolio)
[![Fork it](https://img.shields.io/badge/🍴_Fork_it-make_it_yours-7c3aed?style=for-the-badge&labelColor=050510)](https://github.com/AOYousufi/My-Portfolio/fork)
[![LinkedIn](https://img.shields.io/badge/Connect_on-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&labelColor=050510)](https://www.linkedin.com/in/ahmad-ozair-yousufi/)

<br/>

> *"The details are not the details. They make the design."*
> — Charles Eames

</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00d4ff,50:7c3aed,100:050510&height=120&section=footer" width="100%"/>
