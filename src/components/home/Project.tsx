import {HTMLAttributes} from "react";
import Image from "next/image";
import {Heading3} from "@/components/Heading";

interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    iconUrl: string;
    description: string;
}

export default function Project({ title, iconUrl, description }: ProjectProps) {
    return (
        <div className={'bg-neutral-100 p-8 rounded-3xl'}>
            <Heading3 className={'flex items-center gap-4'}>
                <div className={'w-16 h-16 bg-heading grid place-content-center rounded-2xl'}>
                    <Image className={'w-10 h-10'} src={iconUrl} alt={title} width={64} height={64}/>
                </div>
                {title}
            </Heading3>
            <p className={'mt-3'}>{description}</p>
            <div className={'h-[240px]'}></div>
        </div>
    );
}