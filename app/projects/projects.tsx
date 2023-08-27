'use client';

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image, {StaticImageData} from "next/image";
import {FunctionComponent, useEffect} from "react";
import Link from "next/link";
import nepIcon from "@/public/project images/nep icon.png"
import mejsczIcon from "@/public/project images/mejs.cz icon.svg"
import acnodIcon from "@/public/project images/acnod-logo-small.svg"

export default function Projects() {
    return (
        <>
            <Header/>
            <main>
                <div className={'container mx-auto px-6'}>
                    <div className={'flex w-full flex-col items-center justify-center my-20'}>
                        <Project title={"Not Enough PvP"} url={"https://github.com/Jakooob14/Not-Enough-PvP"} year={"2022"} image={nepIcon} imageAlt={"Nep Icon"} limbo>Not Enough PvP or just NEP is a simple mod for Minecraft Fabric 1.19.2 that adds a missing armor HUD. So when you&apos;re in a fight you know instantly when an armor piece breaks so you can put on a new one. If I have more ideas I will add more features. If you have any ideas for this mod you can post them in the GitHub repo <a href='https://github.com/Jakooob14/Not-Enough-PvP/issues' target='_BLANK' rel='noreferrer noopener'>issues tab</a>.</Project>
                        <Project title={"Mejs.cz"} url={"https://mejs.cz"} year={"2022"} image={mejsczIcon} imageAlt={"MejsCZ Icon"} dead>Mejs.cz is a Czech website made with NextJS for a Minecraft server with the same name. I made this website with my friend <a href='https://skymmel.eu' target='_BLANK' rel='noreferrer noopener'>Skymmel</a>.</Project>
                        <Project title={"Acnod"} url={"https://acnod.net"} year={"2022"} image={acnodIcon} imageAlt={"Acnod Icon"} imagePadding={'20px'}>Acnod is a project me and <a href={'https://skymmel.eu'} target={'_blank'} rel={'noreferrer noopener'}>Skymmel</a> are working on. It is a freelance website on which we offer website development services.</Project>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

type ProjectProps = {
    children: any;
    title: string;
    url?: string;
    year?: number | string;
    image: StaticImageData;
    imageAlt: string;
    imagePadding?: string;
    dead?: boolean;
    limbo?: boolean;
}

const Project: FunctionComponent<ProjectProps> = (props) => {
    useEffect(() => {
        // $('img').css('padding', imagePadding);
    })
    return (
        <div className={'flex flex-wrap items-center my-10 justify-center'}>
            {props.image ? <span className={'relative w-64 h-64 border-8 border-blue-950 bg-blue-950 rounded-xl mb-6 lg:mb-auto'} style={{padding: props.imagePadding}}><div style={{position: 'relative', height: '100%', width: '100%'}}><Image className={'rounded-lg w-full h-full'} src={props.image} alt={props.imageAlt}/></div></span> : null}
            <div className={'flex flex-col flex-wrap lg:w-[512px] lg:ms-10 items-center'}>
                <h1 className={'text-4xl font-bold text-center mb-4'}>
                    {
                        props.dead ?
                            <Link href={{pathname: "/projects/rip", query: {url: props.url, name: props.title} }}>{props.title}</Link> :
                            <a href={props.url} target='_BLANK' rel='noreferrer noopener'>{props.title}</a>
                    }
                    {props.year ? <> ({props.year})</> : null}
                    {props.dead ? <b title={"This app is no longer running"} onClick={() => {alert("This app is no longer running")}}> ☠️</b> : null}
                    {props.limbo ? <b title={"In limbo"} onClick={() => {alert("In limbo")}}> ❓</b> : null}
                </h1>
                <p className={'text-xl'}>{props.children}</p>
            </div>
        </div>
    )
}