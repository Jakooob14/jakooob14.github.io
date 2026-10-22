import {HTMLAttributes} from "react";
import Image from "next/image";
import {Heading3} from "@/components/Heading";

interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    iconUrl: string;
}

export default function Project({ children, title, iconUrl }: ProjectProps) {
    return (
        <div>
            <Heading3 className={'flex items-center gap-4'}>
                <div className={'w-16 h-16 bg-heading grid place-content-center rounded-2xl'}>
                    <Image className={'w-10 h-10'} src={iconUrl} alt={title} width={64} height={64}/>
                </div>
                {title}
            </Heading3>
            {children}
        </div>
    );
}