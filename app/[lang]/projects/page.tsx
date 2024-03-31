import Projects from "@/app/[lang]/projects/projects";
import {getDictionary} from "@/app/dictionaries";

export const metadata =  {
    title: 'Projects'
}

export default async function Page({ params: { lang } }: any) {
    const dict = await getDictionary(lang);
    return (
        <Projects dict={dict} lang={lang}/>
    )
}
