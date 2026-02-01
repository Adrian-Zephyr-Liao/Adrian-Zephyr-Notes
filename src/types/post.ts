/**
 * Local state shape for the new post form (admin).
 * Used by the new post page to hold title, slug, excerpt, content, cover image, and tags.
 *
 * @example
 * ```ts
 * const [post, setPost] = useState<PostState>({
 *   title: '',
 *   slug: '',
 *   excerpt: '',
 *   content: '',
 *   coverImage: '',
 *   tags: '',
 * })
 * ```
 */
export interface PostState {
  /** Post title. */
  title: string
  /** URL-friendly slug (e.g. derived from title). */
  slug: string
  /** Short excerpt or summary. */
  excerpt: string
  /** Full body content (markdown). */
  content: string
  /** Cover image URL. */
  coverImage: string
  /** Comma- or space-separated tags string. */
  tags: string
}
