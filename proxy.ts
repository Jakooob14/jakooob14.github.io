import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'cs'];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
    const acceptLanguageHeader = request.headers.get('accept-language') || '';
    const languages = new Negotiator({ headers: { 'accept-language': acceptLanguageHeader } }).languages();
    const defaultLocale = 'en';

    return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;

    // If it's an asset return
    if (pathname.match('.*\\.(?:png|jpg|jpeg|svg|webp|ico|woff2|woff|ttf)') || pathname === '/sig') return NextResponse.next();

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // If there is locale return
    if (pathnameHasLocale) {
        const locale = pathname.split('/')[1];
        const response = NextResponse.next();
        response.cookies.set('lang', locale, { maxAge: 315360000 });

        return response;
    }

    let locale = getLocale(request);

    const langCookie = request.cookies.get('lang');
    if (request.cookies.has('lang') && langCookie && locales.includes(langCookie.value)) locale = langCookie.value;

    request.nextUrl.pathname = `/${locale}${pathname}`;
    const response =  NextResponse.redirect(request.nextUrl);

    response.cookies.set('lang', locale, { maxAge: 315360000 });

    return response;
}

export const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
