import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';
import projects from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://jakubsokol.cz';
    const staticRoutes = [
        { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/portfolio', priority: 0.8, changeFrequency: 'weekly' as const },
    ];

    const projectRoutes = projects.map((project) => ({
        path: `/portfolio/${project.id}`,
        priority: 0.7,
        changeFrequency: 'monthly' as const,
    }));

    const allRoutes = [...staticRoutes, ...projectRoutes];
    const items: MetadataRoute.Sitemap = [];

    for (const route of allRoutes) {
        for (const locale of locales) {
            const languages: Record<string, string> = {};
            for (const loc of locales) {
                languages[loc] = `${baseUrl}/${loc}${route.path}`;
            }
            languages['x-default'] = `${baseUrl}/${defaultLocale}${route.path}`;

            items.push({
                url: `${baseUrl}/${locale}${route.path}`,
                lastModified: new Date(),
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                alternates: {
                    languages,
                },
            });
        }
    }

    return items;
}
