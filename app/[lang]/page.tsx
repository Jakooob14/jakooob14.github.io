'use client'

import {cubicBezier, motion} from "motion/react";
import Divider from "@/app/components/Divider";
import {Heading1, Heading2, Heading3} from "@/app/components/Headings";
import {ReactNode, Suspense} from "react";
import {IoLogoReact} from "react-icons/io5";
import {SiBlazor, SiNextdotjs} from "react-icons/si";
import {AspNetLogo, BlazorLogo, EduchemLogo, NextJSLogo, UnityLogo, UnrealEngineLogo} from "@/app/components/Icons";
import Image from "next/image";
import Link from "next/link";
import {TbBrandCpp, TbBrandCSharp, TbBrandThreejs} from "react-icons/tb";
import Loader from "@/app/components/Loader";
import {FaGlobe, FaDownload} from "react-icons/fa6";
import {LinkButton} from "@/app/components/Buttons";
import Tag from "@/app/components/Tag";
import {useDictionary} from "@/app/[lang]/DictionaryProvider";
import Translate from "@/app/components/Translate";
import FlagUK from "@/public/Flag_UK.png";
import {RiTailwindCssFill} from "react-icons/ri";
import {TargetAndTransition, VariantLabels} from "motion";


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
            <main className={'h-screen bg-alt-gray-primary bg-[url("/diagonal-stripes.svg")] bg-[length:200px] bg-[left_35px_top_20px]'}>
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
                        <div className={'text-start w-full flex flex-wrap'}>
                            <SkillCard className={'!py-6'} skillIcon={<EduchemLogo className={'h-full'}/>}
                                       startYear={2021}
                                       endYear={2025}><span
                                className={'block text-xl'}>{dict.home.about_me.education.high_school}</span>Educhem</SkillCard>
                            <SkillCard className={'!py-6'} skillIcon={<Image src={FlagUK} width={70} height={48} alt={'UK Flag'}/>}
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
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<NextJSLogo className={'h-full'}/>} startYear={2021}
                                           level={3}>Next.js</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<IoLogoReact className={'text-[#58c4dc]'}/>} startYear={2021}
                                           level={3}>React</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<RiTailwindCssFill className={'h-full text-[#3cbfff]'}/>} startYear={2022}
                                           level={3}>Tailwind CSS</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<BlazorLogo className={'h-full'}/>}
                                           level={1}>Blazor</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<AspNetLogo className={'h-full text-white'}/>}
                                           level={1}>ASP.NET</SkillCard>
                            </div>
                        </div>
                        <Divider className={'mb-10'}/>
                        <div className={'mb-5'}>
                            <Heading2>{dict.home.skills.game_development}</Heading2>
                            <div className={'flex flex-wrap flex-col sm:flex-row'}>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<UnrealEngineLogo className={'h-full'}/>} yearsOverride={1} level={1}>Unreal
                                    Engine</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<UnityLogo className={'h-full'}/>} yearsOverride={1}
                                           level={1}>Unity</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<Image className={'h-full w-fit'} src={"/works/raylib-games/raylib-logo.png"} alt={"Raylib logo"} width={48} height={48}/>}
                                           level={1}>raylib</SkillCard>
                            </div>
                        </div>
                        <Divider className={'mb-10'}/>
                        <div>
                            <Heading2>{dict.home.skills.other}</Heading2>
                            <div className={'flex flex-wrap flex-col sm:flex-row'}>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<TbBrandCSharp/>} yearsOverride={4} level={3}>C#</SkillCard>
                                <SkillCard className={'!w-1/3 min-w-[200px]'} skillIcon={<TbBrandCpp/>} yearsOverride={1} level={2}>C++</SkillCard>
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
        totalOverride?: string,
        level?: number,
        className?: string
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function SkillCard({children, skillIcon, startYear, endYear, yearsOverride, totalOverride, level, className}: SkillCardProps) {
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
            <div className={'flex flex-col gap-1 w-[240px] py-4 sm:py-10 ' + className}>
                <span className={'text-5xl mb-2 text-yellow-300# h-12'}>{skillIcon}</span>
                <h2 className={'text-[max(20px,4.6vw)] sm:text-3xl font-medium'}>{children}</h2>
                {/*<span*/}
                {/*    className={'text-alt-gray-600 text-[max(16px,2.8vw)] sm:text-lg'}>{totalOverride ? totalOverride : year /*+ (year && level !== undefined ? ' - ' : '') + (level !== undefined ? levels[level] : '')*!/</span>*/}
            </div>
        )
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
                <div className={'container mx-auto my-32'}>
                    <Heading1>{dict.home.works.title}</Heading1>
                    <div className={'xl:grid grid-cols-2 gap-x-24 gap-y-24 xl:[&>*:nth-child(even)]:!-translate-y-[256px] mt-20 flex flex-col items-center'}>
                        <WorkCard
                            className={'bg-[linear-gradient(45deg,#131516_0%,#1C1F21_70%)]'}
                            title={'Acnod'}
                            subtitle={dict.home.works.categories.web_development}
                            imagePath={'/works/acnodnet/acnodnet.png'}
                            imageClassName={'float-end'}
                            websiteHref={'https://final-acnod.vercel.app'}
                            initial={{
                                translateX: '-10%',
                                opacity: 0
                            }}
                            tags={<>
                                <Tag className={'!bg-aero-300 !text-aero-950'} icon={<SiNextdotjs/>}>NextJS</Tag>
                                <Tag icon={<TbBrandThreejs/>}>ThreeJS</Tag>
                            </>}>
                            <Translate value={dict.home.works.acnod.description} components={{ link: <Link href={'#'}/> }}/>
                        </WorkCard>

                        <WorkCard
                            className={'bg-[linear-gradient(45deg,#000f14_0%,#023447_70%)]'}
                            title={'Nagy3D'}
                            subtitle={dict.home.works.categories.web_development}
                            imagePath={'/works/nagy3dcz/nagy3dcz.png'}
                            imageClassName={'float-end !w-full'}
                            websiteHref={'https://www.Nagy3D.cz'}
                            initial={{
                                translateX: '10%',
                                opacity: 0
                            }}
                            tags={<>
                                <Tag className={'!bg-aero-300 !text-aero-950'} icon={<SiNextdotjs/>}>NextJS</Tag>
                            </>}>
                            {dict.home.works.nagy3d.description}
                        </WorkCard>

                        <WorkCard
                            className={'bg-[linear-gradient(45deg,#171717_0%,#202020_70%)]'}
                            title={'Monitoring Dashboard'}
                            subtitle={dict.home.works.categories.web_development}
                            imagePath={'/works/monitoring-dashboard/monitoring-dashboard.png'}
                            imageClassName={'float-end !w-full'}
                            websiteHref={'https://github.com/Jakooob14/MonitoringDashboard'}
                            websiteTitle={"GitHub"}
                            learnMoreHref={"/works/monitoring-dashboard"}
                            initial={{
                                translateX: '-10%',
                                opacity: 0
                            }}
                            tags={<>
                                <Tag className={'!bg-aero-300 !text-aero-950'} icon={<SiBlazor/>}>Blazor</Tag>
                            </>}>
                            {dict.home.works.monitoring_dashboard.description}
                        </WorkCard>

                        <WorkCard
                            className={'bg-[linear-gradient(135deg,hsla(200,7%,8%,1)_0%,#2F0B0B_70%)]'}
                            title={'Slenderman'}
                            subtitle={dict.home.works.categories.game_development}
                            imagePath={'/works/slenderman/slenderman.png'}
                            imageClassName={'float-end !w-full'}
                            websiteHref={'https://git.jakooob.dev/Jakooob/slenderman-unreal/releases/latest'}
                            websiteTitle={dict.general.download}
                            websiteIcon={<FaDownload/>}
                            initial={{
                                translateX: '10%',
                                opacity: 0
                            }}
                            tags={<>
                                <Tag className={'!bg-aero-300 !text-aero-950 block'} icon={<UnrealEngineLogo className={'h-full w-4'}/>}>UE5</Tag>
                            </>}>
                            {dict.home.works.slenderman.description}
                        </WorkCard>

                        <div></div> {/* TEMP */}

                        <WorkCard
                            className={'bg-[linear-gradient(-45deg,#131516_0%,#1C1F21_70%)]'}
                            title={dict.home.works.raylib_games.title}
                            subtitle={dict.home.works.categories.game_development}
                            imagePath={'/works/raylib-games/raylib-games.png'}
                            imageClassName={'float-end !w-full !object-left-top'}
                            learnMoreHref={"https://github.com/stars/Jakooob14/lists/raylib-games"}
                            initial={{
                                translateX: '10%',
                                opacity: 0
                            }}
                            tags={<>
                                <Tag className={'!bg-aero-300 !text-aero-950 block'} icon={<Image className={'h-full w-4'} src={"/works/raylib-games/raylib-logo.png"} alt={"Raylib logo"} width={16} height={16}/>}>raylib</Tag>
                            </>}>
                            {dict.home.works.raylib_games.description}
                        </WorkCard>

                        {/*<div className={'row-start-6 col-start-2'}>*/}
                        {/*    <span className={'text-3xl'}>This isn&#39;t all! Check out all of my work <Link href={'/works'}>here</Link>.</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <Divider/>
            </section>
        )

        function WorkCard({children, title, subtitle, className, imageClassName, tags, imagePath, learnMoreHref = '/works/' + title.toLowerCase(), websiteHref, websiteTitle, websiteIcon = <FaGlobe/>, initial}: WorkCardProps){
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
                    className={'w-auto md:w-[700px] xl:w-auto relative flex flex-col justify-between overflow-hidden shadow-[0_0_30px_-3px_rgba(0,0,0,.3)] ' + className}>
                    <div className={'m-10 sm:m-20'}>
                        <div className={'flex justify-between md:items-center flex-col md:flex-row'}>
                            <Heading2 className={'font-bold'}>{title}</Heading2>
                            {subtitle && <Heading3 className={"block md:hidden"}>{subtitle}</Heading3>}
                            <span className={'flex gap-3 mt-2 md:mt-0'}>{tags}</span>
                        </div>
                        {subtitle && <Heading3 className={"hidden md:block"}>{subtitle}</Heading3>}
                        <p className={'my-6'}>{children}</p>
                        <div className={'flex md:justify-end gap-4 items-start md:items-center mx-20# flex-col md:flex-row'}>
                            {
                                websiteHref ?
                                    <Link className={'rounded-full# p-1 flex items-center gap-2'} href={websiteHref} rel={'noreferrer'} target={'_blank'}>
                                        <span className={'text-2xl'}>{websiteIcon}</span>
                                        <span>{websiteTitle || websiteHref.replace(/https?:\/\/(www\.)?/, '')}</span>
                                    </Link>
                                    : undefined
                            }
                            {
                                learnMoreHref ?
                                    <LinkButton href={learnMoreHref} target={learnMoreHref.startsWith('http') ? '_blank' : ''}>{dict.home.works.learn_more}</LinkButton>
                                    : undefined
                            }
                        </div>
                    </div>
                    <div className={'sm:h-[450px] m-8 shadow-[0_0_20px_0px_rgba(0,0,0,.3)] overflow-hidden'}>
                        <Suspense fallback={<Loader/>}>
                            <Image className={'object-cover object-center h-full ' + imageClassName}
                                   src={imagePath} alt={title + ' website image'} width={1400} height={1000}/>
                        </Suspense>
                    </div>
                </motion.div>
            )
        }
    }

}

