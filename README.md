# KOKORO 心 — Tu tienda de belleza

SPA de cosmética premium construida con React 19, TypeScript estricto y arquitectura Clean Architecture.

## Stack

- **React 19** + **Vite 7** + **TypeScript** (strict)
- **Tailwind CSS v4** con `@tailwindcss/vite`
- **Framer Motion** (LazyMotion) + **GSAP** con ScrollTrigger
- **Lucide React** para iconografía
- Deploy en **GitHub Pages** con `gh-pages`

## Arquitectura

```
src/
├── domain/types/              Interfaces y tipos del negocio
├── application/
│   ├── constants/             Datos de navegación y secciones
│   └── data/                  Catálogo de productos
├── infrastructure/
│   ├── framerMotion/          LazyMotion provider (domAnimation)
│   └── gsap/                  ScrollTrigger plugin
├── presentation/
│   ├── animations/            Variants, transitions, GSAP presets
│   ├── components/ui/         Componentes atómicos (Button, Badge, Icon)
│   ├── hooks/                 useAnimationInView, useScrollAnimation, useCart
│   ├── layouts/               RootLayout, PageLayout
│   ├── sections/              Navbar, Hero, ProductGrid, Philosophy, Footer
│   └── styles/                Design tokens (CSS variables), utilidades
├── constants/brand.ts         Identidad de marca y catálogo
├── utils/gsap.ts              Registro de ScrollTrigger
├── index.css                  Tailwind @theme + imports
├── main.tsx                   Entry point
└── App.tsx                    Composición de la página
```

## Path Aliases

`@domain/*`, `@application/*`, `@infrastructure/*`, `@presentation/*`, `@components/*`, `@sections/*`, `@hooks/*`, `@layouts/*`, `@animations/*`, `@styles/*`

## Scripts

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción (tsc + vite build)
npm run lint      # ESLint
npm run preview   # Preview del build
npm run deploy    # Deploy a GitHub Pages
```

## Convenciones

- **LazyMotion strict**: usar `m.div` en lugar de `motion.div`
- **Barrel exports** (`index.ts`) en cada carpeta
- **Componentes en carpetas propias**: `Button/Button.tsx` + `Button/index.ts`
- **GSAP**: animaciones imperativas via `useScrollAnimation(ref, setup)`
- **Framer Motion**: variants declarativos importados desde `@animations`
- **Mobile-first** con breakpoints de Tailwind (sm, md, lg, xl)
