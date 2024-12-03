import {ReactNode} from "react";

interface HeadingProps{
    children: ReactNode,
    className?: string
}

export function Heading1({children, className = '', ...props}: HeadingProps) {
    return <h1 className={'text-8xl w-fit tracking-wider -ms-1.5 font-bold h-[1.1em] bg-clip-text text-transparent bg-[linear-gradient(90deg,#19b9e6_0%,#41caef_100%)] ' + className} {...props}>{children}</h1>
}

export function Heading2({children, className = '', ...props}: HeadingProps) {
    return <h2 className={'text-5xl w-fit tracking-wide font-[480] ' + className} {...props}>{children}</h2>
}