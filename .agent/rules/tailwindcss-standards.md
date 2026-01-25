---
trigger: always_on
---

# Tailwind CSS Standards

## Core Principles

### 1. Mobile-First
- Always write styles for mobile screens first (default).
- Use breakpoints (`md:`, `lg:`, `xl:`) to override for larger screens.
- **Incorrect**: `flex-row max-md:flex-col`
- **Correct**: `flex-col md:flex-row`

### 2. No `@apply`
- **Avoid** using `@apply` in CSS files unless creating a highly reusable base primitive in `index.css` that cannot be a component.
- Keep utilities in your HTML/JSX to maintain "Locality of Behavior".

### 3. Class Ordering
Follow a logical order for utility classes to improve readability:
1.  **Layout**: `flex`, `grid`, `absolute`, `relative`, `block`, `hidden`
2.  **Positioning/Spacing**: `top-0`, `m-4`, `p-2`, `gap-4`
3.  **Sizing**: `w-full`, `h-10`, `max-w-md`
4.  **Typography**: `text-lg`, `font-bold`, `uppercase`, `text-center`
5.  **Visuals**: `bg-white`, `text-gray-900`, `border`, `rounded`
6.  **Interactivity**: `hover:bg-gray-100`, `focus:ring`

### 4. Arbitrary Values
- **Discouraged**: `w-[357px]`, `bg-[#123456]`
- **Preferred**: Extend the specific value in `tailwind.config.ts` if used more than once.
- One-off values are acceptable for pixel-perfect unique constraints but generally avoid them.

## Theming & Dark Mode

### CSS Variables
- Use CSS variables defined in global css for colors.
- Map them in `tailwind.config` to utility classes (e.g., `bg-background`, `text-foreground`).
- This enables automatic Dark Mode support without littering `dark:` modifiers everywhere.

## Component Variants

### Use `class-variance-authority` (CVA)
- **Recommended** for components with multiple variants (e.g., Buttons, Badges).
- Installs `class-variance-authority`.
- Define variants cleanly outside your component.

### Example
```ts
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
```

## Conditional Classes

### Use `cn()` Helper
- **Mandatory** for combining dynamic classes.
- Install `clsx` and `tailwind-merge`.
- Create a utility:
  ```ts
  import { type ClassValue, clsx } from "clsx"
  import { twMerge } from "tailwind-merge"
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  ```
- **Usage**:
  ```tsx
  <div className={cn(buttonVariants({ variant: "outline" }), className)}>
  ```
