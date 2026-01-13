'use client'

import { createContext, useContext } from 'react';
import { getDictionary } from '@/app/[lang]/getDictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export type Locale = 'en' | 'cs';

const LocaleContext = createContext<Dictionary | null>(null)

export default function LocaleProvider({ dictionary, children,}: { dictionary: Dictionary, children: React.ReactNode }) {
    return (
        <LocaleContext.Provider value={ dictionary }>
            {children}
        </LocaleContext.Provider>
    )
}

export function useLocale() {
    const locale = useContext(LocaleContext)
    if (locale === null) {
        throw new Error('useLocale hook must be used within LocaleProvider');
    }

    return locale
}