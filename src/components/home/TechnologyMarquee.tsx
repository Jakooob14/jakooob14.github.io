import {ReactNode} from "react";
import {RiJavaFill, RiNextjsFill} from "react-icons/ri";
import {SiDocker, SiDotnet, SiNuxt, SiPostgresql, SiRedis} from "react-icons/si";

export default function TechnologyMarquee() {
    return (
        <div className={'flex items-center gap-12 overflow-hidden'}>
            <Technology icon={<RiNextjsFill/>}>Next.js</Technology>
            <Technology icon={<SiNuxt/>}>Nuxt.js</Technology>
            <Technology icon={<SiDotnet/>}>ASP.NET</Technology>
            <Technology icon={<RiJavaFill/>}>Java</Technology>
            <Technology icon={<SiDocker/>}>Docker</Technology>
            <Technology icon={<SiPostgresql/>}>PostgreSQL</Technology>
            <Technology icon={<SiRedis/>}>Redis</Technology>
        </div>
    );
}

interface TechnologyProps {
    icon: ReactNode;
    children: ReactNode;
}

function Technology({ icon, children }: TechnologyProps) {
    return (
        <div className={'flex gap-2 items-center'}>
            <span className={'text-4xl'}>{icon}</span>
            <span className={'text-3xl font-medium'}>{children}</span>
        </div>
    );
}