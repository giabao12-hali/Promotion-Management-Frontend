import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ['/dashboard']

export function middleware (request: NextRequest) {
    const {pathname} = request.nextUrl
    const token = request.cookies.get('token')?.value;

    // Bỏ qua nếu đã có callback URL để tránh loop
    const hasCallbackUrl = request.nextUrl.searchParams.has('callbackUrl');

    // kiểm tra các route đang được bảo vệ
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // nếu chưa đăng nhập + truy cập vào protected route
    if (isProtectedRoute && !token) {
        console.log('Middleware - Redirecting to home with callback')
        const callbackUrl = encodeURIComponent(pathname + request.nextUrl.search);
        const homeUrl = new URL(`/?callbackUrl=${callbackUrl}`, request.url);
        return NextResponse.redirect(homeUrl);
    }

    // nếu đã đăng nhập + truy cập vào home route + có callback URL
    if (pathname === '/' && token && hasCallbackUrl) {
        console.log('Middleware - User logged in, redirecting from home')
        const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
        const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/dashboard';
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    return NextResponse.next();
}

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
       '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
}