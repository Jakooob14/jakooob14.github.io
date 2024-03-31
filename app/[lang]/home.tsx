'use client';

import styles from "@/app/styles/Home.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home({ dict, lang }: any) {
    return (
        <>
            <Header dict={dict} lang={lang}/>
            <main className={`${styles.main} h-screen overflow-hidden relative flex items-end bg-gradient-to-b from-blue-950 to-blue-800`}>
                <div className={'bg-[url("/mountains/fgmountains.png")] bg-repeat-x sm:bg-bottom bg-[bottom_-8rem_center] z-10 w-full h-full relative items-end overflow-x-hidden'}></div>
                <div className={'w-full h-full absolute bg-gradient-to-t from-blue-800 to-transparent to-50% opacity-80 z-6'}></div>
                <div className={'bg-[url("/mountains/bgmountains.png")] bg-repeat-x bg-[bottom_-16rem_right_-36rem] md:bg-bottom lg:m-0 z-5 w-full h-full absolute items-end overflow-x-hidden'}></div>
                <div className={`${styles.stars} w-full h-full absolute`}></div>
                <h1 className={'absolute text-[18vw] md:text-9xl right-[28%] z-7 top-full uppercase font-bold text-center'}>Jakooob</h1>
                <h2 className={'absolute text-[7vw] md:text-5xl left-[12%] z-7 top-full uppercase font-bold text-center'}>{dict.home.hero.subtitle}</h2>
            </main>
            <section className={"bg-blue-930 h-screen flex items-center"}>
                <div className={'container mx-auto px-4 xl:px-28'}>
                    <div className={'text-2xl font-extralight text-center'}>
                        <h1 className={'text-6xl font-bold mb-6'}>{dict.home.about.title}</h1>
                        <p>{dict.home.about.text}</p>
                        <hr className={'w-4/5 mx-auto'}/>
                        <p>{dict.home.about.text2.p1}<Link href={'/projects'}>{dict.home.about.text2.p2}</Link>{dict.home.about.text2.p3}<a href={'mailto:me@jakooob.dev'}>me@jakooob.dev</a>{dict.home.about.text2.p4}<a href={'https://instagram.com/Jakooob14'} title={'Instagram'} target={'_blank'} rel={'noreferrer noopener'}>Jakooob14</a>.</p>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
