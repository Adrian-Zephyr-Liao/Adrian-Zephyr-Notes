import { NextRequest } from 'next/server'
import { readThemeCss } from '@/lib/hljs-themes.server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const css = readThemeCss(name)
  if (!css) {
    return new Response('Theme not found', { status: 404 })
  }
  return new Response(css, {
    headers: { 'Content-Type': 'text/css; charset=utf-8' },
  })
}
