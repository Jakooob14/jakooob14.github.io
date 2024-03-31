import { NextResponse } from "next/server";
import Negotiator from "negotiator";
import {match} from "@formatjs/intl-localematcher";

let locales = ['en', 'cs'];

// Get the preferred locale, similar to the above or using a library
function getLocale() {
    let headers = { 'accept-language': 'en-US,en;q=0.5' };
    let languages = new Negotiator({ headers }).languages();
    let defaultLocale = 'en';

    return match(languages, locales, defaultLocale);
}

export function middleware(request: any) {
    let locale = getLocale();

    if (request.cookies.has("lang")) locale = request.cookies.get("lang").value;

    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl

    if (pathname.match(".*\\.(?:png|jpg|jpeg|svg|webp|.ico)")) return NextResponse.next();

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameHasLocale) return NextResponse.next();


    request.nextUrl.pathname = `/${locale}${pathname}`


    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    const response = NextResponse.redirect(request.nextUrl);
    // Reset cookie after one decade, cuz why not
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