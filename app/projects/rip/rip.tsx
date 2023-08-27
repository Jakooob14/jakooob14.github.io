'use client';

import {useSearchParams} from "next/navigation";
import {useState} from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function Rip() {
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
            <Header />
            <main className={'flex flex-col items-center py-20 text-center min-h-[calc(100vh-8rem)]'}>
                <div className={'max-w-[1200px] w-90'}>
                    <h1 className={'text-[18vw] lg:text-[180px] font-bold'}>WARNING!</h1>
                    <p className={'text-lg sm:text-2xl mb-10'}>{name ? name : urlTo} has unfortunately died. So now the domain is probably not theirs anymore, so take caution visiting this domain, as someone with bad intent could&apos;ve put malicious stuff there, so beware!</p>
                    <div className={'relative'}><a className={`text-xl text-white rounded-xl bg-blue-950 p-4 ${countdown === 0 ? '' : 'brightness-30 pointer-events-none'}`} href={urlTo}  rel={'noreferrer noopener'}>{urlTo}</a><p className={`absolute transform-center text-4xl ${countdown === 0 ? 'hidden' : ''}`}>{countdown}</p></div>
                    <br/>
                    <Link className={'text-xl underline'} href={"/projects"}>I&apos;d rather go back</Link>
                </div>
            </main>
            <Footer />
        </>
    )
}