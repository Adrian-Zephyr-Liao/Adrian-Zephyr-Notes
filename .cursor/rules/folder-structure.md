# Project Directory Structure Rule

This project follows a Feature-based architecture combined with Next.js App Router's Route Groups to separate the **Admin Dashboard** and **Public Blog**.

## Root Structure

- **`src/app/(client)`**: Public facing PC routes (Home, Immersive visuals).
- **`src/app/(admin)`**: Protected admin routes (Dashboard, Editors, Settings).
- **`src/features`**: Vertical slices of functionality.
- **`src/components`**: Shared UI components.
- **`src/lib`**: Utilities and configuration.

## Detailed Breakdown

### `src/features`
Each feature folder should contain everything specific to that domain.
Example: `src/features/posts`
- `components/`: Feature-specific components (e.g., `PostCard`, `PostEditor`).
- `hooks/`: Feature-specific hooks (e.g., `usePublishedPosts`).
- `utils/`: Domain logic helpers.
- `types.ts`: Domain specific types.
- `actions.ts`: Server Actions for this feature.

### `src/components`
- **`ui/`**: Atomic, distinct UI elements (Buttons, Inputs, Cards). These should not contain business logic.
- **`business/`**: Molecular components that might combine multiple UI atoms but are essentially cross-feature or generic enough (e.g., `UserAvatarWithMenu`).
- **`layouts/`**: Shared layout shells (e.g., `AdminSidebar`, `BlogHeader`).

### `src/lib`
- `db.ts`: Database connection/client.
- `utils.ts`: Generic helpers (classNames, formatting).
- `constants.ts`: Global static values.

## File Naming
- Components: `PascalCase.tsx` -> `Button.tsx`
- Hooks: `camelCase.ts` -> `useAuth.ts`
- Utilities: `camelCase.ts` -> `formatDate.ts`
