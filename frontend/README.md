# Unleash Demo - Frontend

Angular 21 frontend application demonstrating Unleash feature flags with Tailwind CSS styling and dark mode support.

This project showcases advanced feature flag patterns including kill switches, A/B testing with variants, context-based targeting, and personalized content delivery. Built with modern Angular standalone components and optimized for laptop screens (13-16").

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Quick Start

### 1. Configure Unleash

Copy the configuration template:

```bash
cd src/app/config
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

The `src/app/config/unleash.config.ts` file contains:
- Unleash server URL (proxy endpoint)
- Client key (frontend API token)
- App name
- Refresh interval (15 seconds)
- Feature flag names and defaults

**⚠️ Security Note**: Never commit `unleash.config.ts` - it's excluded via `.gitignore`. Always use `unleash.config.example.ts` as a template.

## Demo Pages

The application includes four interactive pages demonstrating different feature flag patterns:

### 1. Kill Switch (`/kill-switch`)
- **Flag**: `disable-slow-reports`
- Demonstrates emergency circuit breaker pattern
- Shows graceful degradation when backend operations are slow
- Displays cache indicator when kill switch is active

### 2. Pricing Experiment (`/pricing-experiment`)
- **Flag**: `pricing-experiment`
- A/B test with 3 variants: control, promo_v1, promo_v2
- Context-based targeting by country
- Interactive country selector and user simulation
- Real-time variant display

### 3. Recommendations (`/recommendations`)
- **Flag**: `movie-recommendations`
- Compares simple vs ML-based recommendation algorithms
- Netflix-style movie carousel with auto-scrolling animation
- Real movie data with TMDB posters and IMDb IDs
- Includes 11 best practices from Unleash documentation
- Click tracking for conversion metrics

### 4. UI-Only Feature (`/ui-only`)
- **Flag**: `dark-mode`
- Pure client-side feature flag (no backend)
- Theme toggle with persistent preference
- Demonstrates frontend-only feature control

## Project Structure

```
src/app/
├── components/          # UI Components (standalone)
│   ├── kill-switch.component.ts
│   ├── pricing-experiment.component.ts
│   ├── recommendations.component.ts
│   ├── ui-only.component.ts
│   └── navigation.component.ts
├── services/           # Angular Services
│   ├── api.service.ts              # Backend API calls
│   ├── unleash.service.ts          # Unleash SDK wrapper
│   └── dark-mode.service.ts        # Theme management
├── config/            # Configuration
│   ├── unleash.config.example.ts   # Template (committed)
│   └── unleash.config.ts           # Your config (gitignored)
├── app.routes.ts      # Route definitions
├── app.config.ts      # App configuration
└── app.ts             # Root component
```

## Feature Flags

| Flag Name | Type | Description |
|-----------|------|-------------|
| `disable-slow-reports` | Kill Switch | Emergency circuit breaker for slow operations |
| `pricing-experiment` | Experiment | 3-way A/B test with context targeting |
| `movie-recommendations` | Experiment | Algorithm comparison with variants |
| `dark-mode` | Release | UI-only theme toggle |

## Key Features

- **Tailwind CSS**: Modern styling with dark mode support
- **Responsive**: Optimized for laptop screens (13-16")
- **Real-time Updates**: Feature flags update without page refresh
- **User Simulation**: Test different contexts and variants
- **Interactive Panel**: Collapsible configuration panel on every page
- **Rich Content**: Real movie data with TMDB images
- **Performance**: Auto-scrolling animations with pause on interaction

## Development server

To start a local development server, run:

```bash
npm start
# or
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

**Note**: Make sure the backend server is also running on `http://localhost:8080` for full functionality.


## Building

To build the project run:

```bash
npm run build
# or
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
# or
ng test
```

## Additional Resources

- [Unleash Documentation](https://docs.getunleash.io/)
- [Feature Flag Best Practices](https://docs.getunleash.io/guides/feature-flag-best-practices)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Backend Integration

This frontend communicates with a Spring Boot backend for certain features:

- **Kill Switch**: `/api/reports` - Report generation with optional kill switch
- **Recommendations**: `/api/recommendations` - Movie recommendations based on variant

User context (userId) is automatically sent via `X-Unleash-User-Id` header to ensure consistent feature flag evaluation between frontend and backend.

**Note**: In this demo, user IDs are randomly generated for simulation purposes. In a real production environment, user context would typically be derived from authentication mechanisms such as session cookies, JWT tokens, OAuth credentials, or other identity providers.
