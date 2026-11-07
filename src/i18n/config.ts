export const locales = ['en', 'cs'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
    en: 'English',
    cs: 'Česky',
};

export function isValidLocale(locale: string): locale is Locale {
    return (locales as readonly string[]).includes(locale);
}
