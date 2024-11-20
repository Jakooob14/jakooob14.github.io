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
                return element.getAttribute("data-delay");
            },
            easing: "easeInOutQuart"
        });
    }, []);

  return (
    <>
      <main className={'h-screen bg-alt-gray-primary bg-gridPattern bg-[length:200px] bg-[left_35px_top_20px]'}>
          <div className={'relative z-0 container mx-auto'}>
              <div className={'uppercase text-white font-extrabold inline-flex items-center justify-center w-full mt-24'}>
                  <div className={'relative inline-block text-[200px]'}>
                      <span className={'block relative'}>
                          <div className={'ms-[calc(.2em+7px)]'}>
                              <h2 className={'text-4xl text-alt-gray-500'}>Student & Developer</h2>
                          </div>
                          <div className={'absolute w-full h-full bg-aero-500 top-0 origin-left'}
                               data-delay={100}
                               ref={el => {
                                   if (el) titleRefs.current[0] = el;
                               }}>
                          </div>
                      </span>
                      <h1 className={'relative grid grid-cols-5 gap-x-16 pe-10'}>
                          {
                              Array.from('JakubSokol').map((letter, index) => {
                                  return <span key={index}
                                               className={`${index == 0 || index == 5 ? 'ms-[.2em]' : ''} ${index >= 5 ? 'pb-[40px]' : ''} leading-[calc(1em-10%)]`}>{letter}</span>
                              })
                          }
                          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-5">
                              {
                                  Array(2).fill(0).map((_, index) => (
                                      <div key={index} className={`col-span-full bg-aero-500 h-full origin-left ${index == 1 ? 'pb-[40px]' : ''}`}
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
          </div>
      </main>
    </>
  );
}
