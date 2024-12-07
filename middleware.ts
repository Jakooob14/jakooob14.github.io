import {NextRequest, NextResponse} from "next/server";
import {match} from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ['en', 'cs'];

// Get the preferred locale, similar to the above or using a library
function getLocale() {
    const headers = { 'accept-language': 'en-US,en;q=0.5' };
    const languages = new Negotiator({ headers }).languages();
    const defaultLocale = 'en';

    return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl

    // If it's an asset return
    if (pathname.match(".*\\.(?:png|jpg|jpeg|svg|webp|ico|woff2|woff|ttf)") || pathname === '/sig') return NextResponse.next();

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    // If there is locale return
    if (pathnameHasLocale) return NextResponse.next();


    let locale = getLocale()

    const langCookie = request.cookies.get("lang");
    if (request.cookies.has('lang') && langCookie && locales.includes(langCookie.value)) locale = langCookie.value;

    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    const response =  NextResponse.redirect(request.nextUrl)

    // Set lang cookie
    response.cookies.set("lang", locale, { maxAge: 315360000 });

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
}