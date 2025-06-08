import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /api/auth, etc.)
  const path = request.nextUrl.pathname;

  // Define auth-related paths
  const isApiPath = path.startsWith('/api/auth/');
  const isLoginPage = path === '/parent-login';
  const isHomePage = path === '/';
  const isDashboard = path === '/dashboard';

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || '';

  // If user is not authenticated and tries to access dashboard
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL('/parent-login', request.url));
  }

  // If user is authenticated and tries to access login page
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow API routes and homepage to proceed normally
  if (isApiPath || isHomePage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure the paths that middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 