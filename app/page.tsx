'use client'

import {useEffect, useRef} from "react";
import anime from "animejs/lib/anime.es";

export default function Home() {
    const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        anime({
            targets: titleRefs.current,
            scaleX: [1, 0],
            delay: function (element, index) {
                return (200 + 100 * index)
            },
            easing: "easeInOutQuart"
        });
    }, []);

  return (
    <>
      <main className={'h-screen bg-alt-gray-primary bg-gridPattern bg-[length:200px] bg-[left_35px_top_20px]'}>
          <div className={'relative z-0'}>
              <div className={'uppercase text-white font-extrabold ms-24 inline-flex flex-col mt-96'}>
                  <div className={'relative inline-block text-[300px]'}>
                      <span className={'ms-[.2em] -mb-20 block'}>
                          <h2 className={'text-4xl text-alt-gray-500 ms-[.2em]'}>Student & Developer</h2>
                      </span>
                      <h1 className={'relative grid grid-cols-5 gap-x-24 pe-10'}>
                          {
                              Array.from('JakubSokol').map((letter, index) => {
                                  return <span key={index}
                                               className={index == 0 || index == 5 ? 'ms-[.2em]' : undefined}>{letter}</span>
                              })
                          }
                          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-5">
                              {
                                  Array(2).fill(0).map((_, index) => (
                                      <div key={index} className="col-span-full bg-aero-500 h-full origin-left" ref={el => { if (el) titleRefs.current[index] = el; }}></div>
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
