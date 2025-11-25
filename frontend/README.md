# Unleash Demo - Frontend

Angular 21 frontend application demonstrating Unleash feature flags with Tailwind CSS styling.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Quick Start

### 1. Configure Unleash

Copy the configuration template:

```bash
cd src/app
cp unleash.config.example.ts unleash.config.ts
```

Edit `unleash.config.ts` and add your Unleash client key:

```typescript
clientKey: 'your-actual-client-key-here',
```

**Where to find your client key:**
1. Log in to [Unleash](https://app.unleash-hosted.com/)
2. Go to Settings → API Access
3. Create or copy a Frontend API token (client key)

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
```

The application will be available at [http://localhost:4200](http://localhost:4200)

## Available Scripts

- `npm start` - Start development server (alias for `ng serve`)
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests

## Configuration

The `unleash.config.ts` file contains:
- Unleash server URL
- Client key (frontend API token)
- App name
- Refresh interval
- Feature flag names

**⚠️ Security Note**: Never commit `unleash.config.ts` - it's excluded via `.gitignore`. Always use `unleash.config.example.ts` as a template.

## Feature Flags

- `message_kill_switch` - Controls whether to call the backend API or show a default message (graceful degradation)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
