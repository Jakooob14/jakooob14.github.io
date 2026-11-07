import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18n = createMiddleware(routing);

export default handleI18n;
export { handleI18n as proxy };

export const config = {
    // Match all pathnames except for:
    // - /api, /_next, /_vercel
    // - static files with extensions (e.g. favicon.ico, images, fonts)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
