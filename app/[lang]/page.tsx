'use client';

import { cubicBezier, motion } from 'motion/react';
import Divider from '@/app/components/Divider';
import { Heading1, Heading2 } from '@/app/components/Headings';
import { ReactNode } from 'react';
import { IoLogoReact } from 'react-icons/io5';
import {
    AspNetLogo,
    BlazorLogo,
    CSharpLogo,
    EduchemLogo,
    NextJSLogo
} from '@/app/components/Icons';
import {
    SiDocker,
    SiNuxtdotjs,
    SiPostgresql,
    SiPrisma,
    SiRedis,
    SiTypescript,
    SiVuedotjs
} from 'react-icons/si';
import SkillCard from '@/app/components/SkillCard';
import EducationCard from '@/app/components/EducationCard';
import Image from 'next/image';
import Link from 'next/link';
import { useDictionary } from '@/app/[lang]/DictionaryProvider';
import FlagUK from '@/public/Flag_UK.png';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { TargetAndTransition, VariantLabels } from 'motion'; 
import LinksGroup from '@/app/components/LinksGroup';
import { getLocalizedWorks } from '@/app/utilities/getLocalizedWorks';
import WorkCard from '@/app/components/WorkCard';
import FISLogo from '@/public/FIS_2_logo_neg_bez_poz_rgb.png';


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
                    <div className={'block w-full xl:w-125 2xl:w-190 text-xl text-justify col-start-2 row-start-2 row-span-2 order-5'}>
                        <p className={'whitespace-pre-wrap text-[max(16px,3vw)] sm:text-xl leading-[max(24px,4.5vw)] sm:leading-6'}>{dict.home.about_me.paragraph}</p>
                        <Heading2 className={'mt-8'}>{dict.home.about_me.education.title}</Heading2>
                        <div className={'grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 mt-6 w-full'}>
                            <EducationCard
                                icon={<Image src={FISLogo} width={44} height={44} alt={'FIS Logo'} className={'object-contain'}/>}
                                title={dict.home.about_me.education.bachelor_degree}
                                institution={'VŠE - IVWT'}
                                period={`2026 - ${dict.components.skill_card.present}`}
                                href={'https://fis.vse.cz/bakalarske-studium/bakalarske-programy/informacni-veda-a-webove-technologie/'}
                            />
                            <EducationCard
                                icon={<EduchemLogo className={'h-full w-full object-contain'}/>}
                                title={dict.home.about_me.education.high_school}
                                institution={'Educhem'}
                                period={'2022 - 2026'}
                                href={'https://www.educhem.cz/'}
                            />
                            <EducationCard
                                icon={<Image src={FlagUK} width={44} height={44} alt={'UK Flag'} className={'object-contain'}/>}
                                title={'Cambridge'}
                                institution={dict.home.about_me.education.fce_certificate}
                                period={'2024'}
                                href={'https://www.cambridge.org/'}
                            />
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
                <div className={'container mx-auto mt-32 mb-24'}>
                    <Heading1 className={'mb-6 sm:mb-8'}>{dict.home.skills.title}</Heading1>

                    <div>
                        <div className={'flex flex-col gap-10 sm:gap-16'}>
                            <div>
                                <div className={'flex items-baseline gap-3 mb-6 pb-2 border-b border-alt-gray-200/60'}>
                                    <Heading2>
                                        {dict.home.skills.frontend_fullstack}
                                    </Heading2>
                                </div>
                                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'}>
                                    <SkillCard name={'Next.js'} icon={<RiNextjsFill className={'h-full w-full'}/>} />
                                    <SkillCard name={'React'} icon={<IoLogoReact className={'text-[#58c4dc]'}/>} />
                                    <SkillCard name={'Nuxt'} icon={<SiNuxtdotjs className={'text-[#00dc82]'}/>} />
                                    <SkillCard name={'Vue'} icon={<SiVuedotjs className={'text-[#42b883]'}/>} />
                                    <SkillCard name={'TypeScript'} icon={<SiTypescript className={'text-[#3178c6]'}/>} />
                                    <SkillCard name={'Tailwind CSS'} icon={<RiTailwindCssFill className={'text-[#38bdf8]'}/>} />
                                    <SkillCard name={'Blazor'} icon={<BlazorLogo className={'h-full w-full'}/>} />
                                </div>
                            </div>

                            <div>
                                <div className={'flex items-baseline gap-3 mb-6 pb-2 border-b border-alt-gray-200/60'}>
                                    <Heading2>
                                        {dict.home.skills.backend_devops}
                                    </Heading2>
                                </div>
                                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'}>
                                    <SkillCard name={'ASP.NET Core'} icon={<AspNetLogo className={'h-full w-full text-white'}/>} />
                                    <SkillCard name={'C#'} icon={<CSharpLogo className={'h-full w-full'}/>} />
                                    <SkillCard name={'PostgreSQL'} icon={<SiPostgresql className={'text-[#4169e1]'}/>} />
                                    <SkillCard name={'Redis'} icon={<SiRedis className={'text-[#dc382d]'}/>} />
                                    <SkillCard name={'Prisma'} icon={<SiPrisma className={'text-white'}/>} />
                                    <SkillCard name={'Docker'} icon={<SiDocker className={'text-[#2496ed]'}/>} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
                <div className={`container mx-auto relative mt-32 ${works.filter(w => w.featured).length % 2 === 0 && 'mb-32'}`}>
                    <Heading1>{dict.home.main.navigation.works}</Heading1>
                    <div className={'2xl:grid grid-cols-2 gap-x-24 gap-y-24 2xl:[&>*:nth-child(even)]:-translate-y-64! 2xl:[&>*:last-child:nth-child(odd)]:col-start-2 2xl:[&>*:last-child:nth-child(odd)]:-translate-y-64! 2xl:translate-y-30 mt-10 sm:mt-16 mb-24 lg:my-24 2xl:my-0 flex flex-col items-center'}>
                        {works.map((work => (
                            work.featured && (
                                <WorkCard
                                    work={work as never}
                                    key={work.id}
                                    style={{
                                        background: work.background,
                                    }}
                                    dynamicHeight
                                />
                            )
                        )))}
                    </div>
                    <div className={'mt-52 flex flex-col items-center mb-32 p-4 bg-linear-to-tr from-alt-gray-200 to-[hsl(0_0%_21%)] py-16 bg-diagonal-stripes stripes-color-[hsl(0,0%,19%)] stripes-size-5 border-[6px] border-alt-gray-200'}>
                        <span className={'text-4xl lg:text-5xl font-heading font-bold text-center'}>{dict.home.works.more_cta.top}</span>
                        <Link className={'text-xl lg:text-2xl font-semibold bg-aero-500 text-white px-8 py-4 mt-8 shadow-md text-center'} href={'/works'}>{dict.home.works.more_cta.bottom}</Link>
                    </div>
                </div>
                <Divider/>
            </section>
        );

    }

}

