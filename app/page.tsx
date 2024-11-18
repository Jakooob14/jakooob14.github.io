'use client'

import {StretchedTextByLetterSize} from "@/app/components/Text";
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
      <main className={'h-screen bg-primary-gray bg-gridPattern bg-[length:200px] bg-[left_35px_top_20px] '}>
          <div className={'absolute w-full h-full bg-[linear-gradient(140deg,_hsla(193,77%,55%,3%)_0%,_hsla(193,77%,55%,0%)_100%)]'}></div>
          <div className={'relative z-0'}>
              <div className={'uppercase text-white font-bold ms-24'}>
                  <span className={'text-4xl text-[#808080]'}>Student & Developer</span>
                  <h1 className={'relative text-[200px]'}>
                      {/*<StretchedText>qwe asd</StretchedText>*/}
                      {/*<StretchedText><span className={'text-aero-500'}>J</span> a k u b</StretchedText>*/}
                      {/*<StretchedText><span className={'text-aero-500'}>S</span> o k o l</StretchedText>*/}
                      {/*<span className={'text-aero-500'}>J</span>akub<br/>*/}
                      {/*<span className={'text-aero-500'}>S</span>okol*/}
                      <div className={'inline-block relative w-auto '}>
                          <StretchedTextByLetterSize className={'select-none'} text={'Jakub'} thinnerLettersIndex={[1]}/>
                          <div className={'absolute w-full h-full top-0 -left-8 bg-aero-500 origin-left'} ref={el => { if (el) titleRefs.current[0] = el; }}></div>
                      </div>
                      <div className={'inline-block relative w-auto '}>
                          <StretchedTextByLetterSize className={'select-none'} text={'Sokol'} thinnerLettersIndex={[1]}/>
                          <div className={'absolute w-full h-full top-0 -left-8 bg-aero-500 origin-left'} ref={el => { if (el) titleRefs.current[1] = el; }}></div>
                      </div>
                  </h1>
              </div>
          </div>
      </main>
    </>
  );
}
