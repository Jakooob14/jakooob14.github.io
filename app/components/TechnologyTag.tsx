import Tag from '@/app/components/Tag';
import { HTMLAttributes, JSX } from 'react';
import { SiI18Next, SiNextdotjs } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';

export type Technology =
    | 'nextjs'
    | 'threejs'
    | 'i18next';

interface TechnologyTagProps extends HTMLAttributes<HTMLSpanElement> {
    technology: Technology;
    type?: 'primary' | 'secondary';
}

export default function TechnologyTag({ technology, type = 'secondary', className, ...props }: TechnologyTagProps) {
    const techNames: Record<Technology, string> = {
        nextjs: 'Next.js',
        threejs: 'Three.js',
        i18next: 'I18Next'
    };
    
    const icons: Record<Technology, JSX.Element> = {
        nextjs: <SiNextdotjs/>,
        threejs: <TbBrandThreejs/>,
        i18next: <SiI18Next/>
        
    };
    
    return (
        <Tag 
            icon={icons[technology]} 
            className={`${type === 'primary' && 'bg-aero-300! text-aero-950!'} ${className}`}
            {...props}
        >{techNames[technology]}</Tag>
    );
}