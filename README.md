# Zalex Employee Certification App

A React Native app for managing employee certificates of employment, built with TypeScript.

---

## Architecture Overview

### Core Architecture Pattern

The app uses a component-based architecture with custom hooks for business logic and Redux for global state management. This approach keeps UI, state, and network concerns cleanly separated while remaining maintainable and testable.

**Why this approach?**

- **Redux (RTK) for global state** — Certificates are shared across multiple screens (list, detail, and edit). Redux enables updates to be reflected immediately across screens.
- **Custom hooks for data fetching** — Simple data requirements are handled using `useFetch` and `usePost`, providing full control over loading states, error handling, and response transformation.
- **Adapter pattern** — API responses are transformed into strongly typed domain models before reaching UI components.
- **Component composition** — Screens are composed of small reusable components for better maintainability and testability.

---

## Project Structure

src/
├── adapters/ # API response transformation and type definitions
├── assets/ # Images and static assets
├── components/ # Reusable UI components
├── config/ # API endpoints and configuration
├── hooks/ # Business logic hooks
├── locales/ # Internationalization (i18n)
├── navigation/ # Stack navigator and screen param types
├── screens/ # Screen-level components
├── store/ # Redux store, root reducer, and slices
├── utils/ # Colors, fonts, dimensions, constants, enums
├── validation/ # Zod schemas for form validation
├── App.tsx
└── Layout.tsx

---

## Features

| Feature                            | Description                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| **F02 — Request Certificate**      | Form with address, purpose, issued date, and employee ID. Uses React Hook Form + Zod validation. |
| **F03 — Certificate List**         | Fetches certificates with search and sorting support.                                            |
| **F04 — Certificate Detail + PDF** | Displays certificate details with PDF preview.                                                   |
| **F05 — Update Purpose**           | Allows editing purpose when certificate status is "New". Updates are reflected instantly.        |

---

## Design Decisions & Considerations

### Redux for Certificate State

Certificates are stored in Redux after the initial fetch to provide a single source of truth across screens.

Design Considerations:

- Enables real-time UI updates when purpose is edited.
- Avoids unnecessary network calls.
- Adds some boilerplate code but improves consistency.

---

### Navigation by Reference

Only the certificate `reference` is passed between screens.

Design Considerations:

- Prevents stale data in navigation parameters.
- Ensures detail screens always read the latest Redux state.
- Requires memoized selectors for performance optimization.

---

### Adapter Pattern for API Integration

API responses are transformed using adapter functions such as `decodeCertificate`.

Design Considerations:

- UI components receive clean and predictable data.
- Handles missing API fields gracefully.
- Centralizes API contract changes.

---

### Debounced Search

Search input is debounced before filtering results.

Design Considerations:

- Improves performance by reducing re-renders.
- Provides smoother user experience while typing.

---

### Custom Fetch Hook

A generic `useFetch<T, R>` hook is used for data fetching.

Design Considerations:

- Manages loading and error states.
- Supports response transformation.
- Does not implement caching (not required for current scope).

---

### Zod Validation

Form validation is handled using Zod schemas.

Design Considerations:

- Type-safe validation rules.
- Strong integration with React Hook Form.
- Easy to maintain and extend.

---

### TypeScript Usage

The project uses strict TypeScript mode.

Design Considerations:

- Improves code safety.
- Enhances IDE autocomplete and refactoring.
- Detects errors early during development.

---

## Third-Party Libraries

| Library             | Purpose               |
| ------------------- | --------------------- |
| axios               | HTTP client           |
| @reduxjs/toolkit    | State management      |
| react-hook-form     | Form handling         |
| zod                 | Validation            |
| i18next             | Internationalization  |
| react-native-pdf    | PDF rendering         |
| react-native-config | Environment variables |
| react-navigation    | Navigation            |
| datetimepicker      | Date selection        |
| safe-area-context   | Safe area handling    |

---

## Getting Started

### Prerequisites

- Node.js >= 22
- Xcode (iOS development)
- Android Studio (Android development)
- CocoaPods (iOS)

---

### Installation

```bash
yarn install
yarn pods
yarn start
```
