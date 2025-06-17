import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define auth-related paths
  const isApiPath = path.startsWith('/api/auth/');
  const isAdminApiPath = path.startsWith('/api/admin/');
  const isLoginPage = path === '/parent-login';
  const isHomePage = path === '/';
  const isDashboard = path === '/dashboard';
  const isAdminPath = path.startsWith('/admin');
  const isAdminLoginPage = path === '/admin';

  // Get tokens from cookies
  const userToken = request.cookies.get('token')?.value || '';
  const adminToken = request.cookies.get('admin-token')?.value || '';

  // Allow all API routes to proceed normally
  if (isApiPath || isAdminApiPath) {
    return NextResponse.next();
  }

  // If user is not authenticated and tries to access dashboard
  if (isDashboard && !userToken) {
    return NextResponse.redirect(new URL('/parent-login', request.url));
  }

  // If user is authenticated and tries to access login page
  if (isLoginPage && userToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If admin is not authenticated and tries to access admin routes
  if (isAdminPath && !adminToken && !isAdminLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If admin is authenticated and tries to access login page
  if (isAdminLoginPage && adminToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Allow homepage to proceed normally
  if (isHomePage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure the paths that middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 