'use client';

import { Heading1, Heading2, Heading3 } from '@/app/components/Headings';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';
import LinksGroup from '@/app/components/LinksGroup';
import useHash from '@/app/hooks/useHash';
import Translate from '@/app/components/Translate';
import Link from 'next/link';
import { FaCodeBranch, FaGitAlt } from 'react-icons/fa6';
import WorkCard from '@/app/components/WorkCard';

export default function WorksPage() {
    const dict = useDictionary();
    const hash = useHash();
    
  return (
    <main className={'my-24'}>
        <section className={'container mx-auto'}>
            <div>
                <Heading1 className={'mt-8'}>{dict.home.works.title}</Heading1>

                <LinksGroup>
                    <LinksGroup.AnchorButton label={'All'} href={'#'} active={hash === ''}/>
                    <LinksGroup.AnchorButton label={'Websites'} href={'#web-development'} active={hash === 'web-development'}/>
                    <LinksGroup.AnchorButton label={'Games'} href={'#game-development'} active={hash === 'game-development'}/>
                </LinksGroup>
            </div>
            
            <ul className={'grid mt-8 gap-8 md:gap-12 lg:gap-16 grid-cols-1 xl:grid-cols-2'}>
                {dict.home.works.works_list.map((work, index) => (
                    (work.category === hash || hash === '') && (
                        <li key={work.id}
                             id={work.id}
                             className={`mb-12 w-full ${index % 2 === 0 ? 'justify-self-start' : 'justify-self-end'}`}>
                            <WorkCard work={work as never} />
                        </li>
                    )
                ))}
            </ul>
            
        {/* TODO: Implement concept art and make each project have a slide up animation on load and category change */}
        </section>
    </main>
  );
}