import { ReactNode } from 'react';

interface TagProps{
    children: string,
    className?: string,
    icon?: ReactNode
}

export default function Tag({ children, className, icon }: TagProps){
    return <span className={className + ' h-full py-1 px-3 bg-alt-gray-300 text-alt-gray-950 font-medium text-sm flex items-center gap-1'}>{icon}{children}</span>;
}
