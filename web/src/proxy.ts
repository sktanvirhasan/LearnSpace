import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getDashboardUrl(role: string, baseUrl: string) {
  switch (role) {
    case 'admin':
      return new URL('/admin', baseUrl);
    case 'content-manager':
      return new URL('/content-manager', baseUrl);
    case 'instructor':
      return new URL('/instructor', baseUrl);
    default:
      return new URL('/dashboard', baseUrl);
  }
}

export async function proxy(request: NextRequest) {
  const jwt = request.cookies.get('jwt')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isRootRoute = pathname === '/';
  const isProtectedRoute = 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/instructor') || 
    pathname.startsWith('/content-manager') || 
    pathname.startsWith('/dashboard');

  if (!isAuthRoute && !isProtectedRoute && !isRootRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute && !jwt) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  let userRole = 'student'; 
  if (jwt) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=role`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        userRole = data?.role?.name?.toLowerCase() || 'student';
      } else {
        if (isProtectedRoute) {
          const response = NextResponse.redirect(new URL('/login', request.url));
          response.cookies.delete('jwt');
          return response;
        }
      }
    } catch (error) {
      console.error('Middleware role fetch failed');
    }
  }

  if ((isAuthRoute || isRootRoute) && jwt) {
    return NextResponse.redirect(getDashboardUrl(userRole, request.url));
  }

  if (isProtectedRoute) {
    if (pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(getDashboardUrl(userRole, request.url));
    }
    
    if (pathname.startsWith('/content-manager') && !['admin', 'content-manager'].includes(userRole)) {
      return NextResponse.redirect(getDashboardUrl(userRole, request.url));
    }
    
    if (pathname.startsWith('/instructor') && !['admin', 'content-manager', 'instructor'].includes(userRole)) {
      return NextResponse.redirect(getDashboardUrl(userRole, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};