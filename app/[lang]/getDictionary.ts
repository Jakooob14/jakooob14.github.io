import 'server-only'

import enLocale from './locales/en.json';

type Locale = 'en' | 'cs';
type Dictionary = typeof enLocale;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    en: () => import('./locales/en.json').then((module) => module.default),
    cs: () => import('./locales/cs.json').then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
    return dictionaries[locale as Locale]();
};