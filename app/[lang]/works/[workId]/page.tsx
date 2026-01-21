import { translateWorkCategory, works } from '@/app/data/works';
import NotFoundCatchAll from '@/app/[lang]/[...notFound]/page';
import { getLocalizedWorks } from '@/app/utilities/getLocalizedWorks';
import { getDictionary } from '@/app/[lang]/getDictionary';
import Translate from '@/app/components/Translate';
import Link from 'next/link';
import { Heading1, Heading2, Heading3 } from '@/app/components/Headings';
import { LinkButton } from '@/app/components/Buttons';
import Image from 'next/image';
import { FaDownload, FaGitAlt, FaGlobe } from 'react-icons/fa6';
import { WorkIcon, WorkLinkIconButton } from '@/app/components/WorkCard';
import Divider from '@/app/components/Divider';
import { HTMLAttributes } from 'react';
import Lightbox from '@/app/components/lightbox/Lightbox';
import { LightboxItem } from '@/app/components/lightbox/LightboxItem';

export function generateStaticParams() {
    return works.map(work => ({
        id: work.id
    }));
}

interface PageProps {
    params: {
        lang: string;
        workId: string;
    };
}

export default async function IndividualWorkPage({ params }: PageProps) {
    const { workId, lang } = await params;
    
    const dict = await getDictionary(lang);
    const work = getLocalizedWorks(dict).find(w => w.id === workId);
    
    if (!work) return <NotFoundCatchAll/>;
    
    return (
        <main>
            <div className={'container mx-auto my-24'}>
                <LinkButton href={'/works'}>{dict.general.back}</LinkButton>
                <section>
                    <div className={'flex items-end gap-2'}>
                        <Heading1 className={'mt-4 p-0!'}>{work.title}</Heading1>
                        <span className={'text-xl mb-1.5 text-alt-gray-400 tracking-wider font-semibold'}>2023</span>
                    </div>
                    <Heading2 className={'text-3xl! font-semibold'}>{translateWorkCategory(work.category)}</Heading2>
                    <p className={'my-5'}>
                        <Translate value={work.description || ''} components={{ link: <Link href={'#'}/> }}/>
                    </p>
                    <ul className={'flex items-center gap-4'}>
                        {work.links?.map((link, index) => (
                            <li key={index} className={'flex items-center'}>
                                {
                                    index === 0 ? (
                                        <LinkButton
                                            href={link.url}
                                            target={link.openInNewTab || link.openInNewTab === undefined ? '_blank' : '_self'}
                                            rel={'noopener noreferrer'}
                                            title={link.popupText}
                                            className={'flex items-center justify-center w-fit gap-2 py-2'}
                                        >
                                            <div className={'w-6 h-6'}>
                                                <WorkIcon type={link.type} />
                                            </div>
                                            {
                                                link.type === 'source-code' ? 'Source Code'
                                                    : link.type === 'download' ? 'Download'
                                                        : link.type === 'website' ? (
                                                            'Website'
                                                        ) : 'Learn More'
                                            }
                                        </LinkButton>
                                    ) : (
                                        <WorkLinkIconButton link={link} />
                                    )
                                }
                            </li>
                        ))}
                    </ul>
                </section>
                <Divider className={'my-6'}/>
                <section>
                    <Heading2 className={'mt-4'}>Gallery</Heading2>
                    <div className={'mt-4'}>
                        {work.media?.[0] && (
                            <Medium
                                type={work.media[0].type}
                                url={work.media[0].url}
                                alt={work.media[0].alt || 'Medium 1'}
                                className={'w-full'}
                                mediumClassName={'w-full m-8 shadow-lg'}
                            />
                        )}
                        <Lightbox>
                            {work.media && work.media.length > 1 && work.media?.map((medium, index) => {
                                    if (index === 0) return null;
                                    return (
                                        <LightboxItem 
                                            src={medium.url} 
                                            width={600} 
                                            alt={medium.alt || `Medium ${index + 1}`} 
                                            key={index}
                                        />
                                    );
                                }
                            )}
                        </Lightbox>
                    </div>
                </section>
            </div>
        </main>
    );
}

interface MediumProps extends HTMLAttributes<HTMLDivElement> {
    type: 'image' | 'video';
    url: string;
    alt?: string;
    mediumClassName?: string;
}

function Medium({ type, url, alt, className, mediumClassName }: MediumProps) {
    if (type === 'image') {
        return (
            <div className={className}>
                <Image
                    src={url}
                    alt={alt || ''}
                    className={'max-w-full h-auto ' + mediumClassName}
                    width={800}
                    height={800}
                />
            </div>
        );
    }
    
    if (type === 'video') {
        return (
            <div>
                <video controls className={'max-w-full h-auto ' + mediumClassName}>
                    <source src={url} type='video/mp4'/>
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }
    
    return null;
}