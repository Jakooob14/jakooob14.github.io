'use client';

import {useSearchParams} from "next/navigation";
import {useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Rip({ dict, lang }: any) {
    const searchParams = useSearchParams();
    const urlTo = searchParams.get('url') as string;
    const name = searchParams.get('name') as string;

    const [countdown, setCountdown] = useState(5);
    if (countdown > 0){
        setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);
    }

    return (
        <>
            <Header dict={dict} lang={lang}/>
            <main className={'flex flex-col items-center py-20 text-center min-h-[calc(100vh-8rem)]'}>
                <div className={'max-w-[1200px] w-90'}>
                    <h1 className={'text-[18vw] lg:text-[180px] font-bold uppercase'}>{dict.rip.title}</h1>
                    <p className={'text-lg sm:text-2xl mb-10'}>{name ? name : urlTo} {dict.rip.subtitle}</p>
                    <div className={'relative'}><a className={`text-xl text-white rounded-xl bg-blue-950 p-4 ${countdown === 0 ? '' : 'brightness-30 pointer-events-none'}`} href={urlTo}  rel={'noreferrer noopener'}>{urlTo}</a><p className={`absolute transform-center text-4xl ${countdown === 0 ? 'hidden' : ''}`}>{countdown}</p></div>
                    <br/>
                    <Link className={'text-xl underline'} href={"/projects"}>{dict.rip.back}</Link>
                </div>
            </main>
            <Footer />
        </>
    )
}