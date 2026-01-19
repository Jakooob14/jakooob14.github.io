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
                    <Heading1 className={'mt-4'}>{work.title}</Heading1>
                    <Heading2 className={'text-3xl! font-semibold -mt-2'}>{translateWorkCategory(work.category)}</Heading2>
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
                <section>
                    <Heading2 className={'mt-4'}>Gallery</Heading2>
                    <ul>
                        {work.media?.map((medium, index) => (
                            <li key={index} className={'my-8'}>
                                {medium.type === 'image' && (
                                    <Image 
                                        src={medium.url} 
                                        alt={medium.alt || `Media ${index + 1}`} 
                                        className={'max-w-full h-auto'}
                                        width={800}
                                        height={800}
                                    />
                                )}
                                {medium.type === 'video' && (
                                    <video controls className={'max-w-full h-auto'}>
                                        <source src={medium.url} type='video/mp4'/>
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}