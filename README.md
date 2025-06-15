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

```

```
