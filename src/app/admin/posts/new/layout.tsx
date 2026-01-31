/**
 * Empty layout to break out of the admin container constraints.
 * This allows the new post page to use the full viewport.
 */
export default function NewPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
