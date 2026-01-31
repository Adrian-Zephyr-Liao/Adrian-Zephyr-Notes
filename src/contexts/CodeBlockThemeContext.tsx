'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'code-block-theme'
const DEFAULT_THEME_ID = 'atom-one-dark'
const THEMES_API = '/api/hljs-themes'

export interface CodeBlockThemeItem {
  id: string
  label: string
}

interface ThemesApiResponse {
  themes: CodeBlockThemeItem[]
}

interface CodeBlockThemeContextValue {
  theme: string
  setTheme: (theme: string) => void
  themes: CodeBlockThemeItem[]
  isLoading: boolean
}

const CodeBlockThemeContext = createContext<CodeBlockThemeContextValue | null>(
  null
)

function getStoredTheme(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID
  try {
    const stored = localStorage.getItem(STORAGE_KEY)?.trim()
    return stored || DEFAULT_THEME_ID
  } catch {
    return DEFAULT_THEME_ID
  }
}

function resolveTheme(
  current: string,
  themes: CodeBlockThemeItem[],
  fallback: string
): string {
  return themes.some((t) => t.id === current) ? current : themes[0]?.id ?? fallback
}

export function useCodeBlockTheme() {
  const ctx = useContext(CodeBlockThemeContext)
  if (!ctx) {
    throw new Error(
      'useCodeBlockTheme must be used within CodeBlockThemeProvider'
    )
  }
  return ctx
}

/** Optional hook: returns context or null if outside provider (e.g. read-only preview). */
export function useCodeBlockThemeOptional() {
  return useContext(CodeBlockThemeContext)
}

interface CodeBlockThemeProviderProps {
  children: ReactNode
  defaultTheme?: string
}

export function CodeBlockThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME_ID,
}: CodeBlockThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(getStoredTheme)
  const [themes, setThemes] = useState<CodeBlockThemeItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch(THEMES_API)
      .then((res) => res.json() as Promise<ThemesApiResponse>)
      .then((data) => {
        if (cancelled || !Array.isArray(data.themes)) return
        setThemes(data.themes)
        setThemeState((current) =>
          resolveTheme(current, data.themes, defaultTheme)
        )
      })
      .catch(() => {
        if (!cancelled) setThemes([])
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [defaultTheme])

  const setTheme = useCallback((next: string) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo<CodeBlockThemeContextValue>(
    () => ({
      theme,
      setTheme,
      themes,
      isLoading,
    }),
    [theme, setTheme, themes, isLoading]
  )

  return (
    <CodeBlockThemeContext.Provider value={value}>
      <CodeBlockThemeStyles theme={theme} />
      {children}
    </CodeBlockThemeContext.Provider>
  )
}

const HLJS_LINK_ID = 'hljs-code-block-theme'

function CodeBlockThemeStyles({ theme }: { theme: string }) {
  useEffect(() => {
    if (!theme) return
    const link =
      (document.getElementById(HLJS_LINK_ID) as HTMLLinkElement | null) ??
      (() => {
        const el = document.createElement('link')
        el.id = HLJS_LINK_ID
        el.rel = 'stylesheet'
        el.type = 'text/css'
        document.head.appendChild(el)
        return el
      })()
    link.href = `${THEMES_API}/${encodeURIComponent(theme)}`
  }, [theme])
  return null
}
