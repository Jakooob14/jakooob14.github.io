'use client'

import {cubicBezier, motion} from "motion/react";
import HiddenText from "@/app/components/HiddenText";
import Divider from "@/app/components/Divider";
import {Heading1, Heading2} from "@/app/components/Headings";
import {ReactNode, Suspense} from "react";
import {IoLogoReact} from "react-icons/io5";
import {SiCplusplus, SiCsharp, SiNextdotjs} from "react-icons/si";
import {EduchemLogo, GodotLogo, NextJSLogo, SassSeal, UnityLogo, UnrealEngineLogo} from "@/app/components/Icons";
import Image from "next/image";
import Link from "next/link";
import {TbBrandThreejs} from "react-icons/tb";
import Loading from "@/app/components/Loading";


export default function Home() {

    return (
        <>
            <Main/>
            <AboutSection/>
            <SkillsSection/>
            <ProjectsSection/>
        </>
    );
}

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
            <div className={'relative z-0 container mx-auto flex flex-col justify-center gap-24 h-full'}>

                {/* Title */}
                <div className={'uppercase font-[760] inline-flex items-center justify-center w-full'}>
                    <div className={'relative inline-block text-[300px] w-full'}>
                      <span className={'block relative'}>
                          <div className={'ms-2'}>
                              <h2 className={'text-4xl text-alt-gray-500 font-extrabold'}>Student & Developer</h2>
                          </div>
                          <motion.div
                              className={'absolute w-[calc(100%+.1em)] h-full bg-aero-500 top-0 origin-left -ms-[.05em]'}
                              animate={titleAnimation}>
                          </motion.div>
                      </span>
                        <h1 className={'relative grid grid-cols-[repeat(5,auto)] gap-x-16 w-full'}>
                            {
                                Array.from('JakubSokol').map((letter, index) => {
                                    return <span key={index}
                                                 className={`${index == 4 || index == 9 ? 'w-[.65em]' : ''} ${index == 6 ? '-ms-[.03em]' : ''} ${index >= 5 ? 'pb-[40px]' : ''} leading-[calc(1em-10%)]`}>{letter}</span>
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
                label: 'About me',
                href: '#about'
            },
            {
                label: 'Skills',
                href: '#skills'
            },
            {
                label: 'Works',
                href: '#works'
            },
            {
                label: 'Contact',
                href: '#contact'
            }
        ]

        return <div className={'font-semibold jbg-alt-gray-300 backdrop-blur-[10px] border-4 border-alt-gray-250'}>
            <ul className={'flex justify-between h-24 text-2xl/[6rem]'}>
                {
                    buttons.map((button, index) => {
                        return <li key={index}><Link className={'block h-full px-16 text-white'} href={button.href}>{button.label}</Link></li>
                    })
                }
            </ul>
        </div>;
    }
}

function AboutSection(){
    return (
        <section className={'bg-alt-gray-primary shadow-[0px_0px_30px_-2px_rgba(0,0,0,.15)]'} id={'about'}>
            <Divider/>
            <div className={'container mx-auto grid grid-cols-2 grid-rows-[auto,auto,auto] my-32'}>
                <Heading1 className={'h-12'}>About me</Heading1>
                <HiddenText className={'text-8xl text-right font-heading'}>Hey there!</HiddenText>
                <div className={'block w-[700px] text-xl text-justify col-start-2 row-start-2 row-span-2'}>
                    <p>
                        Hello, my name is Jakub Sokol. I am an IT student from the Czech Republic with a deep passion for
                        technology that began in my childhood. From an early age, I was captivated by computers and the
                        innovations they made possible, whether it was exploring how they worked, learning new software, or
                        immersing myself in the world of gaming. Over time, this fascination grew into a dedicated pursuit
                        of knowledge about the inner workings of technology, particularly games.
                        <br/>
                        As I delved deeper into the mechanics behind gaming how games are designed, programmed, and brought
                        to life I realized that creating games isn&#39;t just a career aspiration but a personal dream of
                        mine.
                        I aim to combine my technical skills with my creativity to craft experiences that entertain,
                        inspire, and connect people around the world. My journey as an IT student is just the beginning, and
                        I’m eager to continue learning, innovating, and eventually bringing my vision of developing games to
                        reality.
                    </p>
                    <Heading2 className={'mt-8'}>Education</Heading2>
                    <div className={'text-start w-full'}>
                        <SkillCard className={'!py-6'} skillIcon={<EduchemLogo className={'h-full'}/>} startYear={2021}
                                   endYear={2025}><span className={'block text-xl'}>High School</span>Educhem</SkillCard>
                    </div>
                </div>
                <div className={'mb-10 row-span-2 w-[80%]'}>
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
                <Heading1 className={'mb-16'}>My skills</Heading1>
                <div className={'flex flex-col'}>
                    <div className={'mb-5'}>
                        <Heading2>Web development</Heading2>
                        <div className={'flex flex-wrap'}>
                            <SkillCard className={'!w-1/3'} skillIcon={<IoLogoReact className={'text-[#58c4dc]'}/>} startYear={2021}
                                       level={3}>React</SkillCard>
                            <SkillCard className={'!w-1/3'} skillIcon={<SassSeal className={'h-full'}/>} startYear={2021}
                                       level={3}>SCSS</SkillCard>
                            <SkillCard className={'!w-1/3'} skillIcon={<NextJSLogo className={'h-full'}/>} startYear={2021}
                                       level={2}>Next.js</SkillCard>
                        </div>
                    </div>
                    <Divider className={'mb-10'}/>
                    <div className={'mb-5'}>
                        <Heading2>Game development</Heading2>
                        <div className={'flex flex-wrap'}>
                            <SkillCard className={'!w-1/3'} skillIcon={<UnrealEngineLogo className={'h-full'}/>} startYear={2023} level={1}>Unreal
                                Engine</SkillCard>
                            <SkillCard className={'!w-1/3'} skillIcon={<UnityLogo className={'h-full'}/>} yearsOverride={1}
                                       level={1}>Unity</SkillCard>
                            <SkillCard className={'!w-1/3'} skillIcon={<GodotLogo className={'h-full'}/>} startYear={2024}
                                       level={0}>Godot</SkillCard>
                        </div>
                    </div>
                    <Divider className={'mb-10'}/>
                    <div>
                        <Heading2>Other</Heading2>
                        <div className={'flex flex-wrap'}>
                            <SkillCard className={'!w-1/3'} skillIcon={<SiCsharp/>} startYear={2021} level={3}>C#</SkillCard>
                            <SkillCard className={'!w-1/3'} skillIcon={<SiCplusplus/>} startYear={2023} level={0}>C++</SkillCard>
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

    const levels = ['Novice', 'Beginner', 'Intermediate', 'Proficient', 'Expert', 'Master'];
    const yearsFromYear = startYear ? getYearsFromYear(startYear) : undefined;
    const year = yearsOverride ? (yearsOverride === 1 ? '1 year' : yearsOverride + ' years') : endYear ? `${startYear} to ${endYear}` : `${startYear ? (yearsFromYear === 0 ? '' : yearsFromYear === 1 ? '1 year' : yearsFromYear + ' years') : ''}`;

    return (
        <div className={'flex flex-col gap-1 w-[240px] py-10 ' + className}>
            <span className={'text-5xl mb-2 text-yellow-300# h-12'}>{skillIcon}</span>
            <h2 className={'text-3xl font-medium'}>{children}</h2>
            <span
                className={'text-alt-gray-600 text-lg'}>{year}{year && level !== undefined ? ' - ' : ''}{level !== undefined ? levels[level] : ''}</span>
        </div>
    )
}

function ProjectsSection(){
    interface ProjectCardProps{
        children: ReactNode,
        className?: string,
        imageClassName?: string,
        title: string,
        tags?: ReactNode
        imagePath: string
    }

    interface TagProps{
        children: string,
        className?: string,
        icon?: ReactNode
    }

    return (
        <section className={'bg-alt-gray-primary shadow-[0px_0px_30px_-2px_rgba(0,0,0,.15)]'} id={'works'}>
            <Divider/>
            <div className={'container mx-auto my-32 grid grid-rows-12 jgrid-rows-[repeat(12,128px)] grid-cols-2'}>
                <Heading1>Works</Heading1>
                <ProjectCard className={'col-start-2 row-span-4'} title={'Acnod'} imagePath={'/works/AcnodNET.png'}
                    tags={<>
                        <Tag icon={<SiNextdotjs/>}>NextJS</Tag>
                        <Tag className={'!bg-aero-300 !text-aero-950'} icon={<TbBrandThreejs/>}>ThreeJS</Tag>
                    </>}>
                    Acnod is a project me and my friend <Link href={'https://skymmel.eu'}>Vojtěch
                    Skyba</Link> are working on. It is a freelance website on which we offer website development
                    services.
                </ProjectCard>

                {/*<div className={'row-start-2'}>*/}
                {/*    <span className={'text-3xl'}>This isn&#39;t all, check out all of my work <Link href={'/works'}>here</Link>.</span>*/}
                {/*</div>*/}
            </div>
            <Divider/>
        </section>
    )

    function Tag({children, className, icon}: TagProps){
        return <span className={className + ' h-fit py-1 px-3 rounded-full# bg-alt-gray-300 text-alt-gray-950 font-medium text-sm flex items-center gap-1 '}>{icon}{children}</span>
    }

    function ProjectCard({children, title, className, imageClassName, tags, imagePath}: ProjectCardProps){
        return (
            <div
                className={'w-full h-[800px] relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(45deg,#131516_0%,#1C1F21_100%)] rounded-md# shadow-lg ' + className}>
                <div className={'m-20'}>
                    <div className={'flex justify-between items-center'}>
                        <Heading2 className={'font-bold'}>{title}</Heading2>
                        <span className={'flex gap-3'}>{tags}</span>
                    </div>
                    <p className={'mt-6'}>{children}</p>
                </div>
                <Suspense fallback={<Loading/>}>
                    <Image className={'relative object-contain -right-12 rounded-2xl# ' + imageClassName}
                           src={imagePath} alt={'Acnod.net website image'} width={1409} height={1059}/>
                </Suspense>
            </div>
        )
    }
}
