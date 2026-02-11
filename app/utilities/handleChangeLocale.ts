export const handleChangeLocale = async (pathname: string, locale: string) => {
    const newPath = pathname.replace(/^\/[^/]+/, locale);
    window.location.replace('/' + newPath);
};
