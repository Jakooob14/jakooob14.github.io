import MetadataGenerator from "@/app/[lang]/tools/metadata-generator/metadata-generator";
import {getDictionary} from "@/app/dictionaries";

export const metadata =  {
    title: 'Metadata Generator'
}

export default async function Page({ params: { lang } }: any) {
    const dict = await getDictionary(lang);
    return (
        <MetadataGenerator dict={dict} lang={lang}/>
    )
}
