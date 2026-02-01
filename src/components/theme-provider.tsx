'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

/**
 * Wraps next-themes ThemeProvider for app-wide light/dark mode.
 * Sets the `class` attribute on `<html>` (e.g. `"dark"`) so Tailwind `dark:` variants apply.
 *
 * @param props - Forwarded to next-themes ThemeProvider (e.g. `attribute`, `defaultTheme`, `enableSystem`)
 * @returns Provider wrapping children
 *
 * @see [next-themes](https://github.com/pacocoursey/next-themes)
 *
 * @example
 * ```tsx
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
