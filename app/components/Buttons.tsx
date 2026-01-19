import Link from 'next/link';
import { HTMLAttributes, ReactNode } from 'react';

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
    target?: string;
}

export function LinkButton({ children, className, href, rel = 'noreferrer', ...props }: LinkProps){
    return <Link className={'px-4 py-1.5 bg-aero-500 text-black ' + className} href={href} rel={rel} {...props}>{children}</Link>;
}
export function AnchorButton({ children, className, onClick, ...props }: LinkProps){
    return <a className={'px-4 py-1.5 bg-aero-500 text-black ' + className} onClick={onClick} {...props}>{children}</a>;
}
