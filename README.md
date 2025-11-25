# Unleash Demo (Java + Angular)

A full-stack demonstration application showcasing [Unleash](https://www.getunleash.io/) feature flags with a Spring Boot backend and Angular frontend. This project demonstrates how to implement feature flags for various use cases including kill switches, A/B testing, and gradual rollouts.

## Architecture

- **Backend**: Spring Boot 4.0.0 with Java 21, Unleash Java SDK 9.2.4
- **Frontend**: Angular 21 with standalone components, Unleash JavaScript SDK
- **Styling**: Tailwind CSS v3
- **Build Tools**: Gradle (backend), npm (frontend)

## Prerequisites

- Java 21 or higher
- Node.js 18+ and npm
- An Unleash account (free tier available at [https://www.getunleash.io/](https://www.getunleash.io/))

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd demo
```

### 2. Configure Backend (Spring Boot)

Create the configuration file from the template:

```bash
cd src/main/resources
cp application.properties.example application.properties
```

Edit `application.properties` and replace `YOUR_UNLEASH_API_TOKEN_HERE` with your actual Unleash API token:

```properties
unleash.api.token=your-actual-token-here
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

Edit `unleash.config.ts` and replace `YOUR_UNLEASH_CLIENT_KEY_HERE` with your actual Unleash frontend/client key:

```typescript
clientKey: 'your-actual-client-key-here',
```

**Where to find your client key:**
1. Log in to [Unleash](https://app.unleash-hosted.com/)
2. Go to Settings → API Access
3. Create or copy a Frontend API token (client key)

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
- **Backend API**: [http://localhost:8080/test](http://localhost:8080/test)

## Feature Flags Used

This demo includes several pages showcasing different feature flag use cases:

- **Kill Switch**: Graceful degradation when services are unavailable
- **A/B Testing**: Testing different variations of features (coming soon)
- **Gradual Rollout**: Progressive rollout strategies (coming soon)
- **Settings**: Configuration management (coming soon)

### Backend Flags
- `hello_name_message`: Controls the greeting message returned by the `/test` endpoint

### Frontend Flags
- `message_kill_switch`: Emergency switch to show default message without calling the backend

## Project Structure

```
demo/
├── src/main/java/              # Spring Boot backend
│   └── io/getunleash/demo/
│       ├── DemoApplication.java
│       └── config/             # Unleash configuration
├── src/main/resources/
│   ├── application.properties.example  # Configuration template
│   └── application.properties          # Your actual config (gitignored)
├── frontend/
│   └── src/
│       └── app/
│           ├── components/     # Angular components
│           │   ├── kill-switch.component.ts
│           │   ├── ab-testing.component.ts
│           │   ├── gradual-rollout.component.ts
│           │   └── settings.component.ts
│           ├── services/       # Angular services
│           │   ├── api.service.ts
│           │   └── unleash.service.ts
│           ├── config/         # Configuration files
│           │   ├── unleash.config.example.ts  # Template (committed)
│           │   └── unleash.config.ts          # Actual config (gitignored)
│           ├── app.routes.ts
│           └── app.ts
└── README.md
```

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
