# Architecture Notes

## Frontend

- `client/src/features/public` contains public entry pages.
- `client/src/features/user` contains learner-only pages and flows.
- `client/src/features/provider` contains provider-only pages and flows.
- `client/src/components` contains reusable UI building blocks.
- `client/src/services` centralizes API requests.
- `client/src/app/AuthContext.jsx` handles session bootstrap and role-aware auth state.

## Backend

- `server/src/models` contains MongoDB schemas for all required entities.
- `server/src/services` contains business rules and orchestration.
- `server/src/controllers` maps HTTP handlers to services.
- `server/src/routes` keeps route trees separated by public, auth, user, provider, and admin.
- `server/src/middleware` contains auth, role guards, validation, and error handling.

## Key rules enforced

- User and provider business logic are separated by route groups and service usage.
- Providers cannot create opportunities until their GST status is `approved`.
- Certification is only awarded when the submitted exam score is strictly greater than `70`.
- Accepted applications generate learner tasks, which power the `My Task` page flow.
