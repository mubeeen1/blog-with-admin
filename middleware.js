import { NextResponse } from 'next/server'
import { validateUser, findUserByEmail } from '@/lib/mongoose/models'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip authentication for public routes
  if (pathname.startsWith('/api/auth') || 
      pathname.startsWith('/_next') ||
      pathname.startsWith('/static') ||
      pathname === '/' ||
      pathname.startsWith('/blog') ||
      pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)) {
    return NextResponse.next()
  }

  // Check for admin routes
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization')
    
    // Check for basic auth
    if (authHeader && authHeader.startsWith('Basic ')) {
      const base64Credentials = authHeader.slice(6)
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
      const [email, password] = credentials.split(':')
      
      const user = await validateUser(email, password)
      
      if (user) {
        // Valid credentials, proceed
        const response = NextResponse.next()
        
        // Add user info to headers for downstream use
        response.headers.set('x-user-email', user.email)
        response.headers.set('x-user-role', user.role)
        
        return response
      }
    }

    // Check for session cookie (for browser requests)
    const sessionCookie = request.cookies.get('admin_session')
    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'))
        const user = await findUserByEmail(sessionData.email)
        
        if (user && sessionData.timestamp > Date.now() - (24 * 60 * 60 * 1000)) { // 24 hour session
          const response = NextResponse.next()
          response.headers.set('x-user-email', user.email)
          response.headers.set('x-user-role', user.role)
          return response
        }
      } catch (error) {
        // Invalid session cookie
      }
    }

    // Not authenticated - redirect to login or return 401
    if (pathname === '/admin') {
      // Allow access to login page
      return NextResponse.next()
    }

    // For API requests, return 401
    if (pathname.startsWith('/api/admin')) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // For page requests, redirect to login
    const loginUrl = new URL('/admin', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
