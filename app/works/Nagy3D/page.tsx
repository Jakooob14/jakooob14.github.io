import {Heading1, Heading2} from "@/app/components/Headings";
import Image from "next/image";
import {Suspense} from "react";
import Loading from "@/app/components/Loading";
import Tag from "@/app/components/Tag";
import {SiI18Next, SiNextdotjs} from "react-icons/si";
import {LinkButton} from "@/app/components/Buttons";

export default function Acnod(){
    return (
        <main>
            <div className={'container mx-auto my-24'}>
                <LinkButton href={'/#works'}>Back</LinkButton>
                <Heading1 className={'mt-8'}>Nagy3D</Heading1>
                <p className={'my-4'}>
                    This website is for a company named Nagy 3D that offers 3D printing and scanning in the northwestern region of the Czech Republic. It offers a minimalistic and clean look so the user can have a good experience.
                </p>
                <div className={'flex gap-2'}>
                    <Tag className={'!bg-aero-300 !text-aero-950'} icon={<SiNextdotjs/>}>NextJS</Tag>
                    <Tag icon={<SiI18Next/>}>I18Next</Tag>
                </div>
                <div>
                    <div className={'my-8'}>
                        <Heading2 className={'mb-4'}>Home page</Heading2>
                        <Suspense fallback={<Loading/>}>
                            <Image src={'/works/Nagy3DCZ/Nagy3DCZHome.png'} alt={'Home page'} width={1600} height={1972}/>
                        </Suspense>
                    </div>
                    <div className={'my-8'}>
                        <Heading2 className={'mb-4'}>Services page</Heading2>
                        <Suspense fallback={<Loading/>}>
                            <Image src={'/works/Nagy3DCZ/Nagy3DCZServices.png'} alt={'Home page'} width={1600} height={1972}/>
                        </Suspense>
                    </div>
                    <div className={'my-8'}>
                        <Heading2 className={'mb-4'}>About page</Heading2>
                        <Suspense fallback={<Loading/>}>
                            <Image src={'/works/Nagy3DCZ/Nagy3DCZAbout.png'} alt={'Home page'} width={1600} height={1972}/>
                        </Suspense>
                    </div>
                    <div className={'my-8'}>
                        <Heading2 className={'mb-4'}>Contact page</Heading2>
                        <Suspense fallback={<Loading/>}>
                            <Image src={'/works/Nagy3DCZ/Nagy3DCZContact.png'} alt={'Home page'} width={1600} height={1972}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    )
}