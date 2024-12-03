import {ReactNode} from "react";

interface HeadingProps{
    children: ReactNode,
    className?: string
}

export function Heading1({children, className = '', ...props}: HeadingProps) {
    return <h1 className={'text-8xl w-fit tracking-wider font-semibold ' + className} {...props}>{children}</h1>
}

export function Heading2({children, className = '', ...props}: HeadingProps) {
    return <h2 className={'text-5xl w-fit tracking-wide font-semibold ' + className} {...props}>{children}</h2>
}