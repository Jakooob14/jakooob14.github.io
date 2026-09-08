'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

export interface EducationCardProps {
    title: ReactNode;
    institution: ReactNode;
    period: string;
    icon: ReactNode;
    className?: string;
    href: string;
}

export default function EducationCard({
    title,
    institution,
    period,
    icon,
    className = '',
    href
}: EducationCardProps) {
    return (
        <Link href={href} target='_blank' rel='noopener noreferrer'>
            <motion.div
                data-cursor-hover='true'
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className={`group relative flex flex-col justify-between p-5 bg-[hsl(0,0%,16%)] border-2 border-alt-gray-250 hover:border-aero-500 transition-colors duration-200 ${className}`}
            >
                <div>
                    <div className='flex items-center justify-between gap-3 mb-4'>
                        <div className='w-12 h-12 shrink-0 bg-alt-gray-200/50 border border-alt-gray-300/20 flex items-center justify-center p-2 transition-colors overflow-hidden'>
                            <div className='w-full h-full flex items-center justify-center text-white'>
                                {icon}
                            </div>
                        </div>
                        <span className='text-xs font-mono text-alt-gray-500 bg-alt-gray-200/40 px-2.5 py-1 border border-alt-gray-300/10 whitespace-nowrap'>
                        {period}
                    </span>
                    </div>

                    <h4 className='text-base font-semibold text-white group-hover:text-aero-400 transition-colors line-clamp-1'>
                        {title}
                    </h4>

                    <p className='text-sm text-alt-gray-500 mt-1 font-medium'>
                        {institution}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}
