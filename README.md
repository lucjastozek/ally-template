# React + Vite template

## General Info

This project is built with:

- Vite – for fast dev and build tooling
- React – component-based frontend framework
- TypeScript – static typing for sanity
- React Router DOM – for client-side routing

### Project Structure

The code follows a modular and clear file structure:

```

~/
├── public/
├── src/
│   ├── components/
│   │   └── Component tsx files
│   ├── pages/
│   │   └── Pages tsx files
│   ├── App.css - Styles for App.tsx
│   ├── App.tsx - Root component
│   ├── index.css - Global styles
│   ├── main.tsx - Entry point, mounts <App />
│   ├── Router.tsx - Routing logic (React Router)

```

Routing is handled in `Router.tsx` using `react-router-dom`. Each page in `src/pages` maps to a route, and components in `src/components` are used across the app as building blocks.

You can run the app in dev mode using:

```bash
yarn start
```

## Scripts

This project uses Yarn and Vite. Here's a breakdown of what each script does:

```json
"scripts": {
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "lint": "eslint --max-warnings=0 .",
  "start": "vite --port 3000",
  "type-check": "tsc --noEmit"
}
```

### Development

- `yarn start` - Starts the Vite dev server with hot module reload, runs on port 3000.

### Build

- `yarn build` - Runs the TypeScript compiler (`tsc -b`) and builds the project with Vite.
- `yarn preview` - Serves the built app locally for testing.

### Code Quality

- `yarn format` - Formats all files using Prettier.
- `yarn format:check` - Checks if files are formatted correctly (fails if not).
- `yarn lint` - Runs ESLint. Fails on any warning or error.
- `yarn type-check` - Checks TypeScript types without emitting any files.

## Accessibility

This template includes comprehensive accessibility (a11y) testing tools to ensure your application meets WCAG standards and provides an inclusive user experience.

### Tools Included

- **[Axe Core](https://github.com/dequelabs/axe-core)** - Automated accessibility testing engine
- **[Pa11y](https://pa11y.org/)** - Command-line accessibility testing tool
- **[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)** - Performance and accessibility auditing

### Scripts

```bash
# Run individual accessibility tests
yarn a11y:axe        # Test with Axe Core
yarn a11y:pa11y      # Test with Pa11y
yarn a11y:lighthouse # Test with Lighthouse CI

# Run all accessibility tests
yarn a11y:all

# Utility scripts
yarn extract-routes           # Show routes from Router.tsx
yarn update-lighthouse-config # Update Lighthouse config with current routes
```

### GitHub Actions Integration

The repository includes automated accessibility testing in CI/CD:

- **Pull Request Comments** - Lighthouse CI posts performance and accessibility results directly to PRs
- **Multiple Tools** - Each PR is tested with Axe, Pa11y, and Lighthouse
- **Historical Tracking** - Performance trends are tracked over time

### Local Development

Before pushing changes, run accessibility tests locally:

```bash
# Start your dev server
yarn start

# In another terminal, run accessibility tests
yarn a11y:all
```

### Configuration

- **Lighthouse settings** - Modify `lighthouserc.json` for performance budgets and thresholds
- **Route extraction** - Routes are automatically detected from `src/Router.tsx`
- **CI configuration** - GitHub Actions workflow in `.github/workflows/accessibility.yml`

The accessibility tests automatically extract routes from your `Router.tsx` file, ensuring all pages are tested without manual configuration:

```typescript
// src/Router.tsx
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> }, // ← Automatically tested!
]);
```
