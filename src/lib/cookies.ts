export function setLocaleCookie(locale: string) {
    if (typeof document !== "undefined") {
        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=315360000; SameSite=Lax`;
    }
}
