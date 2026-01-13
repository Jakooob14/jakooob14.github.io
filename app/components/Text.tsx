'use client'

import { ReactNode } from 'react';

interface StretchedTextProps {
    children: ReactNode,
    className?: string
}

export function StretchedTextByContainer({ children = '', className = '' }: StretchedTextProps) {
    return (
        <span className={ 'text-justify h-[1em] ' + className }>
            {children}
            <span className={ 'w-full inline-block' }></span>
        </span>
    );
}

interface StretchedTextByLetterSizeProps {
    className?: string,
    text: string,
    gap?: number,
    elementId?: string,
    thinnerLettersIndex?: number[]
}

export function StretchedTextByLetterSize({ className, text, gap = 1.5, elementId, thinnerLettersIndex }: StretchedTextByLetterSizeProps){
    // const textRef = useRef<HTMLSpanElement>(null);
    // const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
    // const [textWidth, setTextWidth] = useState('0px')
    //
    // useEffect(() => {
    //     if (!textRef.current || !lettersRef.current) return;
    //
    //     const letterWidths: number[] = [];
    //     lettersRef.current.forEach((el) => {
    //         if (!el || !el.parentElement) return;
    //         const marginLeft = parseFloat(el.style.marginLeft) * parseFloat(getComputedStyle(el).fontSize);
    //         const width = el.clientWidth + marginLeft;
    //
    //         letterWidths.push(width);
    //     })
    //
    //     setTextWidth(Math.max(...letterWidths) + 'px');
    //     // setTextHeight(lettersRef.current[0]?.clientHeight + 'px');
    // }, [text, gap, thinnerLettersIndex]);

    return(
            <span className={ 'relative block ' + className }>
            {Array.from(text).map((letter, index) => {
                return <span
                    style={ { marginLeft: `${index * gap - (thinnerLettersIndex?.includes(index) ? .1 : 0)}em` } }
                    className={ 'absolute left-0 w-[1em]' } id={ elementId } key={ index }>{letter}</span>
            })}
                <span className={ 'invisible' }>{text}</span>
        </span>
    )
}