import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas que não precisam de autenticação
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/about',
  '/features',
  '/pricing',
  '/terms',
  '/privacy',
  '/cookies'
]

// Rotas do portal do cliente
const clientPortalRoutes = [
  '/client-portal',
  '/client-portal/processes',
  '/client-portal/communications',
  '/client-portal/documents',
  '/client-portal/document-types',
  '/client-portal/billing',
  '/client-portal/profile',
  '/client-portal/ai-assistant'
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Verifica se o usuário está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname

  // Permite acesso a rotas públicas
  if (publicRoutes.includes(path)) {
    return res
  }

  // Redireciona usuários não autenticados para o login
  if (!session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(redirectUrl)
  }

  // Verifica permissões para rotas do portal do cliente
  if (clientPortalRoutes.includes(path)) {
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (user?.role !== 'client') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    // Match all request paths except:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public files (public assets)
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ]
}