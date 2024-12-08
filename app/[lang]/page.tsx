'use client'

import {cubicBezier, motion} from "motion/react";
import Divider from "@/app/components/Divider";
import {Heading1, Heading2} from "@/app/components/Headings";
import {ReactNode, Suspense} from "react";
import {IoLogoReact} from "react-icons/io5";
import {SiNextdotjs} from "react-icons/si";
import {EduchemLogo, GodotLogo, NextJSLogo, SassSeal, UnityLogo, UnrealEngineLogo} from "@/app/components/Icons";
import Image from "next/image";
import Link from "next/link";
import {TbBrandCpp, TbBrandCSharp, TbBrandThreejs} from "react-icons/tb";
import Loading from "@/app/loading";
import {FaGlobe} from "react-icons/fa6";
import {LinkButton} from "@/app/components/Buttons";
import Tag from "@/app/components/Tag";
import {useDictionary} from "@/app/[lang]/DictionaryProvider";
import Translate from "@/app/components/Translate";


export default function Home() {
    const dict = useDictionary();

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
            <main className={'h-screen bg-alt-gray-primary bg-gridPattern bg-[length:200px] bg-[left_35px_top_20px]'}>
                <div className={'relative z-0 container mx-auto flex flex-col justify-center gap-3 md:gap-12 lg:gap-24 h-full'}>

                    {/* Title */}
                    <div className={'uppercase font-[760] inline-flex items-center justify-center w-full'}>
                        <div
                            className={'relative inline-block text-[21vw] md:text-[180px] lg:text-[220px] xl:text-[260px] 2xl:text-[300px] w-full'}>
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
                                                     className={`${index == 4 || index == 9 ? 'w-[.65em]' : ''} ${index == 6 ? '-ms-[.03em]' : ''} ${index >= 5 ? 'pb-[40px]' : ''} ${index == 0 ? 'ms-[.08em]' : ''} leading-[calc(1em-10%)]`}>{letter}</span>
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
                                                        className={`col-span-full bg-aero-500 h-full origin-left ${index == 1 ? 'pb-[40px]' : ''}`}
                                                        data-delay={index * 200 + 100}>
                                            </motion.div>
                                        ))
                                    }
                                </motion.div>
                            </h1>
                        </div>
                    </div>
                    <HeroButtons/>
                </div>
            </main>
        )

        function HeroButtons() {
            const buttons = [
                {
                    label: dict.home.main.navigation.about_me,
                    href: '#about'
                },
                {
                    label: dict.home.main.navigation.skills,
                    href: '#skills'
                },
                {
                    label: dict.home.main.navigation.works,
                    href: '#works'
                },
                {
                    label: dict.home.main.navigation.contact,
                    href: '#contact'
                }
            ]

            return <div className={'font-semibold backdrop-blur-[10px] border-4 border-alt-gray-250'}>
                <ul className={'flex justify-around h-12 md:h-24 text-[3.3vw] md:text-2xl leading-[3rem] md:leading-[6rem]'}>
                    {
                        buttons.map((button, index) => {
                            return <li key={index} className={'w-full text-center'}><Link
                                className={'block h-full w-full text-white'}
                                href={button.href}>{button.label}</Link></li>
                        })
                    }
                </ul>
            </div>;
        }
    }

    function AboutSection() {
        return (
            <section className={'bg-alt-gray-primary shadow-[0px_0px_30px_-2px_rgba(0,0,0,.15)]'} id={'about'}>
                <Divider/>
                <div className={'container mx-auto flex flex-col xl:grid grid-cols-2 xl:grid-rows-[auto,auto,auto] my-32'}>
                    <Heading1>{dict.home.about_me.title}</Heading1>
                    {/*<HiddenText className={'text-8xl text-right font-heading'}>Hey there!</HiddenText>*/}
                    <div className={'block w-full xl:w-[500px] 2xl:w-[700px] text-xl text-justify col-start-2 row-start-2 row-span-2 order-5'}>
                        <p className={'whitespace-pre-wrap text-[max(16px,3vw)] sm:text-xl leading-[max(24px,4.5vw)] sm:leading-6'}>{dict.home.about_me.paragraph}</p>
                        <Heading2 className={'mt-8'}>{dict.home.about_me.education.title}</Heading2>
                        <div className={'text-start w-full'}>
                            <SkillCard className={'!py-6'} skillIcon={<EduchemLogo className={'h-full'}/>}
                                       startYear={2021}
                                       endYear={2025}><span
                                className={'block text-xl'}>{dict.home.about_me.education.high_school}</span>Educhem</SkillCard>
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
                                    {`.cls-1 { fill: #19b9e6; stroke-width: 0px; }`}
                                </style>
                            </defs>
                            <motion.polygon
                                className='cls-1'
                                points='214.6 0 175 224.9 0 78.1 214.6 0'
                                initial={{opacity: 0, y: -100, scale: .5, rotate: 15}}
                                whileInView={{opacity: 1, y: 0, scale: 1, rotate: 0}}
                                viewport={{once: true, amount: .5}}
                                transition={{duration: 1, ease: 'anticipate'}}
                            />
                            <motion.polygon
                                className='cls-1'
                                points='188.5 227.3 213 88.3 321.1 179 188.5 227.3'
                                initial={{opacity: 0, scale: .5, x: 100}}
                                whileInView={{opacity: 1, scale: 1, x: 0}}
                                viewport={{once: true, amount: .5}}
                                transition={{duration: 1, ease: 'anticipate', delay: .3}}
                            />
                            <motion.polygon
                                className='cls-1'
                                points='303.8 47.9 288.7 133.8 221.8 77.8 303.8 47.9'
                                initial={{opacity: 0, scale: .5, rotate: -30, x: -50}}
                                whileInView={{opacity: 1, scale: 1, rotate: 0, x: 0}}
                                viewport={{once: true, amount: .5}}
                                transition={{duration: 1.2, ease: 'anticipate', delay: .6}}
                            />
                        </svg>
                    </div>
                </div>
                <Divider/>
            </section>
        )
    }

    function SkillsSection() {
        return (
            <section id={'skills'}>
                <div className={'container mx-auto my-32'}>
                    <Heading1 className={'sm:mb-16'}>{dict.home.skills.title}</Heading1>
                    <div className={'flex flex-col'}>
                        <div className={'mb-5'}>
                            <Heading2>{dict.home.skills.web_development}</Heading2>
                            <div className={'flex flex-wrap flex-col sm:flex-row'}>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<IoLogoReact className={'text-[#58c4dc]'}/>} startYear={2021}
                                           level={3}>React</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px] min-w-[200px'} skillIcon={<SassSeal className={'h-full'}/>} startYear={2021}
                                           level={3}>SCSS</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px] min-w-[200px'} skillIcon={<NextJSLogo className={'h-full'}/>} startYear={2021}
                                           level={2}>Next.js</SkillCard>
                            </div>
                        </div>
                        <Divider className={'mb-10'}/>
                        <div className={'mb-5'}>
                            <Heading2>{dict.home.skills.game_development}</Heading2>
                            <div className={'flex flex-wrap flex-col sm:flex-row'}>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<UnrealEngineLogo className={'h-full'}/>} startYear={2023} level={1}>Unreal
                                    Engine</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<UnityLogo className={'h-full'}/>} yearsOverride={1}
                                           level={1}>Unity</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<GodotLogo className={'h-full'}/>} startYear={2024}
                                           level={0}>Godot</SkillCard>
                            </div>
                        </div>
                        <Divider className={'mb-10'}/>
                        <div>
                            <Heading2>{dict.home.skills.other}</Heading2>
                            <div className={'flex flex-wrap flex-col sm:flex-row'}>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<TbBrandCSharp/>} startYear={2021} level={3}>C#</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<TbBrandCpp/>} startYear={2023} level={1}>C++</SkillCard>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )

    }

    interface SkillCardProps {
        children: ReactNode,
        skillIcon: ReactNode,
        startYear?: number,
        endYear?: number,
        yearsOverride?: number,
        level?: number,
        className?: string
    }

    function SkillCard({children, skillIcon, startYear, endYear, yearsOverride, level, className}: SkillCardProps) {
        function getYearsFromYear(year: number) {
            const yearsFromYear = new Date();
            yearsFromYear.setFullYear(yearsFromYear.getFullYear() - year);
            return yearsFromYear.getFullYear();
        }

        const levels = [dict.components.skill_card.level.novice, dict.components.skill_card.level.beginner, dict.components.skill_card.level.intermediate, dict.components.skill_card.level.proficient, dict.components.skill_card.level.expert, dict.components.skill_card.level.master];
        const yearsFromYear = startYear ? getYearsFromYear(startYear) : 0;

        // Does the right wording for 'year(s)'
        const year = yearsOverride ? (yearsOverride === 1 ? '1 ' + dict.components.skill_card.year : yearsOverride < 5 ? yearsOverride + ' ' + dict.components.skill_card.years_less_than_5 : yearsOverride + ' ' + dict.components.skill_card.years) : endYear ? `${startYear} ${dict.components.skill_card.to} ${endYear}` : `${startYear ? (yearsFromYear === 0 ? '' : yearsFromYear === 1 ? '1 ' + dict.components.skill_card.year : yearsFromYear < 5 ? yearsFromYear + ' ' + dict.components.skill_card.years_less_than_5 : yearsFromYear + ' ' + dict.components.skill_card.years) : ''}`;

        return (
            <div className={'flex flex-col gap-1 w-[240px] py-4 sm:py-10 ' + className}>
                <span className={'text-5xl mb-2 text-yellow-300# h-12'}>{skillIcon}</span>
                <h2 className={'text-[max(20px,4.6vw)] sm:text-3xl font-medium'}>{children}</h2>
                <span
                    className={'text-alt-gray-600 text-[max(16px,2.8vw)] sm:text-lg'}>{year}{year && level !== undefined ? ' - ' : ''}{level !== undefined ? levels[level] : ''}</span>
            </div>
        )
    }

    function WorksSection(){
        interface WorkCardProps{
            children: ReactNode,
            className?: string,
            imageClassName?: string,
            title: string,
            tags?: ReactNode
            imagePath: string,
            learnMoreHref?: string,
            websiteHref?: string,
            initial?: object
        }

        return (
            <section className={'bg-alt-gray-primary shadow-[0px_0px_30px_-2px_rgba(0,0,0,.15)]'} id={'works'}>
                <Divider/>
                <div className={'container mx-auto my-32 flex flex-col gap-y-12 xl:gap-y-0 xl:grid grid-rows-6 grid-cols-2 gap-x-24'}>
                    <Heading1>{dict.home.works.title}</Heading1>
                    <WorkCard className={'col-start-2 row-span-4 bg-[linear-gradient(45deg,#131516_0%,#1C1F21_70%)] w-full md:w-[min(660px,100%)] xl:w-auto'} title={'Acnod'} imagePath={'/works/AcnodNET.png'} imageClassName={'float-end'} websiteHref={'https://Acnod.net'}
                                 initial={{
                                     translateX: '10%',
                                     opacity: 0
                                 }}
                                 tags={<>
                                     <Tag className={'!bg-aero-300 !text-aero-950'} icon={<SiNextdotjs/>}>NextJS</Tag>
                                     <Tag icon={<TbBrandThreejs/>}>ThreeJS</Tag>
                                 </>}>
                        <Translate value={dict.home.works.acnod.description} components={{ link: <Link href={'#'}/> }}/>
                    </WorkCard>

                    <WorkCard className={'row-start-3 row-span-4 bg-[linear-gradient(45deg,#000f14_0%,#023447_70%)]'} title={'Nagy3D'} imagePath={'/works/Nagy3DCZ.png'} imageClassName={'float-end !w-full'} websiteHref={'https://www.Nagy3D.cz'}
                                 initial={{
                                     translateX: '-10%',
                                     opacity: 0
                                 }}
                                 tags={<>
                                     <Tag className={'!bg-aero-300 !text-aero-950'} icon={<SiNextdotjs/>}>NextJS</Tag>
                                 </>}>
                        {dict.home.works.nagy3d.description}
                    </WorkCard>

                    {/*<div className={'row-start-6 col-start-2'}>*/}
                    {/*    <span className={'text-3xl'}>This isn&#39;t all! Check out all of my work <Link href={'/works'}>here</Link>.</span>*/}
                    {/*</div>*/}
                </div>
                <Divider/>
            </section>
        )

        function WorkCard({children, title, className, imageClassName, tags, imagePath, learnMoreHref = '/works/' + title, websiteHref, initial}: WorkCardProps){
            return (
                <motion.div
                    initial={initial}
                    whileInView={{
                        translateX: 0,
                        opacity: 1,
                        transition: {
                            duration: .8,
                            ease: cubicBezier(0.76, 0, 0.24, 1),
                            delay: .4
                        }
                    }}
                    viewport={{once: true}}
                    className={'w-full sm:h-[800px] relative flex flex-col justify-between overflow-hidden  rounded-md# shadow-[0_0_30px_-3px_rgba(0,0,0,.3)] ' + className}>
                    <div className={'m-10 sm:m-20'}>
                        <div className={'flex justify-between md:items-center flex-col gap-y-4 md:flex-row'}>
                            <Heading2 className={'font-bold'}>{title}</Heading2>
                            <span className={'flex gap-3'}>{tags}</span>
                        </div>
                        <p className={'my-6'}>{children}</p>
                        <div className={'flex md:justify-end gap-4 items-start md:items-center mx-20# flex-col md:flex-row'}>
                            {
                                websiteHref ?
                                    <Link className={'rounded-full# p-1 flex items-center gap-2'} href={websiteHref} rel={'noreferrer'} target={'_blank'}><FaGlobe
                                        className={'text-2xl'}/><span>{websiteHref.replace(/https?:\/\/(www\.)?/, '')}</span></Link>
                                    : undefined
                            }
                            {
                                learnMoreHref ?
                                    <LinkButton href={learnMoreHref}>{dict.home.works.learn_more}</LinkButton>
                                    : undefined
                            }
                        </div>
                    </div>
                    <div className={'sm:h-[450px] m-8 shadow-[0_0_20px_0px_rgba(0,0,0,.3)] overflow-hidden'}>
                        <Suspense fallback={<Loading/>}>
                            <Image className={'object-cover object-left-top w-full ' + imageClassName}
                                   src={imagePath} alt={title + ' website image'} width={1400} height={1000}/>
                        </Suspense>
                    </div>
                </motion.div>
            )
        }
    }

}

