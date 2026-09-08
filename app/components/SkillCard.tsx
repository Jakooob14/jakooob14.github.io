'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

export interface SkillCardProps {
    name: string;
    icon: ReactNode;
    className?: string;
}

export default function SkillCard({
    name,
    icon,
    className = '',
}: SkillCardProps) {
    return (
        <motion.div
            data-cursor-hover='true'
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className={`group relative flex items-center gap-3.5 p-3 sm:p-3.5 bg-[hsl(0,0%,16%)] border-2 border-alt-gray-250 hover:border-aero-500 transition-colors duration-200 overflow-hidden ${className}`}
        >
            <div className='w-11 h-11 shrink-0 bg-alt-gray-200/50 border border-alt-gray-300/20 flex items-center justify-center p-2 transition-colors'>
                <div className='w-full h-full flex items-center justify-center text-white text-2xl transition-transform duration-200'>
                    {icon}
                </div>
            </div>

            <span className='font-heading font-bold text-base sm:text-lg text-white group-hover:text-aero-400 tracking-wide transition-colors truncate'>
                {name}
            </span>
        </motion.div>
    );
}
