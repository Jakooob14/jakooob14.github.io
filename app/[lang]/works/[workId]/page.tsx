import { works } from '@/app/data/works';
import NotFoundCatchAll from '@/app/[lang]/[...notFound]/page';
import { getLocalizedWorks } from '@/app/utilities/getLocalizedWorks';
import { getDictionary } from '@/app/[lang]/getDictionary';
import Translate from '@/app/components/Translate';
import Link from 'next/link';
import { Heading1, Heading2 } from '@/app/components/Headings';
import { LinkButton } from '@/app/components/Buttons';
import { WorkIcon, WorkLinkIconButton } from '@/app/components/WorkCard';
import Divider from '@/app/components/Divider';
import Lightbox from '@/app/components/lightbox/Lightbox';
import { LightboxItem } from '@/app/components/lightbox/LightboxItem';
import TechnologyTag from '@/app/components/TechnologyTag';
import { redirect } from 'next/navigation';

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
    
    if (work.redirectUrl) redirect(work.redirectUrl);
    
    return (
        <main>
            <div className={'container mx-auto my-24'}>
                <LinkButton href={'/works'}>{dict.general.back}</LinkButton>
                <section>
                    <div className={'flex items-end gap-2'}>
                        <Heading1 className={'mt-4'}>{work.title}</Heading1>
                        <span className={'text-xl mb-1.5 text-alt-gray-400 tracking-wider font-semibold'}>2023</span>
                    </div>
                    <Heading2 className={'text-3xl! font-semibold'}>{dict.home.works.categories[work.category]}</Heading2>
                    <ul className={'flex gap-2 mt-3'}>
                        {
                            work.technologies && work.technologies.length > 0 && work.technologies.map((tech, index) => (
                                    <li key={index}>
                                        <TechnologyTag
                                            technology={tech}
                                            type={index === 0 ? 'primary' : 'secondary'}
                                        />
                                    </li>
                                ))
                        }
                    </ul>
                    <p className={'mb-4 mt-2'}>
                        <Translate value={work.description || ''} components={{ link: <Link href={'#'}/> }}/>
                    </p>
                    <ul className={'flex items-center gap-4'}>
                        {work.links && work.links.length > 0 && work.links?.map((link, index) => (
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
                                                link.type === 'source-code' ? dict.general.source_code
                                                    : link.type === 'download' ? dict.general.download
                                                        : link.type === 'website' ? dict.general.website
                                                            : dict.general.learn_more
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
                    <div className={'mt-4'}>
                        <Lightbox>
                            {
                                work.media?.[0] && (
                                    <LightboxItem
                                        src={work.media[0].url}
                                        width={1200}
                                        alt={work.media[0].alt || ''}
                                        className={'w-full! h-full!'}
                                        imageClassName={'w-full! shadow-lg h-full!'}
                                    />
                                )
                            }
                            <ul className={'grid grid-cols-2 md:grid-cols-3 gap-4 mt-8'}>
                                {work.media && work.media.length > 1 && work.media?.map((medium, index) => {
                                        if (index === 0) return null;
                                        return (
                                            <li
                                                key={index}
                                                className={''}
                                            >
                                                <LightboxItem
                                                    src={medium.url}
                                                    width={600}
                                                    alt={medium.alt || ''}
                                                />
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </Lightbox>
                    </div>
                </section>
            </div>
        </main>
    );
}
