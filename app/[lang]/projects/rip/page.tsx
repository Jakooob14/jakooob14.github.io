import Rip from "@/app/[lang]/projects/rip/rip";
import {getDictionary} from "@/app/dictionaries";

export const metadata =  {
    title: 'Warning'
}

export default async function Page({ params: { lang } }: any) {
    const dict = await getDictionary(lang);
    return (
        <Rip dict={dict} lang={lang}/>
    )
}
