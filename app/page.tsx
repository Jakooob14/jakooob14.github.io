'use client'

import {cubicBezier, motion} from "motion/react";
import HiddenText from "@/app/components/HiddenText";
import Divider from "@/app/components/Divider";
import {Heading1} from "@/app/components/Headings";


export default function Home() {

    return (
        <>
            <Main/>
            <AboutSection/>
            <SkillsSection/>
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
                href: '#'
            },
            {
                label: 'Projects',
                href: '#'
            },
            {
                label: 'Contact',
                href: '#'
            }
        ]

        return <div className={'font-semibold jbg-alt-gray-300 backdrop-blur-[10px] border-4 border-alt-gray-250'}>
            <ul className={'flex justify-between h-24 text-2xl/[6rem]'}>
                {
                    buttons.map((button, index) => {
                        return <li key={index}><a className={'block h-full px-16'} href={button.href}
                                                  data-keepwidth={true}>{button.label}</a></li>
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
            <div className={'container mx-auto grid grid-cols-2 grid-rows-3 h-[700px] my-32'}>
                <div>
                    <Heading1>About me</Heading1>
                </div>
                <HiddenText className={'text-8xl text-right font-heading'}>Hey there!</HiddenText>
                <p className={'w-[700px] text-xl text-justify col-start-2 row-start-2 row-span-2'}>
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
                <div className={'mb-10 row-span-2'}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 321.1 227.3'
                        style={{
                            width: 'auto',
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

function SkillsSection(){
    return (
        <section className={'h-screen'}>
            <div className={'container mx-auto my-32'}>
                <Heading1>My skills</Heading1>
            </div>
        </section>
    )
}
