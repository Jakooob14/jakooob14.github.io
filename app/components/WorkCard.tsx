import { Heading2, Heading3 } from '@/app/components/Headings';
import Translate from '@/app/components/Translate';
import Link from 'next/link';
import { FaGitAlt } from 'react-icons/fa6';
import { HTMLAttributes } from 'react';
import { LinkButton } from '@/app/components/Buttons';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';

interface WorkCardProps extends HTMLAttributes<HTMLDivElement> {
    work: {
        id: string;
        title: string;
        category: 'web-development' | 'game-development' | 'other';
        description: string;
        links?: {
            type: 'source-code';
            url: string;
        }[];
    };
}

export default function WorkCard({
    work,
    className = ''
}: WorkCardProps
) {
    const dict = useDictionary();
    
    const CATEGORY_LABELS = {
        'web-development': 'Web Development',
        'game-development': 'Game Development',
        'other': 'Other',
    } as const;

    const categoryVisible = CATEGORY_LABELS[work.category];
    
    return (
        <div className={'bg-linear-to-br from-[hsl(0,0%,10%)] to-[hsl(0,0%,12%)] from-0% to-70% min-w-[700px] w-[700px] max-w-150 h-225 flex flex-col justify-between shadow-xl ' + className}>
            <section className={'flex flex-col justify-between m-20 mb-0'}>
                <section>
                    <div className={'mb-4'}>
                        <Heading2 className={'text-2xl font-semibold'}>{work.title}</Heading2>
                        <Heading3 className={'text-xl font-semibold mt-1'}>{categoryVisible}</Heading3>
                    </div>
                    <p className={'min-h-[150px]'}>
                        <Translate value={work.description} components={{ link: <Link href={'#'}/> }}/>
                    </p>
                </section>
                <section className={'flex justify-between items-center mt-8'}>
                    <ul className={'flex'}>
                        {work.links && work.links.map((link, index) => (
                            <li key={index} className={'mt-2'}>
                                <Link
                                    href={link.url}
                                    target={'_blank'}
                                    rel={'noopener noreferrer'}
                                    className={'p-1 w-8 h-8 rounded-full inline-flex items-center justify-center text-aero-400'}>
                                    {
                                        link.type === 'source-code' ? <FaGitAlt className={'w-full h-full'}/>
                                            : null
                                    }
                                </Link>
                            </li>
                        ))}
                    </ul>
                        <LinkButton href={`/works/${work.id}`}>
                            {dict.home.works.learn_more}
                        </LinkButton>
                </section>
            </section>
            <section className={'m-8 h-112.5 shadow-lg'}>
                <div className={'w-full h-full bg-alt-gray-50 overflow-hidden'}>
                </div>
            </section>
        </div>
    );
}