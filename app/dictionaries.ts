import 'server-only'

const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    cs: () => import('./dictionaries/cs.json').then((module) => module.default),
}

// @ts-ignore
export const getDictionary = async (locale: string | number) => dictionaries[locale]();
