# Angular Landing Template (SSR + Prerender)

Сучасний стартовий шаблон Angular 21 для створення швидких landing pages з **SSR prerendering**, **TailwindCSS** і **GitHub Pages deployment**.

Цей шаблон оптимізований для статичних landing sites, де сторінки рендеряться **під час build** для SEO та продуктивності.

---

# Acknowledge

- Angular **21**
- **SSR prerendering** під час build
- **Zoneless Angular**
- Стан, який використовується в HTML class bindings, має бути доступний як **signals**
- Для нових форм віддавайте перевагу **Angular Signal Forms** як основному підходу
- **OnPush change detection by default**
- **TailwindCSS v4**
- Використовуйте спільні **theme CSS variables** з `src/styles/_theme.scss` для кольорів, поверхонь, відступів, радіусів і анімації
- **GitHub Pages deployment**
- **Prettier formatting**
- Чиста мінімалістична структура проєкту

Проєкт збирає обидва каталоги:

```
dist/app/browser
dist/app/server
```

Але для deployment використовується **browser prerendered output**, що робить його ідеальним для статичного хостингу.

---

# Project Structure

```
src/
  app/
    app.component.ts
    app.config.ts
    app.config.server.ts
    app.routes.ts
    app.routes.server.ts
    layouts/
    pages/
  assets/
  environments/
  styles/
  styles.scss
```

SSR configuration розміщена в:

```
app.config.server.ts
app.routes.server.ts
```

---

# Development

Запустіть development server:

```
npm start
```

або

```
ng serve
```

Застосунок працює за адресою [http://localhost:4200](http://localhost:4200)

Режим розробки працює як звичайний Angular SPA.

---

# Build

Зберіть проєкт:

```
npm run build
```

Це згенерує:

```
dist/app/browser
dist/app/server
```

Сторінки **prerendered at build time** за допомогою Angular SSR.

---

# Running the SSR server (optional)

Шаблон містить Node server для SSR:

```
npm run serve:ssr:app
```

Це запускає:

```
node dist/app/server/server.mjs
```

Для більшості landing pages це **не потрібно**, оскільки prerendered HTML вже згенеровано.

---

# Prerender configuration

Усі routes prerendered за замовчуванням:

```
src/app/app.routes.server.ts
```

```
RenderMode.Prerender
```

```ts
export const serverRoutes: ServerRoute[] = [
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
];
```

Це змушує Angular генерувати статичний HTML для кожного route під час build.

---

# Bootstrap Data

The app includes a small bootstrap data flow for company and item data.

Main files:

```text
src/app/app.config.ts
src/app/feature/bootstrap/bootstrap.service.ts
src/app/feature/bootstrap/bootstrap.interface.ts
src/app/feature/company/company.service.ts
src/app/feature/item/item.service.ts
src/environments/environment.prod.ts
```

How it works:

- `APP_INITIALIZER` runs `BootstrapService.initialize()` during app startup
- on the server, bootstrap data is fetched from `${environment.apiUrl}/api/regionit/bootstrap/${environment.companyId}`
- fetched data is stored in Angular `TransferState`
- on the browser, transferred data is applied immediately and then refreshed in the background
- if no remote data is available, the app falls back to `environment.company` and `environment.items`

Bootstrap payload shape:

```ts
export interface BootstrapData {
	company?: Company;
	items?: Item[];
}
```

Environment keys involved:

- `apiUrl` - API host used for bootstrap and status checks
- `companyId` - company identifier sent to the bootstrap endpoint
- `company` - fallback company data used before or instead of API data
- `items` - fallback item list used before or instead of API data
- `onApiFall` - controls what happens when the API is unavailable

Current fallback behavior in code:

- `'app'` keeps rendering the app with local environment data
- `'app reload'` keeps polling `${environment.apiUrl}/status` and reloads when the API becomes available

This keeps SSR and prerender safe while still allowing the app to hydrate with API data when it exists.
---

# TailwindCSS

Tailwind налаштований через:

```
.postcssrc.json
```

Tailwind слід використовувати настільки часто, наскільки це можливо, для повсякденної UI-роботи.

Віддавайте перевагу Tailwind utilities для:

- layout
- spacing
- typography
- colors
- borders
- sizing
- responsive behavior

Використовуйте SCSS лише тоді, коли Tailwind не є правильним інструментом, наприклад для:

- component-specific complex styling
- shared design tokens and mixins
- advanced states or selectors
- невеликої кількості глобальних стилів

Глобальні стилі розміщені в:

```
src/styles.scss
```

---

# Icons

Цей шаблон містить **Material Symbols Outlined**, і їх слід використовувати як стандартний набір іконок у всьому проєкті.

Підключено в:

```
src/index.html
```

Використовуйте іконки безпосередньо в HTML так:

```html
<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
```

Для доступних кнопок залишайте іконку декоративною та додавайте текстову мітку або `aria-label` на саму кнопку:

```html
<button type="button" aria-label="Open menu">
	<span class="material-symbols-outlined" aria-hidden="true">menu</span>
</button>
```

---

# Translations And Languages

UI translations live in:

```text
src/i18n/<code>.ts
src/i18n/index.ts
```

Language metadata lives in:

```text
src/app/feature/language/language.type.ts
src/app/feature/language/language.interface.ts
src/app/feature/language/language.const.ts
src/app/feature/language/language.service.ts
```

Translation bootstrap starts in:

```text
src/app/app.config.ts
```

The app uses the `wacom` translation stack:

- `provideTranslate(...)` registers the default language from `src/i18n/index.ts`
- `LanguageService` switches languages with `TranslateService.setMany(...)`
- English source text is used as the translation key

When adding or updating translations:

- add or update the matching `src/i18n/<code>.ts` dictionary
- keep `src/i18n/index.ts` in sync with the available language files
- keep language codes aligned with `LanguageCode`
- update `LANGUAGES` when adding or renaming a supported language
- keep English source text identical across templates, components, and `src/i18n/*`
- store translation text and language labels as real UTF-8 characters, not escaped or re-encoded mojibake
- remove unused translation keys when they are no longer referenced anywhere in the app

Supported usage patterns:

- Use the `translate` directive for plain element text content
- Use the `translate` pipe for interpolations and attribute bindings
- Use `TranslateService.translate('Key')()` in TypeScript when the translated value is needed inside `computed()` or composed strings

Examples:

```html
<span translate>Open language menu</span>
<button [aria-label]="'Go to homepage' | translate" type="button"></button>
```

```ts
private readonly _translateService = inject(TranslateService);

protected readonly toggleLabel = computed(() =>
	this._translateService.translate('Switch to dark mode')(),
);
```
---

# SCSS Conventions

Використовуйте SCSS у спосіб, що відповідає сучасним Angular defaults:

- Зберігайте більшість стилів усередині component `.scss` file.
- Використовуйте `src/styles.scss` лише для справді глобальних стилів, таких як resets, tokens, typography і utility layers.
- Віддавайте перевагу CSS variables для кольорів, відступів і theming, які можуть змінюватися під час runtime.
- Використовуйте можливості SCSS, такі як `@use`, mixins і partials, для зручності авторингу та спільних design tokens.
- Уникайте глибокого вкладення selector. Тримайте selectors простими та локальними для component.
- Уникайте `::ng-deep` і `ViewEncapsulation.None`, якщо немає чіткої причини інтеграції.
- Віддавайте перевагу class bindings у templates замість важких inline style bindings.

Рекомендований поділ:

```text
src/styles.scss           -> global entry point
src/app/**/**/*.scss      -> component-local styles
src/styles/_theme.scss    -> shared theme CSS variables
```

---

# Environments

Цей шаблон містить Angular environment files, і їх можна використовувати для різних runtime setups, таких як локальна розробка та production builds.

Доступні файли:

```text
src/environments/environment.ts
src/environments/environment.prod.ts
```

Типові випадки використання:

- API base URLs
- feature flags
- analytics toggles
- external service configuration

Production builds замінюють `environment.ts` на `environment.prod.ts` через Angular file replacements.

Тримайте environment files лише для публічної front-end конфігурації. Не зберігайте в них секрети.

---

# Deployment

Deployment виконується автоматично через **GitHub Actions**.

Workflow:

```
.github/workflows/deploy.yml
```

Кроки:

1. Встановити залежності
2. Зібрати Angular app
3. Скопіювати `CNAME`
4. Надіслати build output у `gh-pages`

Каталог для deployment:

```
dist/app/browser
```

---

# Domain

Кастомний домен, який слід змінити на власний, щоб усе працювало коректно; будь-який піддомен `*.itkamianets.com`, якщо він ще не використовується в нашій github org.

```
ngx.itkamianets.com
```

Налаштовується через:

```
CNAME
```

---

# Code Style

Форматування виконується через:

- `.editorconfig`
- `.prettierrc`

Ключові правила:

- **tabs**
- **single quotes**
- **100 character line width**

---

# AI Usage

Якщо ви використовуєте AI поза IDE і він не читає автоматично інструкції репозиторію, спочатку скопіюйте
вміст `AGENTS.md` у prompt/context AI.

Це гарантує, що AI дотримуватиметься тих самих проєктних правил, яких Codex дотримується всередині IDE.

---

# NPM Scripts

Запуск development:

```
npm start
```

Збірка проєкту:

```
npm run build
```

Запуск SSR server:

```
npm run serve:ssr:app
```

---

# Requirements

Рекомендоване середовище:

```
Node.js 20+
npm 11+
```

---

# Code structure guide

## Pages

Сторінки застосунку слід створювати в:

```text
src/app/pages/
```

Кожна сторінка повинна мати власну папку та власний component file.

Приклад:

```text
src/app/pages/home/home.component.ts
src/app/pages/about/about.component.ts
```

Згенеруйте page component за допомогою Angular CLI:

```bash
ng generate component pages/home
```

або коротше:

```bash
ng g c pages/home
```

Pages мають бути lazy loaded з `src/app/app.routes.ts`.

Приклад route config:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
	},
	{
		path: 'about',
		loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
	},
];
```

---

## Feature structure for back-end connected modules

Якщо якась частина app потребує власної business logic і back-end integration, створіть окрему feature folder у:

```text
src/app/feature/
```

Кожна feature повинна зберігати власну внутрішню структуру.

Приклад:

```text
src/app/feature/user/
src/app/feature/user/components/
src/app/feature/user/directives/
src/app/feature/user/interfaces/
src/app/feature/user/pages/
src/app/feature/user/pipes/
src/app/feature/user/services/
```

Приклад розташування service:

```text
src/app/feature/user/services/user.service.ts
```

Рекомендовані CLI-команди:

Створити feature page:

```bash
ng g c feature/user/pages/user-profile
```

Створити feature component:

```bash
ng g c feature/user/components/user-card
```

Створити feature directive:

```bash
ng g d feature/user/directives/user-focus
```

Створити feature pipe:

```bash
ng g p feature/user/pipes/user-name
```

Створити feature service:

```bash
ng g s feature/user/services/user
```

Interfaces зазвичай створюються вручну:

```text
src/app/feature/user/interfaces/user.interface.ts
src/app/feature/user/interfaces/user-response.interface.ts
```

Для невеликих сфокусованих features також припустимі colocated files на кшталт `feature/language/language.type.ts`,
`language.interface.ts`, `language.const.ts` і `language.service.ts`, коли така структура робить feature простішою.

---

## Generic shared code

Загальний reusable code, який не прив’язаний до однієї конкретної feature, може розміщуватися безпосередньо в `src/app`.

Приклади shared folders:

```text
src/app/components/
src/app/directives/
src/app/interfaces/
src/app/pipes/
src/app/services/
```

Приклад розташування shared pipe:

```text
src/app/pipes/phone.pipe.ts
```

Рекомендовані CLI-команди:

Створити shared component:

```bash
ng g c components/page-header
```

Створити shared directive:

```bash
ng g d directives/autofocus
```

Створити shared pipe:

```bash
ng g p pipes/phone
```

Створити shared service:

```bash
ng g s services/api
```

Interfaces зазвичай створюються вручну:

```text
src/app/interfaces/api-response.interface.ts
src/app/interfaces/select-option.interface.ts
```

---

## Development summary

Використовуйте ці розташування за замовчуванням:

- `src/app/pages` - app-level lazy loaded pages
- `src/app/feature/<name>` - feature-specific code with back-end/business logic
- `src/app/components`, `directives`, `pipes`, `services`, `interfaces` - generic shared code

# Create a new project from this template

Клонуйте default repository у нову папку з назвою вашого проєкту (замініть `PROJECT_NAME` на назву вашого проєкту):

```bash
git clone https://github.com/IT-Kamianets/ngx-default.git PROJECT_NAME
cd PROJECT_NAME
npm i
npm run start
```

### What these commands do

- `git clone https://github.com/IT-Kamianets/ngx-default.git PROJECT_NAME`
  Завантажує template repository і створює локальну папку з назвою `PROJECT_NAME`.
- `cd PROJECT_NAME`
  Відкриває щойно створену папку проєкту.
- `npm i`
  Встановлює всі залежності проєкту з `package.json`.
- `npm run start`
  Запускає локальний development server.

Після цього відкрийте локальний URL, показаний у терміналі, зазвичай [http://localhost:4200](http://localhost:4200)

## Initialize your own git repository

Якщо ви хочете почати з чистого аркуша замість збереження git history шаблону, видаліть наявну `.git` folder, ініціалізуйте новий repository і створіть перший commit.

Приклад:

```bash
rm -rf .git
git init
git remote add origin https://github.com/IT-Kamianets/PROJECT_NAME.git
git add .
git commit -m "chore(init): bootstrap project from ngx-default template"
```

`git remote add origin ...` підключає ваш локальний repository до remote GitHub repository, щоб майбутні команди `git push` і `git pull` знали, де розміщений ваш основний проєкт.

Для першого commit також використовуйте Conventional Commit message. Хороший стандартний варіант:

```text
chore(init): bootstrap project from ngx-default template
```

# License

MIT
