"use server";

import Home from "@/app/[lang]/home";
import {getDictionary} from "@/app/dictionaries";

export default async function Page({ params: { lang } }: any) {
    const dict = await getDictionary(lang);
    return (
        <>
            <Home dict={dict} lang={lang}/>
        </>
    )
}
