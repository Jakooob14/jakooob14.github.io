'use client'

import { Heading1, Heading2 } from '@/app/components/Headings';
import Image from 'next/image';
import { Suspense } from 'react';
import Loader from '@/app/components/Loader';
import Tag from '@/app/components/Tag';
import { SiI18Next, SiNextdotjs } from 'react-icons/si';
import { LinkButton } from '@/app/components/Buttons';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';

export default function Acnod(){
    const dict = useDictionary();

    return (
        <main>
            <div className={ 'container mx-auto my-24' }>
                <LinkButton href={ '/#works' }>{dict.general.back}</LinkButton>
                <Heading1 className={ 'mt-8' }>Nagy3D</Heading1>
                <p className={ 'my-4' }>
                    {dict.home.works.nagy3d.description}
                </p>
                <div className={ 'flex gap-2' }>
                    <Tag className={ '!bg-aero-300 !text-aero-950' } icon={ <SiNextdotjs/> }>NextJS</Tag>
                    <Tag icon={ <SiI18Next/> }>I18Next</Tag>
                </div>
                <div>
                    <div className={ 'my-8' }>
                        <Heading2 className={ 'mb-4' }>{dict.work.pages.home}</Heading2>
                        <Suspense fallback={ <Loader/> }>
                            <Image src={ '/works/nagy3dcz/nagy3dcz-home.png' } alt={ 'Home page' } width={ 1600 } height={ 1972 }/>
                        </Suspense>
                    </div>
                    <div className={ 'my-8' }>
                        <Heading2 className={ 'mb-4' }>{dict.work.pages.services}</Heading2>
                        <Suspense fallback={ <Loader/> }>
                            <Image src={ '/works/nagy3dcz/nagy3dcz-services.png' } alt={ 'Home page' } width={ 1600 } height={ 1972 }/>
                        </Suspense>
                    </div>
                    <div className={ 'my-8' }>
                        <Heading2 className={ 'mb-4' }>{dict.work.pages.about}</Heading2>
                        <Suspense fallback={ <Loader/> }>
                            <Image src={ '/works/nagy3dcz/nagy3dcz-about.png' } alt={ 'Home page' } width={ 1600 } height={ 1972 }/>
                        </Suspense>
                    </div>
                    <div className={ 'my-8' }>
                        <Heading2 className={ 'mb-4' }>{dict.work.pages.contact}</Heading2>
                        <Suspense fallback={ <Loader/> }>
                            <Image src={ '/works/nagy3dcz/nagy3dcz-contact.png' } alt={ 'Home page' } width={ 1600 } height={ 1972 }/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    )
}