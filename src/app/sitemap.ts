import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://jakubsokol.cz';
    const routes = ['', '/portfolio'];

    const items: MetadataRoute.Sitemap = [];

    for (const route of routes) {
        for (const locale of locales) {
            const languages: Record<string, string> = {};
            for (const loc of locales) {
                languages[loc] = `${baseUrl}/${loc}${route}`;
            }
            languages['x-default'] = `${baseUrl}/${defaultLocale}${route}`;

            items.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
                alternates: {
                    languages,
                },
            });
        }
    }

    return items;
}
