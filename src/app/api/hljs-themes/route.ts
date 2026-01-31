import { listThemeIds } from '@/lib/hljs-themes.server'

/** "atom-one-dark" -> "Atom One Dark" */
function toLabel(id: string): string {
  return id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * GET /api/hljs-themes
 * Returns list of available highlight.js theme ids and labels.
 */
export async function GET() {
  const ids = listThemeIds()
  const themes = ids
    .map((id) => ({ id, label: toLabel(id) }))
    .sort((a, b) => a.label.localeCompare(b.label))
  return Response.json({ themes })
}
