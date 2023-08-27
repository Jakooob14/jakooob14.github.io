'use client';

import styles from "@/app/styles/Home.module.scss";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Header/>
            <main className={`${styles.main} h-screen overflow-hidden relative flex items-end bg-gradient-to-b from-blue-950 to-blue-800`}>
                <div className={'bg-[url("/mountains/fgMountains.png")] bg-repeat-x bg-bottom -my-20 lg:m-0 z-10 w-full h-full relative items-end overflow-x-hidden'}></div>
                <div className={'w-full h-full absolute bg-gradient-to-t from-blue-800 to-transparent to-50% opacity-80 z-6'}></div>
                <div className={'bg-[url("/mountains/bgMountains.png")] bg-repeat-x bg-[bottom_-16rem_right_-36rem] md:bg-bottom lg:m-0 z-5 w-full h-full absolute items-end overflow-x-hidden'}></div>
                <div className={`${styles.stars} w-full h-full absolute`}></div>
                <h1 className={'absolute text-[18vw] md:text-9xl right-[28%] z-7 top-full uppercase font-bold text-center'}>Jakooob</h1>
                <h2 className={'absolute text-[7vw] md:text-5xl left-[12%] z-7 top-full uppercase font-bold text-center'}>Student & Developer</h2>
            </main>
            <section className={"bg-blue-930 h-screen flex items-center"}>
                <div className={'container mx-auto px-4 xl:px-28'}>
                    <div className={'text-2xl font-extralight text-center'}>
                        <h1 className={'text-6xl font-bold mb-6'}>About me</h1>
                        <p>Hello, my name is Jakub Sokol I am an IT student from the Czech Republic and I have always had an adoration for computers and other forms of technology since I was little. My passion only grew stronger as I got to understand the inner workings of games and now my dream is to develop them.</p>
                        <hr className={'w-4/5 mx-auto'}/>
                        <p>See my projects at the <Link href={'/projects'}>projects</Link> page. And you can contact me either through my email <a href={'mailto:me@jakooob.dev'}>me@jakooob.dev</a> or Instagram <a href={'https://instagram.com/Jakooob14'} title={'Instagram'} target={'_blank'} rel={'noreferrer noopener'}>Jakooob14</a>.</p>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
