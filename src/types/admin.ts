/**
 * Single stat card item for the admin dashboard.
 * Used to display metrics such as total posts, drafts, views.
 *
 * @example
 * ```ts
 * const stats: StatItem[] = [
 *   { id: 'total-posts', title: 'Total Posts', value: '0', description: 'Published articles' },
 *   { id: 'drafts', title: 'Drafts', value: 0, description: 'In progress' },
 * ]
 * ```
 */
export type StatItem = {
  /** Unique id for the stat (e.g. for keys or analytics). */
  id: string
  /** Label shown on the card (e.g. "Total Posts"). */
  title: string
  /** Display value; can be string or number. */
  value: string | number
  /** Short description below the value (e.g. "Published articles"). */
  description: string
}
