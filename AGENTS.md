# AGENTS.md

This file defines repo-specific instructions for coding agents working in this project.

## Project Overview

- Stack: Angular 21, TypeScript 5, Angular SSR/prerender, Tailwind CSS v4, SCSS, Express SSR server.
- Package manager: `npm`
- Formatting: Prettier with tabs, single quotes, and 100 character line width.
- Primary output: prerendered static site from `dist/app/browser`

## Core Expectations

- Preserve the existing Angular architecture and keep changes aligned with Angular 21 patterns.
- Prefer standalone Angular components and lazy-loaded pages.
- Keep change detection `OnPush` for generated or new components.
- Treat signals as the default state mechanism for template-driven UI state.
- For new forms, prefer Angular Signal Forms unless the surrounding code already uses another pattern.
- Assume the app is optimized for static landing pages first, not for a heavy client-side application shell.

## Routing And SSR

- App routes live in `src/app/app.routes.ts`.
- Server prerender configuration lives in `src/app/app.routes.server.ts` and `src/app/app.config.server.ts`.
- Do not introduce changes that break prerendering or require a browser-only runtime during build unless clearly isolated.
- When adding a page, make it compatible with prerendering by default.

## File Placement

- App-level pages: `src/app/pages/<page-name>/`
- Layout components: `src/app/layouts/`
- Shared generic UI/components/services/pipes/directives/interfaces: `src/app/<type>/`
- Feature-specific business logic: `src/app/feature/<feature-name>/`
- Translation dictionaries: `src/i18n/<language>.ts`
- Translation registry: `src/i18n/index.ts`
- Language feature metadata: `src/app/feature/language/language.type.ts`, `language.interface.ts`, `language.const.ts`
- Global theme tokens: `src/styles/_theme.scss`
- Global styles entry: `src/styles.scss`

## Styling Rules

- Prefer Tailwind utilities for layout, spacing, typography, colors, borders, sizing, and responsive behavior.
- Use component SCSS for styles that are not ergonomic in Tailwind or need local structure.
- Reuse theme variables from `src/styles/_theme.scss` before introducing new raw values.
- Keep selectors shallow and component-local.
- Avoid `::ng-deep` and `ViewEncapsulation.None` unless integration constraints require them.
- Use Material Symbols Outlined as the default icon set.

## Templates And Accessibility

- Keep templates simple and declarative.
- Prefer Angular bindings over manual DOM manipulation.
- Decorative icons should use `aria-hidden="true"`.
- Interactive controls must have an accessible text label or `aria-label`.

## Translations And Encoding

- This project uses the `wacom` translation stack: `provideTranslate`, `TranslateService`, `TranslatePipe`, and `Translate`.
- Default translations are registered in `src/app/app.config.ts` with `provideTranslate(translates[...])`.
- Per-language dictionaries live in `src/i18n/<code>.ts` and are aggregated in `src/i18n/index.ts`.
- Keep language codes in sync with `src/app/feature/language/language.type.ts`.
- Keep language labels in `src/app/feature/language/language.const.ts`.
- Keep `src/i18n/index.ts` in sync with the available language files.
- Prefer English source text as the translation key and keep that source text identical across templates, components, and `src/i18n/*`.
- There are three supported translation usage patterns in app code:
- Prefer the `translate` directive for plain element text content in templates. Use `[translate]` for an explicit key, or bare `translate` when the source text itself is the key.
- Use the `translate` pipe for interpolations and attribute bindings such as `{{ 'Go to homepage' | translate }}` or `[aria-label]="'Go to homepage' | translate"`.
- In component TypeScript, use `TranslateService.translate('Key')()` inside `computed()` or other reactive reads when the value is needed for class state, ARIA labels, or composed strings.
- Keep translation bootstrap and language switching on the existing `provideTranslate(...)` and `TranslateService.setMany(...)` path; do not hand-roll parallel translation registries.
- Do not introduce a second translation source such as `src/app/app.translates.ts`; use `src/i18n` as the single source of truth.
- When removing code, check whether its translation keys are still used elsewhere in the app; if a key is no longer referenced anywhere, remove it from the translation dictionaries as part of the same change.
- Preserve native language characters as UTF-8 text; do not introduce mojibake such as `FranÃ§ais`.
- When adding a language, update the new `src/i18n/<code>.ts` file, `src/i18n/index.ts`, and the language metadata files.

## Code Change Guidance

- Make the smallest coherent change that solves the task.
- Preserve existing naming, structure, and visual language unless the task explicitly asks for redesign.
- Prefix private class members with `_`, including variables, injected fields, and methods (for example, `private _platformId = inject(PLATFORM_ID)` and `private async _load()`).
- Omit explicit function and method return types; rely on TypeScript inference unless a specific edge case forces an explicit annotation.
- Order class members consistently: injected fields, public state, private state, constructor, public methods, private methods.
- Avoid introducing new dependencies unless necessary.
- If adding browser APIs, guard them for SSR compatibility.
- Keep comments sparse and only where logic is not obvious.

## Verification

After meaningful changes, verify with the most relevant command available.

- `npm run build`
- `npm start` for local development checks when needed

## Notes For Future Agents

- This repository currently contains a landing page under `src/app/pages/landing/` and a topbar layout under `src/app/layouts/topbar/`.
- The Angular workspace defaults skip test generation for most schematics, so absence of tests is normal unless a task explicitly adds them.
