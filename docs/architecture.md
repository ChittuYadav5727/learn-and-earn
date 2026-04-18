# Architecture Notes

## Frontend

- `apps/frontend/src/features/public` contains public entry pages.
- `apps/frontend/src/features/user` contains learner-only pages and flows.
- `apps/frontend/src/features/provider` contains provider-only pages and flows.
- `apps/frontend/src/components` contains reusable UI building blocks.
- `apps/frontend/src/services` centralizes API requests.
- `apps/frontend/src/app/AuthContext.jsx` handles session bootstrap and role-aware auth state.

## Backend

- `apps/backend/src/models` contains MongoDB schemas for all required entities.
- `apps/backend/src/services` contains business rules and orchestration.
- `apps/backend/src/controllers` maps HTTP handlers to services.
- `apps/backend/src/routes` keeps route trees separated by public, auth, user, provider, and admin.
- `apps/backend/src/middleware` contains auth, role guards, validation, and error handling.

## Infrastructure

- `infra/data` is reserved for local database state only.
- `infra/tools` is reserved for local infrastructure binaries only.
- `runtime/logs` is reserved for local development logs only.

## Key rules enforced

- User and provider business logic are separated by route groups and service usage.
- Providers cannot create opportunities until their GST status is `approved`.
- Certification is only awarded when the submitted exam score is strictly greater than `70`.
- Accepted applications generate learner tasks, which power the `My Task` page flow.
