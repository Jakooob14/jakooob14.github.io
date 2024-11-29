'use client'

import {ReactNode, useEffect, useRef, useState} from "react";
import {motion, useTransform} from "motion/react";
import {useMotionValue, useSpring} from "framer-motion";

// const circleSize = 256;


interface CursorEffectElementMaskProps {
    children: ReactNode,
    className?: string
}

export default function HiddenText({ children, className = '', ...props }: CursorEffectElementMaskProps) {
    const [circleSize, setCircleSize] = useState(256)

    const circle = {
        x: useMotionValue(-1000),
        y: useMotionValue(-1000),
    }

    const smoothOptions = {
        damping: 30,
        stiffness: 350,
        mass: .5
    }

    const smoothCircle = {
        x: useSpring(circle.x, smoothOptions),
        y: useSpring(circle.y, smoothOptions)
    }

    const maskPosition = useTransform(
        [smoothCircle.x, smoothCircle.y],
        ([x, y]) => `${x}px ${y}px`
    );

    const elementRef = useRef<HTMLDivElement | null>(null);

    function getMaskDataUrl() {
        const svg = `
        <svg width="${circleSize}" height="${circleSize}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="black"/>
        </svg>
    `;
        return `url('data:image/svg+xml;base64,${btoa(svg)}')`;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMouseMove = (event: MouseEvent) => {
        if (!elementRef.current) return;

        const { clientX, clientY } = event;

        const element = event.target as HTMLElement;
        if (element.nodeName === 'A') {
            setCircleSize(0)
        } else {
            const rect = elementRef.current.getBoundingClientRect();
            circle.x.set(clientX - rect.x - circleSize / 2);
            circle.y.set(clientY - rect.y - circleSize / 2);
            setCircleSize(256)
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [handleMouseMove])


    return (
        <motion.div style={{WebkitMaskImage: getMaskDataUrl(), WebkitMaskRepeat: 'no-repeat', maskPosition: maskPosition}}
                    className={'pointer-events-none select-none ' + className}
                    {...props}
                    ref={elementRef}>
            {children}
        </motion.div>
    )
}