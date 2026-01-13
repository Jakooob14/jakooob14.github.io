'use client';

import { Heading1 } from '@/app/components/Headings';
import Link from 'next/link';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';

export default function NotFoundCatchAll(){
    const dict = useDictionary();

    return (
        <main className={'h-[calc(100vh-246px)]'}>
            <div className={'container mx-auto flex justify-center flex-col h-full'}>
                <Heading1>{dict.not_found.title}</Heading1>
                <Link href={'/'} className={'text-5xl mt-8 w-fit'}>{dict.general.home}</Link>
            </div>
        </main>
    );
}