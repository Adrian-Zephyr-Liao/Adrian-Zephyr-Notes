import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/** Path to highlight.js styles (server-only). */
export const HLJS_STYLES = join(process.cwd(), 'node_modules/highlight.js/styles')

const THEME_EXTENSIONS = ['.min.css', '.css'] as const

/** Safe theme name (no path traversal). */
export function isValidThemeName(name: string): boolean {
  return /^[a-z0-9-]+$/i.test(name)
}

/** Resolve theme file path; prefers .min.css. Returns null if not found. */
export function getThemePath(name: string): string | null {
  if (!isValidThemeName(name)) return null
  for (const ext of THEME_EXTENSIONS) {
    const path = join(HLJS_STYLES, name + ext)
    if (existsSync(path)) return path
  }
  return null
}

/** List theme base ids from styles dir; prefers .min.css when both exist. */
export function listThemeIds(): string[] {
  const files = readdirSync(HLJS_STYLES, { withFileTypes: true })
  const byBase = new Map<string, string>()
  for (const f of files) {
    if (!f.isFile() || !f.name.endsWith('.css')) continue
    const base = f.name.replace(/\.min\.css$/, '').replace(/\.css$/, '')
    const existing = byBase.get(base)
    if (!existing || f.name.endsWith('.min.css')) byBase.set(base, f.name)
  }
  return Array.from(byBase.keys())
}

/** Read theme CSS by name; returns null if not found. */
export function readThemeCss(name: string): string | null {
  const path = getThemePath(name)
  return path ? readFileSync(path, 'utf-8') : null
}
