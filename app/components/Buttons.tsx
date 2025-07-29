import Link from "next/link";
import {ReactNode} from "react";

interface DefaultProps{
    children: ReactNode,
    className?: string,
    onClick?: () => void
}

interface LinkProps extends DefaultProps{
    href: string,
    rel?: string,
    target?: string
}

export function LinkButton({children, className, href, rel = 'noreferrer', ...props}: LinkProps){
    return <Link className={'px-4 py-1.5 bg-aero-500 text-black ' + className} href={href} rel={rel} {...props}>{children}</Link>
}
export function AnchorButton({children, className, onClick, ...props}: DefaultProps){
    return <a className={'px-4 py-1.5 bg-aero-500 text-black ' + className} onClick={onClick} {...props}>{children}</a>
}
