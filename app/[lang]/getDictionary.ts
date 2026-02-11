import 'server-only';

import enLocale from './locales/en.json';

type Dictionary = typeof enLocale;

export type Locale = 'en' | 'cs';
export const locales: Locale[] = ['en', 'cs'];

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    en: () => import('./locales/en.json').then((module) => module.default),
    cs: () => import('./locales/cs.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
    const loadDictionary = dictionaries[locale as Locale];
    if (!loadDictionary) {
        throw new Error(`Unsupported locale: ${locale}`);
    }
    return loadDictionary();
};