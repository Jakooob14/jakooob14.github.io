'use client'

import { useEffect, useState } from 'react';

export default function DebugBorder({ elementName = 'body' }){
    const [hovered, setHovered] = useState<HTMLElement>();

    useEffect(() => {
        const element = document.querySelector(elementName);
        if (!element) throw new Error('Element not found')

        const depths: number[] = []

        getAllChildren(element).forEach((el) => depths.push(getDepth(el)));

        getAllChildren(element).forEach((el) => {
            const depth = getDepth(el);

            el.style.border = `1px solid hsl(${depth * (360 / Math.max(...depths))}, 100%, 50%)`;
        })

        document.addEventListener('mouseover', (event: MouseEvent) => {
            const element = event.target as HTMLElement;
            if (!element) return;
            setHovered(element);
        })
    }, [elementName]);

    return(
        <div data-skipdebug={true} className={'bg-black w-full overflow-hidden fixed h-fit'}>
            <span className={'text-white text-ellipsis overflow-hidden whitespace-nowrap'}>
                {hovered ? hovered.nodeName.toLowerCase() +
                    ' innerText: ' + hovered.innerText
                    : 'none'}
            </span>
        </div>
    )
}


function getAllChildren(element: Element) {
    if (element) {
        const getChildren = (element: Element): HTMLElement[] => {
            const children: HTMLElement[] = [];
            element.childNodes.forEach((node) => {
                if (node instanceof HTMLElement && !node.getAttribute('data-skipdebug')) {
                    children.push(node);
                    children.push(...getChildren(node));
                }
            });
            return children;
        };

        return getChildren(element);
    }
    return [];
}


function getDepth(element: HTMLElement | null) {
    if (!element) return 0;

    let depth = 0;
    while (element) {
        if (element.getAttribute('data-skipdebug')) continue;
        depth++;
        element = element.parentElement;
    }
    return depth;
}