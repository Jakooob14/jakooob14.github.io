import { Heading2, Heading3 } from '@/app/components/Headings';
import Translate from '@/app/components/Translate';
import Link from 'next/link';
import { FaDownload, FaGitAlt, FaGlobe } from 'react-icons/fa6';
import { HTMLAttributes } from 'react';
import { LinkButton } from '@/app/components/Buttons';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';
import { Work, WorkLink, WorkLinkType } from '@/app/data/works';
import { cubicBezier, motion } from 'motion/react';
import Image from 'next/image';

interface WorkExtended extends Work {
    title: string;
    brief: string;
}

interface WorkCardProps extends HTMLAttributes<HTMLDivElement> {
    work: WorkExtended;
    dynamicHeight?: boolean;
}

export default function WorkCard({
    work,
    className = '',
    style,
    dynamicHeight = false,
}: WorkCardProps
) {
    const dict = useDictionary();
    
    return (
        <motion.div
            initial={{
                translateY: '5%',
                opacity: 0
            }}
            whileInView={{
                translateY: 0,
                opacity: 1,
                transition: {
                    duration: .5,
                    ease: cubicBezier(0.76, 0, 0.24, 1),
                }
            }}
            viewport={{ once: true }}
            className={'bg-linear-to-br from-[hsl(0,0%,10%)] to-[hsl(0,0%,12%)] from-0% to-70% lg:min-w-[700px] max-w-150 flex flex-col justify-between shadow-xl xl:min-h-225 ' + className}
            style={style}
        >
            <section className={'flex flex-col justify-between m-10 sm:m-15 xl:m-20 mb-4! min-h-[300px]'}>
                <section>
                    <div className={'mb-4'}>
                        <Heading2 className={'font-semibold'}>{work.title || 'Untitled'}</Heading2>
                        <Heading3 className={'font-semibold -mt-2 lg:mt-1'}>{dict.home.works.categories[work.category]}</Heading3>
                    </div>
                    <p>
                        <Translate value={work.brief || ''} components={{ link: <Link href={'#'}/> }}/>
                    </p>
                </section>
                <section className={'flex justify-between lg:items-center mt-8 flex-col lg:flex-row gap-y-3'}>
                    <ul className={'flex'}>
                        {work.links && work.links.map((link, index) => (
                            <li key={index} className={'rounded-full'}>
                                <WorkLinkIconButton link={link}/>
                            </li>
                        ))}
                    </ul>
                        <LinkButton 
                            href={work.redirectUrl || `/works/${work.id}`} 
                            rel={'noreferrer'}
                            target={work.redirectUrl ? '_blank' : '_self'}
                            className={'w-fit'}
                        >
                            {dict.general.learn_more}
                        </LinkButton>
                </section>
            </section>
            <section className={'m-8 shadow-lg xl:h-112.5'}>
                <div className={'w-full h-full bg-alt-gray-50 overflow-hidden'}>
                    {work.media && work.media.length > 0 && work.media[0].type === 'image' && (
                        <Image
                            src={work.media[0].url}
                            alt={work.media[0].alt || work.title || 'Work Image'}
                            className={'w-full h-full object-cover'}
                            width={700}
                            height={700}
                        />
                    )}
                </div>
            </section>
        </motion.div>
    );
}

interface WorkLinkButtonProps extends HTMLAttributes<HTMLAnchorElement> {
    link: WorkLink;
}


export function WorkLinkIconButton({ link, className, ...props }: WorkLinkButtonProps) {
    return (
        <Link
            href={link.url}
            target={link.openInNewTab || link.openInNewTab === undefined ? '_blank' : '_self'}
            rel={'noopener noreferrer'}
            className={'p-1 w-9 h-9 rounded-full inline-flex items-center justify-center text-aero-400 ' + className}
            title={link.popupText}
            {...props}
        >
            <WorkIcon type={link.type} className={'rounded-full overflow-visible'} />
        </Link>
    );
}

interface WorkIconProps extends HTMLAttributes<HTMLDivElement> {
    type: WorkLinkType;
}

export function WorkIcon({ type, className }: WorkIconProps) {
    return (
        <>
            {
                type === 'source-code' ? <FaGitAlt className={'w-full h-full ' + className} />
                    : type === 'download' ? <FaDownload className={'w-full h-full p-0.5 ' + className}/>
                        : type === 'website' ? <FaGlobe className={'w-full h-full p-0.5 ' + className} /> 
                            : null
            }
        </>
    );
}