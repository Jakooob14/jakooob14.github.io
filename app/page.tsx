'use client'

import {useEffect, useRef} from "react";
import anime from "animejs/lib/anime.es";

export default function Home() {
    const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        anime({
            targets: titleRefs.current,
            scaleX: [1, 0],
            delay: function (element) {
                return parseInt(element.getAttribute("data-delay") as string);
            },
            easing: "easeInOutQuart"
        });
    }, []);

    return (
        <>
            <main className={'h-screen bg-alt-gray-primary bg-gridPattern bg-[length:200px] bg-[left_35px_top_20px]'}>
                <div className={'relative z-0 container mx-auto'}>

                    {/* Title */}
                    <div className={'uppercase font-[760] inline-flex items-center justify-center w-full mt-24'}>
                        <div className={'relative inline-block text-[300px] w-full'}>
                      <span className={'block relative'}>
                          <div className={'ms-2'}>
                              <h2 className={'text-4xl text-alt-gray-500 font-extrabold'}>Student & Developer</h2>
                          </div>
                          <div className={'absolute w-[calc(100%+.1em)] h-full bg-aero-500 top-0 origin-left -ms-[.05em]'}
                               data-delay={100}
                               ref={el => {
                                   if (el) titleRefs.current[0] = el;
                               }}>
                          </div>
                      </span>
                            <h1 className={'relative grid grid-cols-[repeat(5,auto)] gap-x-16 w-full'}>

                                {/* Binary behind name */}
                                {/*<div*/}
                                {/*    className={'absolute top-0 left-0 w-full h-full grid grid-cols-5 leading-[calc(1em-10%)] opacity-[.03] -z-10'}>*/}
                                {/*    <div*/}
                                {/*        className={'col-span-full h-full flex justify-between me-[.7em]'}>*/}
                                {/*        {*/}
                                {/*            Array.from('4a616b7562').map((letter, index) => {*/}
                                {/*                return <span key={index}>{letter}</span>*/}
                                {/*            })*/}
                                {/*        }*/}
                                {/*    </div>*/}
                                {/*    <div*/}
                                {/*        className={'col-span-full h-full flex justify-between me-[.7em] pb-[40px]'}>*/}
                                {/*        {*/}
                                {/*            Array.from('536f6b6f6c').map((letter, index) => {*/}
                                {/*                return <span key={index}>{letter}</span>*/}
                                {/*            })*/}
                                {/*        }*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {
                                    Array.from('JakubSokol').map((letter, index) => {
                                        return <span key={index}
                                                     className={`${index == 4 || index == 9 ? 'w-[.65em]' : ''} ${index == 6 ? '-ms-[.03em]' : ''} ${index >= 5 ? 'pb-[40px]' : ''} leading-[calc(1em-10%)]`}>{letter}</span>
                                    })
                                }
                                <div className="absolute top-0 left-0 w-[calc(100%+.1em)] h-full grid grid-cols-5 -ms-[.05em]">
                                    {
                                        Array(2).fill(0).map((_, index) => (
                                            <div key={index}
                                                 className={`col-span-full bg-aero-500 h-full origin-left ${index == 1 ? 'pb-[40px]' : ''}`}
                                                 data-delay={index * 200 + 100}
                                                 ref={el => {
                                                     if (el) titleRefs.current[index + 1] = el;
                                                 }}>
                                            </div>
                                        ))
                                    }
                                </div>
                            </h1>
                        </div>
                    </div>

                    <div className={'mt-32 font-semibold px-5 bg-black'}>
                        <ul className={'flex justify-between h-16 text-2xl/[64px]'}>
                            <li><a className={'block h-full'} href={'#'}>About me</a></li>
                            <li><a className={'block h-full'} href={'#'}>Skills</a></li>
                            <li><a className={'block h-full'} href={'#'}>Projects</a></li>
                            <li><a className={'block h-full'} href={'#'}>Contact</a></li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}