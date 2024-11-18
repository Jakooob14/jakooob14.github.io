'use client'

import {ReactNode, useEffect} from 'react';
import anime from 'animejs/lib/anime.es.js'

interface StretchedTextProps {
    children: ReactNode;
    className?: string;
}

export function StretchedTextByContainer({ children = '', className = '' }: StretchedTextProps) {
    return (
        <span className={'text-justify h-[1em] ' + className}>
            {children}
            <span className={'w-full inline-block'}></span>
        </span>
    );
}

interface StretchedTextByLetterSizeProps {
    className?: string;
    text: string;
    gap?: number;
    elementId?: string;
    thinnerLettersIndex?: number[]
}

export function StretchedTextByLetterSize({className, text, gap = 1.5, elementId, thinnerLettersIndex}: StretchedTextByLetterSizeProps){

    return(
        <span className={'relative block ' + className} style={{ width: `${text.length * gap - (text.length / 10)}em` }}>
            {Array.from(text).map((letter, index) => {
                return <span style={{marginLeft: `${index * gap - (thinnerLettersIndex?.includes(index) ? .1 : 0)}em`}} className={'absolute left-0 w-[1em]'} id={elementId} key={index}>{letter}</span>
            })}
            <span className={'invisible'}>{text}</span>
        </span>
    )
}