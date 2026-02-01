'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Floating action group for admin: fixed bottom-right, vertical stack.
 * Use for theme toggle, back-to-top, etc. Add more buttons as children (first in DOM = top, last = bottom).
 */
export function AdminFloatingActions({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label="Admin quick actions"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex flex-col gap-2',
        'rounded-xl p-1.5 shadow-lg border border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80',
        className
      )}
    >
      {children}
    </div>
  )
}
