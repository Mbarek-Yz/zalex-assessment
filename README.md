# Zalex Employee Certification App

A React Native app for managing employee certificates of employment,
built with TypeScript.

## Architecture Overview

### Core Architecture Pattern

The app uses a component-based architecture with custom hooks for
business logic and Redux for global state management.

**Why this approach?**

- Redux (RTK) for global state
- Custom hooks for data fetching
- Adapter pattern for API transformation
- Component composition for reusability

## Environment / API Injection

The application uses environment variables for secure API configuration.

### 🔒 How to Inject API Keys Securely

**⚠️ CRITICAL: Never commit `.env` files to Git!**

#### Step 1: Create Your Local `.env` File

```bash
# In the project root directory
touch .env
```

Add your configuration (based on `.env.example`):

```env
# API CONFIG
API_URL="https://zalexinc.azure-api.net"
API_KEY="your_actual_api_key_here"
```

#### Step 2: Verify `.env` is in `.gitignore`

Ensure your `.gitignore` includes:

```gitignore
# Environment variables
.env
.env.local
.env.*.local
.env.production
.env.development
```

#### Step 3: Copy from `.env.example` Template

A `.env.example` template is already provided in the repository:

```env
# .env.example (already in repo)
# API CONFIG
API_URL="YOUR SERVER BASE URL"
API_KEY="YOUR API KEY"
```

Copy it to create your local `.env`:

```bash
cp .env.example .env
```

Then edit `.env` with your actual credentials.

### Usage in App

Environment variables are injected using `react-native-config`:

```ts
import Config from 'react-native-config';

const apiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Ocp-Apim-Subscription-Key': Config.API_KEY,
  },
});
```

### 🛡️ Security Best Practices

1. **Never hardcode API keys** in source code
2. **Never commit `.env`** to version control
3. **Rotate keys immediately** if accidentally exposed
4. **Use different keys** for development/staging/production
5. **Share keys securely** via password managers (1Password, LastPass)
6. **Validate keys exist** before app initialization:

```ts
if (!Config.API_KEY || !Config.API_URL) {
  throw new Error('API_KEY or API_URL is missing in .env file');
}
```

### Environment-Specific Configuration

For multiple environments:

```bash
# Development
.env.development

# Staging
.env.staging

# Production
.env.production
```

Load based on build configuration in your build scripts.

### 📱 Platform-Specific Setup

#### iOS

After creating `.env`, rebuild:

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

#### Android

```bash
npx react-native run-android
```

**Note**: Environment variables are bundled at build time. Restart Metro bundler and rebuild after changing `.env`.

### Troubleshooting

**Problem**: `Config.API_KEY` is `undefined`

**Solutions**:

1. Verify `.env` file exists in project root
2. Restart Metro bundler: `yarn start --reset-cache`
3. Clean and rebuild:

   ```bash
   # iOS
   cd ios && rm -rf build && pod install && cd ..

   # Android
   cd android && ./gradlew clean && cd ..
   ```

4. Ensure `react-native-config` is properly linked

This ensures:

- ✅ Secure credential management
- ✅ Easy environment switching
- ✅ Clean separation of configuration and code
- ✅ No secrets in version control

## Project Structure

    src/
    ├── adapters/
    ├── assets/
    ├── components/
    ├── config/
    ├── hooks/
    ├── locales/
    ├── navigation/
    ├── screens/
    ├── store/
    ├── utils/
    ├── validation/
    ├── App.tsx
    └── Layout.tsx

## Features

| Feature                  | Description                                |
| ------------------------ | ------------------------------------------ |
| Request Certificate      | Form with React Hook Form + Zod validation |
| Certificate List         | Fetch + search + sorting                   |
| Certificate Detail + PDF | PDF preview support                        |
| Update Purpose           | Editable when certificate status is New    |

## Design Decisions

### Redux State Management

Certificates are stored globally to:

- Keep data synchronized
- Avoid repeated API calls
- Maintain a single source of truth

### Navigation Strategy

Only certificate reference is passed between screens to:

- Prevent stale data
- Always fetch latest state

### Adapter Pattern

Transforms API responses into domain models.

### Debounced Search

Improves performance during typing.

### Custom Fetch Hook

Handles:

- Loading states
- Error states
- Response transformation

### Zod Validation

Used for type-safe form validation.

### TypeScript Usage

Strict mode enabled for better safety and maintainability.

## Third Party Libraries

| Library             | Purpose          |
| ------------------- | ---------------- |
| axios               | HTTP requests    |
| @reduxjs/toolkit    | State management |
| react-hook-form     | Form handling    |
| zod                 | Validation       |
| i18next             | Localization     |
| react-native-pdf    | PDF rendering    |
| react-native-config | Env variables    |
| react-navigation    | Navigation       |
| datetimepicker      | Date picker      |
| safe-area-context   | UI safety        |

## Getting Started

### Requirements

- Node.js
- Xcode (iOS)
- Android Studio
- CocoaPods

### Installation

```bash
yarn install
cd ios && pod install && cd ..
yarn start
```
