'use client';

import { Heading1 } from '@/app/components/Headings';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';
import LinksGroup from '@/app/components/LinksGroup';
import useHash from '@/app/hooks/useHash';

export default function WorksPage() {
    const dict = useDictionary();
    const hash = useHash();
    
  return (
    <main className={'my-24'}>
        <section className={'container mx-auto'}>
            <Heading1 className={'mt-8'}>{dict.home.works.title}</Heading1>
            
            <LinksGroup>
                <LinksGroup.AnchorButton label={'Websites'} href={'#websites'} active={hash === 'websites'}/>
                <LinksGroup.AnchorButton label={'Games'} href={'#games'} active={hash === 'games'}/>
            </LinksGroup>
            
        {/* TODO: Implement concept art and make each project have a slide up animation on load and category change */}
        </section>
    </main>
  );
}