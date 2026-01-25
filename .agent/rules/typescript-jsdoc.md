# TypeScript & JSDoc Standards

## TypeScript

### Strict Typing
- **NO `any` types**. This is strictly forbidden.
- Use `unknown` if the type truly isn't known yet, and type guard against it.
- Explicitly define return types for complex functions.

### Interfaces vs Types
- Use `interface` for object definitions (extensible).
- Use `type` for unions, intersections, and primitives.

### Zod Validation
- Use **Zod** for all boundary crossing data (API responses, Form inputs, URL params).
- Infer types from Zod schemas:
  ```ts
  const UserSchema = z.object({ id: z.string() });
  type User = z.infer<typeof UserSchema>;
  ```

## JSDoc & Comments

### Requirement
All exported functions, hooks, and shared components **MUST** have JSDoc comments.

### Format
- **Description**: A clear, one-sentence summary of what the entity does.
- **@param**: Document every parameter.
- **@returns**: Document the return value.
- **@example**: Provide an usage example for utility functions.

### Example
```ts
/**
 * Formats a date string into a localized human-readable format.
 *
 * @param date - The date object or ISO string to format.
 * @param locale - The locale string (default: 'en-US').
 * @returns The formatted date string.
 *
 * @example
 * formatDate(new Date(), 'en-US') // "Jan 1, 2024"
 */
export function formatDate(date: Date | string, locale: string = 'en-US'): string {
  // implementation
}
```
