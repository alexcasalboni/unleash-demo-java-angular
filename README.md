# Unleash Demo (Java + Angular)

A full-stack demonstration application showcasing [Unleash](https://www.getunleash.io/) feature flags with a Spring Boot backend and Angular frontend. This project demonstrates advanced feature flag patterns including kill switches, A/B testing with variants, and context-based targeting.

## Architecture

- **Backend**: Spring Boot 4.0.0 with Java 21, Unleash Java SDK 9.2.4
- **Frontend**: Angular 21 with standalone components, Unleash JavaScript SDK
- **Styling**: Tailwind CSS v3 with dark mode support
- **Build Tools**: Gradle (backend), npm (frontend)

## Prerequisites

- Java 21 or higher
- Node.js 18+ and npm
- An Unleash account/instance

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Unleash/demo-java-angular.git
cd demo
```

### 2. Configure Backend (Spring Boot)

Create the configuration file from the template:

```bash
cd src/main/resources
cp application.properties.example application.properties
```

Edit `application.properties` and configure your Unleash API token and instance URL:

```properties
unleash.api.url=https://YOUR_UNLEASH_INSTANCE_URL/api
unleash.api.token=YOUR_UNLEASH_API_TOKEN_HERE
```

**Where to find your token:**
1. Log in to [Unleash](https://app.unleash-hosted.com/)
2. Go to Settings → API Access
3. Create or copy an API token with appropriate permissions

### 3. Configure Frontend (Angular)

Create the configuration file from the template:

```bash
cd frontend/src/app/config
cp unleash.config.example.ts unleash.config.ts
```

Edit `unleash.config.ts` and configure your Unleash frontend key and instance URL:

```typescript
  url: 'https://YOUR_UNLEASH_INSTANCE_URL/api/frontend',
  clientKey: 'YOUR_UNLEASH_CLIENT_KEY_HERE',
```

**Where to find your frontend token:**
1. Log in to [Unleash](https://app.unleash-hosted.com/)
2. Go to Settings → API Access
3. Create or copy a Frontend API token

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Running the Application

### Start the Backend Server

From the project root directory:

```bash
./gradlew bootRun
```

Or use your IDE's debug/run configuration. The backend will start on **http://localhost:8080**

### Start the Frontend Development Server

In a separate terminal, from the `frontend` directory:

```bash
npm start
```

The Angular dev server will start on **http://localhost:4200**

## Accessing the Application

Open your browser and navigate to:
- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend API**: 
  - Reports endpoint: [http://localhost:8080/api/reports](http://localhost:8080/api/reports)
  - Recommendations endpoint: [http://localhost:8080/api/recommendations](http://localhost:8080/api/recommendations)

## Demo Pages & Feature Flags

This demo includes four interactive pages, each showcasing different feature flag patterns and best practices:

### 1. UI-Only Feature (`/ui-only`)

Client-side only feature flag demonstration.

**Feature Flag**: `dark-mode`
- **Type**: Release toggle
- **Use Case**: Frontend-only feature without backend dependency
- **Features**:
  - Toggle between light and dark themes
  - Persistent preference in localStorage
  - No backend API calls required
  - Demonstrates pure client-side feature control

### 2. Kill Switch (`/kill-switch`)

Demonstrates graceful degradation when services are experiencing issues.

**Feature Flag**: `disable-slow-reports`
- **Type**: Kill switch
- **Use Case**: Emergency circuit breaker to disable slow report generation
- **Backend**: Bypasses slow processing and returns cached results when enabled
- **Frontend**: Shows cache indicator when kill switch is active

### 3. Recommendations (`/recommendations`)

Personalized movie recommendations using A/B testing to compare algorithms.

**Feature Flag**: `movie-recommendations`
- **Type**: Experiment
- **Variants**:
  - `v1-simple`: Basic recommendation algorithm (10 popular movies)
  - `v2-ml`: ML-based recommendation algorithm (10 personalized movies)
- **Features**:
  - Movie carousel with TMDB poster images
  - Real movie data with IMDb IDs, ratings, and years
- **Backend**: Different movie datasets per variant with unique IMDb IDs
- **Frontend**: Loads recommendations only when flag is enabled


### 4. Pricing Experiment (`/pricing-experiment`)

A/B testing with three variants and context-based targeting.

**Feature Flag**: `pricing-experiment`
- **Type**: Experiment
- **Variants**: 
  - `control` (30%): Standard pricing layout
  - `promo_v1` (35%): Discount banner with promotional messaging
  - `promo_v2` (35%): Emphasized yearly plan with "Best Value" badge
- **Context Targeting**: Only enabled for specific countries (UK and US)
- **Features**: 
  - Dynamic country selector to test different contexts
  - User simulation to see different variant assignments
  - Real-time variant display in configuration panel


## Feature Flags Summary

| Flag Name | Type | Backend | Frontend | Description |
|-----------|------|---------|----------|-------------|
| `dark-mode` | Release | - | ✓ | Theme toggle (UI-only) |
| `disable-slow-reports` | Kill Switch | ✓ | ✓ | Emergency circuit breaker for slow operations |
| `movie-recommendations` | Experiment | ✓ | ✓ | Compare recommendation algorithms |
| `pricing-experiment` | Experiment | - | ✓ | A/B test with 3 variants + context targeting |

## Project Structure

```
demo/
├── src/main/java/              # Spring Boot backend
│   └── io/getunleash/demo/
│       ├── DemoApplication.java          # Main app + REST controllers
│       ├── config/                       # Configuration classes
│       │   ├── GlobalExceptionHandler.java
│       │   ├── UnleashConfiguration.java
│       │   └── UnleashProperties.java
│       └── model/
│           └── Movie.java               # Movie entity with IMDb IDs
├── src/main/resources/
│   ├── application.properties.example   # Configuration template
│   └── application.properties           # Your actual config (gitignored)
├── frontend/
│   └── src/
│       └── app/
│           ├── components/              # Angular components (standalone)
│           │   ├── kill-switch.component.ts
│           │   ├── pricing-experiment.component.ts
│           │   ├── recommendations.component.ts
│           │   ├── ui-only.component.ts
│           │   └── navigation.component.ts
│           ├── services/                # Angular services
│           │   ├── api.service.ts
│           │   ├── unleash.service.ts
│           │   └── dark-mode.service.ts
│           ├── config/                  # Configuration files
│           │   ├── unleash.config.example.ts  # Template (committed)
│           │   └── unleash.config.ts          # Actual config (gitignored)
│           ├── app.routes.ts
│           ├── app.config.ts
│           └── app.ts
├── build.gradle                         # Gradle configuration
├── README.md                            # This file
└── frontend/README.md                   # Frontend-specific docs
```

## Key Features

- **Real-world Patterns**: Kill switches, A/B testing, context targeting, and personalized content
- **Rich Demo Data**: Real movie data with TMDB posters and IMDb IDs
- **Modern UI**: Tailwind CSS with dark mode support, responsive design optimized for laptop screens
- **Live Updates**: Real-time feature flag updates without page refresh
- **Variant Testing**: Three-way A/B tests with control groups
- **Context Targeting**: Geographic and user-based targeting
- **User Simulation**: Test different user contexts and variant assignments
- **Interactive Panel**: Collapsible feature flags configuration panel on every page

## Security Notes

⚠️ **Important**: The actual configuration files (`application.properties` and `unleash.config.ts`) are excluded from Git via `.gitignore` to prevent accidentally committing sensitive API tokens.

Always use the `.example` template files as reference and never commit files containing real API tokens or secrets.

## Contributing

When contributing, ensure you:
1. Never commit real API tokens or secrets
2. Update the `.example` files if you add new configuration parameters
3. Test with your own Unleash account credentials

## License

Apache 2
