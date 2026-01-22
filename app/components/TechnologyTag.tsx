import Tag from '@/app/components/Tag';
import { HTMLAttributes, JSX } from 'react';
import { SiNextdotjs } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';

export type Technology =
    | 'nextjs'
    | 'threejs';

interface TechnologyTagProps extends HTMLAttributes<HTMLSpanElement> {
    technology: Technology;
    type?: 'primary' | 'secondary';
}

export default function TechnologyTag({ technology, type = 'secondary', className, ...props }: TechnologyTagProps) {
    const techNames: Record<Technology, string> = {
        nextjs: 'Next.js',
        threejs: 'Three.js'
    };
    
    const icons: Record<Technology, JSX.Element> = {
        nextjs: <SiNextdotjs/>,
        threejs: <TbBrandThreejs/>
    };
    
    return (
        <Tag 
            icon={icons[technology]} 
            className={`${type === 'primary' && 'bg-aero-300! text-aero-950!'} ${className}`}
            {...props}
        >{techNames[technology]}</Tag>
    );
}