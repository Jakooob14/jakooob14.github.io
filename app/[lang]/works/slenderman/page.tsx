'use client';

import { Heading1 } from '@/app/components/Headings';
import Tag from '@/app/components/Tag';
import { LinkButton } from '@/app/components/Buttons';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';
import { UnrealEngineLogo } from '@/app/components/Icons';
import Translate from '@/app/components/Translate';
import Link from 'next/link';

export default function Acnod(){
    const dict = useDictionary();

    return (
        <main>
            <div className={'container mx-auto my-24'}>
                <div className={'space-x-4'}>
                    <LinkButton href={'/#works'}>{dict.general.back}</LinkButton>
                    <LinkButton target={'_blank'} href={'https://git.jakooob.dev/Jakooob/slenderman-unreal'}>{dict.general.source_code}</LinkButton>
                </div>
                <Heading1 className={'mt-8'}>Slenderman</Heading1>
                <div className={'flex gap-2'}>
                    <Tag className={'!bg-aero-300 !text-aero-950 block'} icon={<UnrealEngineLogo className={'h-full w-4'}/>}>UE5</Tag>
                </div>
                <div className='mx-auto py-4 space-y-8'>
                    <section>
                        <p className='mt-2'>{dict.home.works.slenderman.details.intro.p1}</p>
                        <p className='mt-2'>{dict.home.works.slenderman.details.intro.p2}</p>
                    </section>

                    <hr className='border-gray-700' />

                    <section>
                        <h2 className='text-xl font-semibold'>{dict.home.works.slenderman.details.gameplay.title}</h2>
                        <ul className='list-disc list-inside mt-2 space-y-1'>
                            {dict.home.works.slenderman.details.gameplay.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </section>

                    <hr className='border-gray-700' />

                    <section>
                        <h2 className='text-xl font-semibold'>{dict.home.works.slenderman.details.features.title}</h2>
                        <ul className='list-disc list-inside mt-2 space-y-1'>
                            {dict.home.works.slenderman.details.features.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </section>

                    <hr className='border-gray-700' />

                    <section>
                        <h2 className='text-xl font-semibold'>{dict.home.works.slenderman.details.tech_stack.title}</h2>
                        <ul className='list-disc list-inside mt-2 space-y-1'>
                            <li><strong>{dict.home.works.slenderman.details.tech_stack.engine}</strong>: {dict.home.works.slenderman.details.tech_stack.engine_name}</li>
                            <li><strong>{dict.home.works.slenderman.details.tech_stack.language}</strong>: {dict.home.works.slenderman.details.tech_stack.language_name}</li>
                        </ul>
                    </section>

                    <hr className='border-gray-700' />

                    <section>
                        <h2 className='text-xl font-semibold'>{dict.home.works.slenderman.details.planned.title}</h2>
                        <ul className='list-disc list-inside mt-2 space-y-1'>
                            {dict.home.works.slenderman.details.planned.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <p className='mt-2'>{dict.home.works.slenderman.details.planned.note}</p>
                    </section>

                    <section>
                        <h2 className='text-xl font-semibold'>{dict.home.works.slenderman.details.learned.title}</h2>
                        <ul className='list-disc list-inside mt-2 space-y-1'>
                            {dict.home.works.slenderman.details.learned.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </section>

                    <hr className='border-gray-700' />

                    <section>
                        <h2 className='text-xl font-semibold'>{dict.home.works.slenderman.details.play.title}</h2>
                        <p className='mt-2'>
                            <Translate
                                value={dict.home.works.slenderman.details.play.text}
                                components={{
                                    link1: <Link href='#' />,
                                    link2: <Link href='#' />
                                }}
                            />
                        </p>
                    </section>

                    <hr className='border-gray-700' />

                    <section>
                        <h2 className='text-xl font-semibold'>{dict.home.works.slenderman.details.license.title}</h2>
                        <p className='mt-2'>
                            <Translate value={dict.home.works.slenderman.details.license.text} components={{ strong: <strong/> }} />
                        </p>
                    </section>

                    <section>
                        <h2 className='text-xl font-semibold'>{dict.home.works.slenderman.details.credits.title}</h2>
                        <p className='mt-2 whitespace-pre-wrap'>
                            <Translate value={dict.home.works.slenderman.details.credits.text} components={{ link: <Link href='#' /> }} />
                        </p>
                        <p className='mt-2 font-semibold'>{dict.home.works.slenderman.details.credits.assets}</p>
                        <ul className='list-disc list-inside mt-1 space-y-1'>
                            {dict.home.works.slenderman.details.credits.list.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </section>
                </div>

            </div>
        </main>
    );
}
