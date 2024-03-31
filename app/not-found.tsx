import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {headers} from "next/headers";
import {getDictionary} from "@/app/dictionaries";
import smileys from "@/public/not found smileys.json";

export const metadata = {
    title: '404'
}

export default async function NotFound() {
    // Get lang from url
    const headersList = headers();
    const fullUrl = headersList.get('referer') || "";
    // Match https://jakooob.dev/*en*/...
    const match = fullUrl.match("(?:https|http:)\\/\\/.*?\\/(.*?)\\/");
    const lang = match ? match[1] : "en";
    const dict = await getDictionary(lang);
    return (
        <>
            <Header dict={dict} lang={lang}/>
            <main className={'min-h-[calc(100vh-8rem)] flex items-center'}>
                <div className={'container mx-auto text-center'}>
                    {/*// @ts-ignore*/}
                    <h2 className={"text-6xl mb-6"}>{smileys[Math.floor(Math.random() * (smileys.length))]}</h2>
                    <h1 className={'text-9xl font-bold mb-6'}>404</h1>
                    <h2 className={'uppercase text-4xl'}>Not found</h2>
                </div>
            </main>
            <Footer/>
        </>
    )
}