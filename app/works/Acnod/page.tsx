import {Heading1, Heading2} from "@/app/components/Headings";
import Link from "next/link";
import Image from "next/image";
import {Suspense} from "react";
import Loading from "@/app/components/Loading";
import Tag from "@/app/components/Tag";
import {SiI18Next, SiNextdotjs} from "react-icons/si";
import {TbBrandThreejs} from "react-icons/tb";
import {LinkButton} from "@/app/components/Buttons";

export default function Acnod(){
    return (
        <main>
            <div className={'container mx-auto my-24'}>
                <LinkButton href={'/#works'}>Back</LinkButton>
                <Heading1 className={'mt-8'}>Acnod</Heading1>
                <p className={'my-4'}>
                    Acnod is a project me and my friend <Link href={'https://skymmel.eu'}>Vojtěch
                    Skyba</Link> are working on. It is a freelance website on which we offer website development
                    services.
                </p>
                <div className={'flex gap-2'}>
                    <Tag className={'!bg-aero-300 !text-aero-950'} icon={<SiNextdotjs/>}>NextJS</Tag>
                    <Tag icon={<TbBrandThreejs/>}>ThreeJS</Tag>
                    <Tag icon={<SiI18Next/>}>I18Next</Tag>
                </div>
                <div className={'my-8'}>
                    <Heading2 className={'mb-4'}>Home page</Heading2>
                    <Suspense fallback={<Loading/>}>
                        <Image src={'/works/AcnodNET/AcnodNETHome.png'} alt={'Home page'} width={1600} height={1972}/>
                    </Suspense>
                </div>
            </div>
        </main>
    )
}