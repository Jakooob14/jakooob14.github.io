import Link from "next/link";
import {ReactNode} from "react";

interface DefaultProps{
    children: ReactNode,
    className?: string
}

interface LinkProps extends DefaultProps{
    href: string
}

export function LinkButton({children, className, href, ...props}: LinkProps){
    return <Link className={'px-4 py-1.5 bg-aero-500 text-black ' + className} href={href} {...props}>{children}</Link>
}