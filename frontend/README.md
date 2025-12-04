# React + Strapi Frontend

This is a modern frontend application built with React 19, TypeScript, and Vite. It communicates with a Strapi backend via GraphQL, featuring dynamic page rendering, efficient custom caching, and a modular component architecture.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup & Scripts](#setup--scripts)
- [Key Dependencies](#key-dependencies)
- [Caching & Data Fetching](#caching--data-fetching)
- [Development Notes](#development-notes)

---

## Project Overview
This project serves as the frontend for a content-driven platform powered by Strapi. It fetches and renders dynamic pages, supports highly performant custom caching using memory and IndexedDB, and leverages code-splitting and modern React features for a smooth user experience.

## Features
- **React 19** with Suspense & lazy loading
- **TypeScript** with strict type checking
- **Vite** for fast development and building
- **Custom GraphQL data fetching** (no Apollo Client) — minimizes bundle size and improves optimization
- **Dynamic routing** with React Router
- **Component-driven architecture** (layout, UI, sections, etc.)
- **Efficient caching**: memory + IndexedDB with configurable TTL
- **Modern CSS** setup (App.css)
- **Strong ESLint config** for code quality

## Folder Structure
```
frontend/
├── public/            # Static assets
├── src/
│   ├── App.tsx        # Main routing and entry
│   ├── App.css        # Global styles
│   ├── main.tsx       # Vite entry point
│   ├── assets/        # Images, icons, etc.
│   ├── components/    # Modular, reusable components
│   │   ├── layout/    # Layout, Navbar, Loading
│   │   ├── providers/ # Context providers
│   │   ├── sections/  # Section-based page content
│   │   └── ui/        # UI elements (Image, PageCard, ...)
│   ├── constants/     # GraphQL & API constants
│   ├── helpers/       # Helper utilities
│   ├── hooks/         # Custom React hooks (e.g. useQuery)
│   │   └── cache/     # Caching logic (memory/IDB)
│   ├── pages/         # Route-based pages: Home, DynamicPages, NotFound
│   ├── query/         # GraphQL query strings
│   ├── types/         # TypeScript types
│   └── utils/         # App utilities (image helpers, etc.)
├── package.json       # Dependencies & scripts
├── tsconfig.*.json    # TS config
├── vite.config.ts     # Vite config
├── eslint.config.js   # ESLint config
└── README.md
```

## Setup & Scripts
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run in development**:
   ```bash
   npm run dev
   ```
3. **Production build**:
   ```bash
   npm run build
   ```
4. **Preview production build**:
   ```bash
   npm run preview
   ```
5. **Lint code**:
   ```bash
   npm run lint
   ```

## Key Dependencies
- `react`, `react-dom` & `react-router-dom`
- `idb` (IndexedDB wrapper)
- `vite`
- `eslint` w/ React + TypeScript plugins

## Caching & Data Fetching
- **Custom GraphQL data fetching**: Data is fetched with the browser's `fetch` API against the `/graphql` endpoint, using a custom `useQuery` React hook (see `src/hooks/useQuery.ts`), rather than Apollo Client. This significantly reduces bundle size and improves load performance.
- **Cache Strategy**: Two-tier caching is used:
  - **In-memory**: Fast, for up to 50 entries
  - **IndexedDB (via idb)**: Persistent, for up to 500 entries
  - **TTL purging**: Automated cache cleaning by time-to-live (TTL)

## Routing Structure
- `/` renders the homepage with a grid of pages
- `/:slug` loads a dynamic page based on the slug (from Strapi)
- `*` displays a NotFound page

## Development Notes
- Update `VITE_BACKEND_BASE_URL` in your `.env` file to target the correct Strapi backend.
- Code splitting is enabled via `React.lazy`/`Suspense` for pages & layout.
- Customize/add sections, UI, or page types in their respective folders.
- Lint your code before committing to maintain code quality.

---
Feel free to contribute or extend for your needs!
