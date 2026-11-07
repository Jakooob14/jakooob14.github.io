import { getRequestConfig } from 'next-intl/server';
import { isValidLocale, defaultLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !isValidLocale(locale)) {
        locale = defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
