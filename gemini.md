# PROMPT: Rebuild `brain-byte-folio` as a Terminal-Style Portfolio

> Paste this whole file into your AI coding agent (Claude Code, Cursor, Antigravity, Windsurf, etc.) opened at the root of the `brain-byte-folio` repo.

---

## 0. Role & Goal

You are a senior front-end engineer. Rebuild my existing portfolio (`github.com/amano2/brain-byte-folio`, React + Vite + TypeScript, hosted on Firebase Hosting) into a **terminal-style (CLI) portfolio**. Visitors type commands like `help`, `about`, `projects`, `blog` to explore my work. Keep **all existing content** (listed below) but present it through a command-line interface.

Deliver a working, deployable app. Work step by step, commit after each phase, and run `npm run build` at the end with zero TypeScript/lint errors.

---

## 1. Tech Constraints

- **Keep**: React 18 + Vite + TypeScript, Firebase Hosting (static, no backend).
- **Styling**: Tailwind or CSS Modules (pick whatever is already in the repo; do not add Styled-Components).
- **No heavy libs**: command parser, history, and autocomplete must be hand-written (small, typed, testable). Allowed extras: `react-router-dom` (already present), `react-markdown` + `remark-gfm` (optional, replaces my custom `MarkdownRenderer` only if simpler), `vitest` for tests.
- Fully static; blog content stays in `src/data/blogs.json` (or current location).
- Must work on mobile (see §8).

---

## 2. Content to Preserve (source of truth)

**Identity**
- Name: Aman Hossain · GitHub: `amano2` · LinkedIn: Aman Hossain · Email: amanhossainmail@gmail.com · Resume: existing Google Docs link in `HeroSection.tsx` (reuse it)
- Focus: AI/ML, Data Science, Full-Stack

**Education**
- M.Tech Data Science, KIIT University in collaboration with LTIMindtree — CGPA 7.76
- B.Tech CSE — CGPA 7.91

**Certification**: Coursera Design Thinking (only one kept)

**Projects (3 flagship)**
1. Plant Disease Detection using Leaf Images — `github.com/amano2/plant-web` — Python, Django, TensorFlow, MobileNetV2, CNN
2. Agentic Enterprise Copilot · Trust Layer — `github.com/amano2/agentic-copilot-trust-layer` — Python, LangGraph, FastAPI, React, ChromaDB, Cross-Encoders
3. iTransform — GenAI Forecasting Assistant — `github.com/amano2/GenAI-Powered-Analytics-Forecasting-Assistant` — Python, FastAPI, React, PyTorch, statsmodels (SARIMAX), SQLite

**Skills (6 groups)**
- Languages: Python, SQL, JavaScript, HTML5, CSS3, R
- Frameworks & Libraries: PyTorch, TensorFlow, LangGraph, LangChain, FastAPI, Django, Scikit-learn, statsmodels, React
- Tools & Databases: PostgreSQL, SQLite, ChromaDB, Git, Docker, FAISS
- Platforms: Linux, HuggingFace Spaces, Firebase, Kaggle, Google Colab
- Industry Knowledge: Multi-Agent Systems, RAG Pipelines, Time-Series Forecasting, Computer Vision, Model Fine-Tuning (QLoRA)
- Soft Skills: Problem Solving, Agile Methodologies, Technical Writing, Cross-Functional Collaboration

**Blog (4 articles, from `blogs.json`, with id/title/date/readingTime/tags/summary/markdown body)**
- AgentTrace: Resolving Hallucinations in Multi-Step LLM Agent Workflows (id `agenttrace-hallucination-detection`; co-authored with P. Somnath Reddy and Ayaan Khan)
- Unlocking Agentic AI: Building Trust Layers with LangGraph
- Battling Hallucinations in Retail Analytics Dashboards
- Deep Learning for Agriculture: Classifying Plant Diseases in Real-Time

**Research**: AgentTrace paper (LLM agent hallucination detection; 3-layer cascade, +24.4% SOTA on AgentHallu).

---

## 3. Architecture

```
src/
  main.tsx
  App.tsx                      # Router: "/" and "/blog/:id" deep links open terminal with command preloaded
  data/
    profile.ts                 # name, links, education, certs
    projects.ts
    skills.ts
    blogs.json
  terminal/
    Terminal.tsx               # window chrome + scrollback + input line
    useTerminal.ts             # state: history[], output[], cursor, tab-complete, theme
    parser.ts                  # tokenize input -> {cmd, args, flags}
    registry.ts                # Map<string, Command>; each command: name, aliases, description, usage, run(ctx)
    filesystem.ts              # virtual FS: ~/projects, ~/blog, ~/skills, ~/about.txt (used by ls/cat/cd)
    themes.ts                  # theme tokens
    commands/
      help.ts about.ts skills.ts projects.ts education.ts certs.ts
      blog.ts contact.ts resume.ts social.ts research.ts
      ls.ts cd.ts cat.ts pwd.ts tree.ts
      theme.ts clear.ts history.ts echo.ts whoami.ts date.ts
      neofetch.ts sudo.ts easter-eggs.ts
    render/
      Output.tsx               # renders output blocks (text, table, link, markdown, ascii, error)
      MarkdownBlock.tsx        # reuse/port MarkdownRenderer.tsx (code blocks w/ Copy button)
      Banner.tsx               # ASCII banner + welcome
  styles/
```

Output is a typed discriminated union (`text | table | links | markdown | ascii | error | component`) so commands never return raw HTML.

---

## 4. Required Behaviour

### 4.1 Boot sequence
Short (≤1.5s, skippable with any key) fake boot: `Initializing aman.dev v1.0 ... OK` lines, then ASCII banner of "AMAN HOSSAIN", then:
`Welcome. Type 'help' to see available commands.`
Also show 3 clickable "quick command" chips under the banner (`about`, `projects`, `blog`) so non-technical recruiters are never stuck.

### 4.2 Prompt
`guest@aman-portfolio:~$` (path updates with `cd`). Blinking block cursor. Input auto-focuses; clicking anywhere in the window refocuses.

### 4.3 Input features
- **Command history**: ↑/↓, persisted in `sessionStorage` (wrap in try/catch).
- **Tab completion**: commands, then arguments (project names, blog ids, theme names, virtual-FS paths). Double-Tab lists candidates.
- **Ctrl+L** clears; **Ctrl+C** cancels current line; **Ctrl+A/E** home/end.
- `!!` repeats last command; `!n` runs history item n.
- Unknown command → `command not found: xyz. Did you mean 'abc'?` (Levenshtein ≤ 2) + hint to run `help`.
- Output lines can contain clickable commands (e.g., in `projects`, `open 1` is clickable and runs).

### 4.4 Commands

| Command | Behaviour |
|---|---|
| `help [cmd]` | List all commands with one-line descriptions; `help projects` shows usage/examples |
| `about` | Short bio: M.Tech Data Science (KIIT × LTIMindtree), AI/ML + full-stack builder |
| `whoami` | One-liner role |
| `education` | Both degrees with CGPA |
| `skills [category]` | No arg → all 6 groups as pill-style rows; with arg → one group (tab-completable) |
| `projects` | Numbered list of 3 projects with stack tags |
| `projects <n\|name>` / `open <n>` | Detail view + GitHub link (opens new tab) |
| `certs` | Coursera Design Thinking |
| `research` | AgentTrace summary + link to blog article |
| `blog` | Table: id, date, reading time, tags, title |
| `blog <id>` / `read <id>` | Render article markdown inline (with copyable code blocks) |
| `blog --tag <tag>` / `blog search <q>` | Filter/search (replaces my old search bar and tag pills) |
| `contact` | Email, LinkedIn, GitHub as links; `contact --copy` copies email |
| `resume` | Opens the resume link in new tab |
| `social` | GitHub / LinkedIn |
| `ls`, `cd`, `cat`, `pwd`, `tree` | Virtual FS: `~/about.txt`, `~/skills/`, `~/projects/*.md`, `~/blog/*.md` — `cat projects/plant-web.md` works |
| `theme [name]` | `list` themes; set one; persists in `localStorage` (try/catch). Ship: `matrix` (default), `dracula`, `ubuntu`, `solarized-dark`, `light` |
| `neofetch` | ASCII + system-style info (OS: "Portfolio OS", Focus, Stack, Uptime = time on page) |
| `history`, `clear`, `echo`, `date` | Standard |
| `sudo <anything>` | Joke: `guest is not in the sudoers file. This incident will be reported.` |
| `hackermode` | Matrix rain canvas overlay for 5s (respect reduced-motion → skip) |
| `games` (stretch) | Simple Snake in canvas, `q` to quit |
| `exit` | Prints "There is no escape. Try 'contact' instead :)" |

### 4.5 Routing / deep links
- `/` boots normally.
- `/blog` boots and auto-runs `blog`.
- `/blog/:id` boots and auto-runs `read :id` (keeps my existing shareable article URL working: `/blog/agenttrace-hallucination-detection`).
- Update the URL with `history.replaceState` when `read`/`blog` runs, so articles are shareable.
- Unknown path → boots and prints a 404 line in terminal style.

### 4.6 Reading progress
When an article is open, show a thin progress indicator in the terminal header (percentage of scroll within the article block) — replaces the old sticky progress bar.

---

## 5. Visual Design

- Window chrome: rounded dark window with three dots, title `aman@portfolio: ~`, full-viewport on mobile.
- Font: `JetBrains Mono` (Google Fonts) with fallback `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`.
- Default theme `matrix`: near-black background, green accent; subtle CRT scanline + glow **off by default on mobile and when `prefers-reduced-motion`**.
- Use CSS variables for theme tokens; `theme` command swaps them instantly.
- Colors: command names = accent, links = underlined cyan-ish, errors = red, muted text = 60% opacity. Ensure WCAG AA contrast in every theme.
- Typewriter effect for the first banner only; all later output appears instantly (never slow the user down).

---

## 6. SEO & Metadata (don't regress)

- Keep and update `index.html`: title, meta description (AI/ML, Data Science, Full-Stack), OpenGraph + Twitter tags.
- Because a terminal UI is JS-rendered and weak for SEO, add a **visually-hidden semantic `<noscript>` + `<section class="sr-only">`** containing the same about/projects/skills/contact content as plain HTML, so crawlers and screen readers get real text.
- Add `public/sitemap.xml` and `robots.txt` including `/` and each `/blog/:id`.
- Add `JSON-LD` `Person` schema (name, url, sameAs: GitHub, LinkedIn).

---

## 7. Accessibility

- Terminal output region: `role="log"` with `aria-live="polite"`.
- Input is a real `<input>` (or `<textarea rows=1>`) with `aria-label="Terminal command input"`, not a contenteditable hack.
- Everything achievable by keyboard; visible focus rings on clickable output.
- Provide a header button **"Switch to simple view"** that toggles a plain, non-terminal layout (reuses the same data files) for users who don't want a CLI. Persist the choice.

---

## 8. Mobile

- On-screen quick-command bar (horizontal scroll): `help · about · skills · projects · blog · contact · clear`.
- Tapping a chip types and runs the command.
- Prevent iOS zoom on input focus (font-size ≥ 16px).
- Tab completion button (`⇥`) in the quick bar since there's no Tab key.
- Respect `env(safe-area-inset-*)`.

---

## 9. Quality Bar

- Strict TypeScript, no `any`.
- Unit tests (vitest) for: `parser`, tab-completion, Levenshtein suggestion, virtual FS (`cd/ls/cat` path resolution including `..` and `~`), and blog filter/search.
- Commands are pure functions `(args, ctx) => OutputBlock[]`; side effects (open link, copy, theme) go through `ctx` so they're testable.
- Wrap `localStorage`/`sessionStorage`/clipboard in try/catch with graceful fallback.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 (mobile).
- Bundle: lazy-load the markdown renderer, matrix rain, and snake game.

---

## 10. Cleanup

- Remove old section components (`HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `StatsSection`, `CertificationsSection`, `ExperienceSection`, `Header`, `Footer`, `TerminalWindow`) **after** their data has been moved to `src/data/*`. Keep `MarkdownRenderer` logic (ported to `MarkdownBlock`).
- Keep the "Simple view" built from the shared data files (minimal, one page).
- Do not reintroduce the `/write` composer or admin passcode (blog stays JSON + Git).

---

## 11. Deployment

1. `npm run build` must pass clean.
2. Confirm `firebase.json` has SPA rewrite: `{ "source": "**", "destination": "/index.html" }` so `/blog/:id` deep links work.
3. Deploy: `firebase deploy --only hosting` to the existing site `brain-byte-folio-1a219`.
4. Commit to `main` with conventional messages, one per phase.

---

## 12. Phased Plan (execute in order, commit after each)

1. **Data extraction** — move content into `src/data/*.ts`, verify nothing is lost.
2. **Terminal core** — Terminal.tsx, parser, registry, history, prompt, themes.
3. **Content commands** — help, about, skills, projects, education, certs, contact, resume, research.
4. **Blog commands** — blog list/read/filter/search, MarkdownBlock, deep links.
5. **Virtual FS** — ls, cd, cat, pwd, tree + tab completion for paths.
6. **Polish** — boot sequence, ASCII banner, neofetch, easter eggs, mobile quick bar.
7. **SEO/A11y** — noscript content, JSON-LD, sitemap, simple view toggle.
8. **Tests + cleanup + build + deploy.**

At the end, print: a list of every command implemented, the Lighthouse scores you measured (or say you couldn't measure), and any content or requirement you could not fulfil.

---

## 13. Acceptance Checklist

- [ ] `help` lists every command; `help <cmd>` works
- [ ] All 3 projects, 6 skill groups, 2 degrees, 1 cert, 4 blog posts reachable via commands
- [ ] `/blog/agenttrace-hallucination-detection` loads the article directly
- [ ] Tab completion and ↑/↓ history work
- [ ] 5 themes, persisted
- [ ] Usable on a 375px-wide phone with no keyboard-only commands required
- [ ] Simple-view toggle works
- [ ] Reduced-motion respected
- [ ] Build clean, deployed to Firebase