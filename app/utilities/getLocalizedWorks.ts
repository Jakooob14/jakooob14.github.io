import { useDictionary } from '@/app/[lang]/DictionaryProvider';
import { works } from '@/app/data/works';

export function getLocalizedWorks(dict: ReturnType<typeof useDictionary>) {
    const items = dict.home.works.works_list;

    return works.map(work => {
        const key = work.id as keyof typeof items;
        const t = items[key];

        return {
            ...work,
            title: t.title,
            brief: t.brief,
            description: t.description,
        };
    });
}