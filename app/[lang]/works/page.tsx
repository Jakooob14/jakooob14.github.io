'use client';

import { Heading1 } from '@/app/components/Headings';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';
import LinksGroup from '@/app/components/LinksGroup';
import useHash from '@/app/hooks/useHash';
import WorkCard from '@/app/components/WorkCard';
import { getLocalizedWorks } from '@/app/utilities/getLocalizedWorks';
import { useState } from 'react';
import { LinkButton } from '@/app/components/Buttons';

export default function WorksPage() {
    const dict = useDictionary();
    const hash = useHash();
    
    const works = getLocalizedWorks(dict);
    
    const [resetKey, setResetKey] = useState(0);
    
  return (
    <main className={'my-24'}>
        <section className={'container mx-auto'}>
            <LinkButton href={'/'}>{dict.general.back}</LinkButton>
            <div>
                <Heading1 className={'mt-8'}>{dict.home.main.navigation.works}</Heading1>

                <LinksGroup onClick={() => setResetKey(resetKey + 1)}>
                    <LinksGroup.AnchorButton 
                        label={dict.home.works.navigation.all} href={'#'} 
                        active={hash === ''}
                        data-cursor-reset-click={false}
                    />
                    <LinksGroup.AnchorButton 
                        label={dict.home.works.navigation.web_development} 
                        href={'#web-development'} 
                        active={hash === 'web-development'}
                        data-cursor-reset-click={false}
                    />
                    <LinksGroup.AnchorButton 
                        label={dict.home.works.navigation.game_development} 
                        href={'#game-development'} 
                        active={hash === 'game-development'}
                        data-cursor-reset-click={false}
                    />
                </LinksGroup>
            </div>
            
            <ul className={'grid mt-20 gap-8 md:gap-12 lg:gap-16 grid-cols-1 xl:grid-cols-2'}>
                {works.map((work, index) => (
                    (work.category === hash || hash === '') && (
                        <li key={work.id}
                             id={work.id}
                             className={'mb-12'}>
                            <WorkCard 
                                work={work as never}
                                key={resetKey}
                                className={index % 2 === 0 ? 'justify-self-start' : 'justify-self-end'}
                            />
                        </li>
                    )
                ))}
            </ul>
        </section>
    </main>
  );
}