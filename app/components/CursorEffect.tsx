'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorEffect() {
    const cursorSize = 256;

    const hoveredOptions = {
        padding: {
            x: 15
        }
    }


    const mouse = {
        x: useMotionValue(-300),
        y: useMotionValue(-300),
    }

    const size = {
        width: useMotionValue(cursorSize),
        height: useMotionValue(cursorSize),
        borderRadius: useMotionValue(cursorSize / 2),
    }

    const smoothOptions = {
        damping: 20,
        stiffness: 300,
        mass: .5
    }

    const smoothOptionsPosition = {
        damping: 20,
        stiffness: 300,
        mass: .01
    }

    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    }

    const smoothSize = {
        width: useSpring(size.width, smoothOptionsPosition),
        height: useSpring(size.height, smoothOptionsPosition),
        borderRadius: useSpring(size.borderRadius, smoothOptionsPosition)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;

        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);

        if (!event.target) return;

        const element = event.target as HTMLElement;
        const keepWidth: boolean = element.getAttribute('data-keepwidth') == 'true';


        if (element.nodeName === 'A'){
            const rect = element.getBoundingClientRect();
            size.width.set(rect.width + (keepWidth ? 0 : hoveredOptions.padding.x));
            size.height.set(rect.height);
            size.borderRadius.set(Math.max(0, parseFloat(getComputedStyle(element).borderRadius)));
            mouse.x.set(rect.left - hoveredOptions.padding.x / 2);
            mouse.x.set(rect.left - (keepWidth ? 0 : hoveredOptions.padding.x / 2));
            mouse.y.set(rect.top);
        } else {
            size.width.set(cursorSize);
            size.height.set(cursorSize);
            size.borderRadius.set(cursorSize / 2);
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [handleMouseMove])

    return (
        <motion.div
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
                width: smoothSize.width,
                height: smoothSize.height,
                borderRadius: smoothSize.borderRadius,
            }}
            className={`fixed z-[1000] /border-[3px] border-alt-gray-900 pointer-events-none backdrop-invert`}>
        </motion.div>
    )
}