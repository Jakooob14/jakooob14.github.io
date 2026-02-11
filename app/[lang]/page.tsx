'use client';

import { cubicBezier, motion } from 'motion/react';
import Divider from '@/app/components/Divider';
import { Heading1, Heading2, Heading3 } from '@/app/components/Headings';
import { ReactNode, Suspense } from 'react';
import { IoLogoReact } from 'react-icons/io5';
import { SiBlazor, SiNextdotjs } from 'react-icons/si';
import {
    AspNetLogo,
    BlazorLogo, CppLogo,
    CSharpLogo,
    EduchemLogo,
    NextJSLogo,
    UnityLogo,
    UnrealEngineLogo
} from '@/app/components/Icons';
import Image from 'next/image';
import Link from 'next/link';
import { TbBrandThreejs } from 'react-icons/tb';
import Loader from '@/app/components/Loader';
import { FaGlobe, FaDownload } from 'react-icons/fa6';
import { LinkButton } from '@/app/components/Buttons';
import Tag from '@/app/components/Tag';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';
import Translate from '@/app/components/Translate';
import FlagUK from '@/public/Flag_UK.png';
import { RiTailwindCssFill } from 'react-icons/ri';
import { TargetAndTransition, VariantLabels } from 'motion'; 
import LinksGroup from '@/app/components/LinksGroup';
import { getLocalizedWorks } from '@/app/utilities/getLocalizedWorks';
import WorkCard from '@/app/components/WorkCard';


export default function Home() {
    const dict = useDictionary();
    const works = getLocalizedWorks(dict);

    return (
        <>
            <Main/>
            <AboutSection/>
            <SkillsSection/>
            <WorksSection/>
        </>
    );

    function Main(){
        const titleAnimation = {
            scaleX: 0,
            transition: {
                duration: .8,
                ease: cubicBezier(0.76, 0, 0.24, 1),
                delay: .4
            }
        };

        return (
            <main className={'h-screen bg-diagonal-stripes stripes-color-[hsl(0,0%,19%)] stripes-size-5'}>
                <div className={'relative z-0 container mx-auto flex flex-col justify-center gap-3 md:gap-12 lg:gap-24 h-full'}>

                    {/* Title */}
                    <div className={'uppercase font-[760] inline-flex items-center justify-center w-full'}>
                        <div
                            className={'relative inline-block text-[21vw] md:text-[160px] lg:text-[200px] xl:text-[240px] 2xl:text-[280px] w-full'}>
                              <span className={'block relative'}>
                                  <div className={'ms-2'}>
                                      <h2 className={'text-[5vw] md:text-4xl text-alt-gray-500 font-extrabold'}>{dict.home.main.subtitle}</h2>
                                  </div>
                                  <motion.div
                                      className={'absolute w-[calc(100%+.1em)] h-full bg-aero-500 top-0 origin-left -ms-[.05em]'}
                                      animate={titleAnimation}>
                                  </motion.div>
                              </span>
                            <h1 className={'relative grid grid-cols-[repeat(5,auto)] gap-x-0 lg:gap-x-4 xl:gap-x-10 2xl:gap-x-16 w-full'}>
                                {
                                    Array.from('JakubSokol').map((letter, index) => {
                                        return <span key={index}
                                                     className={`${index === 4 || index === 9 ? 'w-[.65em]' : ''} ${index === 6 ? '-ms-[.03em]' : ''} ${index >= 5 ? 'pb-10' : ''} ${index === 0 ? 'ms-[.08em]' : ''} leading-[calc(1em-10%)]`}>{letter}</span>;
                                    })
                                }
                                <motion.div
                                    className={'absolute top-0 left-0 w-[calc(100%+.1em)] h-full grid grid-cols-5 -ms-[.05em]'}>
                                    {
                                        Array(2).fill(0).map((_, index) => (
                                            <motion.div key={index}
                                                        animate={{
                                                            ...titleAnimation,
                                                            transition: {
                                                                ...titleAnimation.transition,
                                                                delay: index / 11 + titleAnimation.transition.delay
                                                            }
                                                        }}
                                                        className={`col-span-full bg-aero-500 h-full origin-left ${index === 1 ? 'pb-10' : ''}`}
                                                        data-delay={index * 200 + 100}>
                                            </motion.div>
                                        ))
                                    }
                                </motion.div>
                            </h1>
                        </div>
                    </div>
                    <LinksGroup>
                        <LinksGroup.LinkButton 
                            label={dict.home.main.navigation.about_me} 
                            href={'#about'}
                            data-cursor-reset-click
                        />
                        <LinksGroup.LinkButton 
                            label={dict.home.main.navigation.skills} 
                            href={'#skills'}
                            data-cursor-reset-click
                        />
                        <LinksGroup.LinkButton 
                            label={dict.home.main.navigation.works} 
                            href={'#works'}
                            data-cursor-reset-click
                        />
                        <LinksGroup.LinkButton 
                            label={dict.home.main.navigation.contact} 
                            href={'#contact'}
                            data-cursor-reset-click
                        />
                    </LinksGroup>
                </div>
            </main>
        );
    }

    function AboutSection() {
        return (
            <section className={'bg-alt-gray-primary shadow-[0px_0px_30px_-2px_rgba(0,0,0,.15)]'} id={'about'}>
                <Divider/>
                <div className={'container mx-auto flex flex-col xl:grid grid-cols-2 xl:grid-rows-[auto,auto,auto] my-32'}>
                    <Heading1>{dict.home.about_me.title}</Heading1>
                    {/*<HiddenText className={'text-8xl text-right font-heading'}>Hey there!</HiddenText>*/}
                    <div className={'block w-full xl:w-125 2xl:w-175 text-xl text-justify col-start-2 row-start-2 row-span-2 order-5'}>
                        <p className={'whitespace-pre-wrap text-[max(16px,3vw)] sm:text-xl leading-[max(24px,4.5vw)] sm:leading-6'}>{dict.home.about_me.paragraph}</p>
                        <Heading2 className={'mt-8'}>{dict.home.about_me.education.title}</Heading2>
                        <div className={'text-start w-full flex flex-wrap'}>
                            <SkillCard className={'py-6!'} skillIcon={<EduchemLogo className={'h-full'}/>}
                                       startYear={2021}
                                       endYear={2025}><span
                                className={'block text-xl'}>{dict.home.about_me.education.high_school}</span>Educhem</SkillCard>
                            <SkillCard className={'py-6!'} skillIcon={<Image src={FlagUK} width={70} height={48} alt={'UK Flag'}/>}
                                       totalOverride={'2024'}><span
                                className={'block text-xl'}>Cambridge</span>{dict.home.about_me.education.fce_certificate}</SkillCard>
                        </div>
                    </div>
                    <div className={'mb-10 row-span-2 w-[50%] xl:w-[80%] order-1'}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 321.1 227.3'
                            style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'visible'
                            }}
                        >
                            <defs>
                                <style>
                                    {'.cls-1 { fill: #19b9e6; stroke-width: 0px; }'}
                                </style>
                            </defs>
                            <motion.polygon
                                className='cls-1'
                                points='214.6 0 175 224.9 0 78.1 214.6 0'
                                initial={{ opacity: 0, y: -100, scale: .5, rotate: 15 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                                viewport={{ once: true, amount: .5 }}
                                transition={{ duration: 1, ease: 'anticipate' }}
                            />
                            <motion.polygon
                                className='cls-1'
                                points='188.5 227.3 213 88.3 321.1 179 188.5 227.3'
                                initial={{ opacity: 0, scale: .5, x: 100 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true, amount: .5 }}
                                transition={{ duration: 1, ease: 'anticipate', delay: .3 }}
                            />
                            <motion.polygon
                                className='cls-1'
                                points='303.8 47.9 288.7 133.8 221.8 77.8 303.8 47.9'
                                initial={{ opacity: 0, scale: .5, rotate: -30, x: -50 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                                viewport={{ once: true, amount: .5 }}
                                transition={{ duration: 1.2, ease: 'anticipate', delay: .6 }}
                            />
                        </svg>
                    </div>
                </div>
                <Divider/>
            </section>
        );
    }

    function SkillsSection() {
        return (
            <section id={'skills'}>
                <div className={'container mx-auto mt-32 mb-16'}>
                    <Heading1 className={'sm:mb-16'}>{dict.home.skills.title}</Heading1>
                    <div className={'flex flex-col'}>
                        <div className={'mb-5'}>
                            <Heading2>{dict.home.skills.web_development}</Heading2>
                            <div className={'flex flex-wrap flex-col sm:flex-row'}>
                                <SkillCard className={'w-1/3! min-w-50'} skillIcon={<NextJSLogo className={'h-full'}/>} startYear={2021}
                                           level={3}>Next.js</SkillCard>
                                <SkillCard className={'w-1/3! min-w-50'} skillIcon={<IoLogoReact className={'text-[#58c4dc]'}/>} startYear={2021}
                                           level={3}>React</SkillCard>
                                <SkillCard className={'w-1/3! min-w-50'} skillIcon={<RiTailwindCssFill className={'h-full text-[#3cbfff]'}/>} startYear={2022}
                                           level={3}>Tailwind CSS</SkillCard>
                                <SkillCard className={'w-1/3! min-w-50'} skillIcon={<BlazorLogo className={'h-full'}/>}
                                           level={1}>Blazor</SkillCard>
                                <SkillCard className={'w-1/3! min-w-50'} skillIcon={<AspNetLogo className={'h-full text-white'}/>}
                                           level={1}>ASP.NET</SkillCard>
                            </div>
                        </div>
                        <Divider className={'mb-10'}/>
                        <div className={'mb-5'}>
                            <Heading2>{dict.home.skills.game_development}</Heading2>
                            <div className={'flex flex-wrap flex-col sm:flex-row'}>
                                <SkillCard className={'w-1/3! min-w-50'} skillIcon={<UnrealEngineLogo className={'h-full'}/>} yearsOverride={1} level={1}>Unreal
                                    Engine</SkillCard>
                                <SkillCard className={'w-1/3! min-w-50'} skillIcon={<UnityLogo className={'h-full'}/>} yearsOverride={1}
                                           level={1}>Unity</SkillCard>
                                <SkillCard className={'w-1/3! min-w-50'} skillIcon={<Image className={'h-full w-fit'} src={'/works/raylib-games/raylib-logo.png'} alt={'Raylib logo'} width={48} height={48}/>}
                                           level={1}>raylib</SkillCard>
                            </div>
                        </div>
                        {/*<Divider className={'mb-10'}/>*/}
                        {/*<div>*/}
                        {/*    <Heading2>{dict.home.skills.other}</Heading2>*/}
                        {/*    <div className={'flex flex-wrap flex-col sm:flex-row'}>*/}
                        {/*        <SkillCard className={'w-1/3! min-w-50'} skillIcon={<CSharpLogo className={'h-full'}/>} yearsOverride={4} level={3}>C#</SkillCard>*/}
                        {/*        <SkillCard className={'w-1/3! min-w-50'} skillIcon={<CppLogo className={'h-full'}/>} yearsOverride={1} level={2}>C++</SkillCard>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </section>
        );

    }

    interface SkillCardProps {
        children: ReactNode,
        skillIcon: ReactNode,
        startYear?: number,
        endYear?: number,
        yearsOverride?: number,
        totalOverride?: string,
        level?: number,
        className?: string
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function SkillCard({ children, skillIcon, startYear, endYear, yearsOverride, totalOverride, level, className }: SkillCardProps) {
        // function getYearsFromYear(year: number) {
        //     const yearsFromYear = new Date();
        //     yearsFromYear.setFullYear(yearsFromYear.getFullYear() - year);
        //     return yearsFromYear.getFullYear();
        // }

        // const levels = [dict.components.skill_card.level.novice, dict.components.skill_card.level.beginner, dict.components.skill_card.level.intermediate, dict.components.skill_card.level.proficient, dict.components.skill_card.level.expert, dict.components.skill_card.level.master];
        // const yearsFromYear = startYear ? getYearsFromYear(startYear) : 0;

        // Does the right wording for 'year(s)'
        // const year = yearsOverride ? (yearsOverride === 1 ? '1 ' + dict.components.skill_card.year : yearsOverride < 5 ? yearsOverride + ' ' + dict.components.skill_card.years_less_than_5 : yearsOverride + ' ' + dict.components.skill_card.years) : endYear ? `${startYear} ${dict.components.skill_card.to} ${endYear}` : `${startYear ? (yearsFromYear === 0 ? '' : yearsFromYear === 1 ? '1 ' + dict.components.skill_card.year : yearsFromYear < 5 ? yearsFromYear + ' ' + dict.components.skill_card.years_less_than_5 : yearsFromYear + ' ' + dict.components.skill_card.years) : ''}`;

        return (
            <div className={'flex flex-col gap-1 w-60 py-4 sm:py-10 ' + className}>
                <span className={'text-5xl mb-2 text-yellow-300# h-12'}>{skillIcon}</span>
                <h2 className={'text-[max(20px,4.6vw)] sm:text-3xl font-medium'}>{children}</h2>
                {/*<span*/}
                {/*    className={'text-alt-gray-600 text-[max(16px,2.8vw)] sm:text-lg'}>{totalOverride ? totalOverride : year /*+ (year && level !== undefined ? ' - ' : '') + (level !== undefined ? levels[level] : '')*!/</span>*/}
            </div>
        );
    }

    function WorksSection(){
        interface WorkCardProps{
            children: ReactNode,
            className?: string,
            imageClassName?: string,
            title: string,
            subtitle?: string,
            tags?: ReactNode
            imagePath: string,
            learnMoreHref?: string,
            websiteHref?: string,
            websiteTitle?: string,
            websiteIcon?: ReactNode,
            initial?: boolean | VariantLabels | TargetAndTransition
        }

        return (
            <section className={'bg-alt-gray-primary shadow-[0px_0px_30px_-2px_rgba(0,0,0,.15)] overflow-x-hidden'} id={'works'}>
                <Divider/>
                <div className={`container mx-auto relative px-0 mt-32 ${works.filter(w => w.featured).length % 2 === 0 && 'mb-32'}`}>
                    <Heading1>{dict.home.works.title}</Heading1>
                    <div className={'2xl:grid grid-cols-2 gap-x-24 gap-y-24 2xl:[&>*:nth-child(even)]:-translate-y-64! 2xl:[&>*:last-child:nth-child(odd)]:col-start-2 2xl:[&>*:last-child:nth-child(odd)]:-translate-y-64! 2xl:translate-y-30 my-24 2xl:my-0 flex flex-col items-center'}>
                        {works.map((work => (
                            work.featured && (
                                <WorkCard
                                    work={work as never}
                                    key={work.id}
                                    style={{
                                        background: work.background,
                                    }}
                                />
                            )
                        )))}
                    </div>
                    <div className={'flex flex-col items-center mb-32 bg-linear-to-tr from-alt-gray-200 to-[hsl(0_0%_21%)] py-16 bg-diagonal-stripes stripes-color-[hsl(0,0%,19%)] stripes-size-5 border-[6px] border-alt-gray-200'}>
                        <span className={'text-5xl font-heading font-bold'}>There&#39;s even more to see!</span>
                        <Link className={'text-2xl font-semibold bg-aero-500 text-white px-8 py-4 mt-8 shadow-md'} href={'/works'}>View all my work</Link>
                        {/*  TODO: translations  */}
                    </div>
                </div>
                <Divider/>
            </section>
        );

    }

}

