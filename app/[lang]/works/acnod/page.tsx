'use client';

import { Heading1, Heading2 } from '@/app/components/Headings';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import Loader from '@/app/components/Loader';
import Tag from '@/app/components/Tag';
import { SiI18Next, SiNextdotjs } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import { LinkButton } from '@/app/components/Buttons';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';
import Translate from '@/app/components/Translate';

export default function Acnod(){
    const dict = useDictionary();

    return (
        <main>
            <div className={'container mx-auto my-24'}>
                <LinkButton href={'/#works'}>{dict.general.back}</LinkButton>
                <Heading1 className={'mt-8'}>Acnod</Heading1>
                <p className={'my-4'}>
                    <Translate value={dict.home.works.acnod.description} components={{ link: <Link href={'#'}/> }}/>
                </p>
                <div className={'flex gap-2'}>
                    <Tag className={'bg-aero-300! text-aero-950!'} icon={<SiNextdotjs/>}>NextJS</Tag>
                    <Tag icon={<TbBrandThreejs/>}>ThreeJS</Tag>
                    <Tag icon={<SiI18Next/>}>I18Next</Tag>
                </div>
                <div className={'my-8'}>
                    <Heading2 className={'mb-4'}>{dict.work.pages.home}</Heading2>
                    <Suspense fallback={<Loader/>}>
                        <Image src={'/works/acnodnet/acnodnet-Home.png'} alt={'Home page'} width={1600} height={1972}/>
                    </Suspense>
                </div>
            </div>
        </main>
    );
}