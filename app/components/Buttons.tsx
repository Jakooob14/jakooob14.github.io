// components/ui/Button.tsx

import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
    children: ReactNode;
    className?: string;
};

type LinkButtonProps = BaseProps & {
    href: string;
    target?: string;
    rel?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

function baseStyles(className?: string) {
    return 'px-4 py-1.5 bg-aero-500 text-black cursor-pointer ' + className;
}

export function LinkButton({ children, className, href, rel = 'noreferrer', ...props }: LinkButtonProps) {
    return (
        <Link
            href={href}
            rel={rel}
            className={baseStyles(className)}
            {...props}
        >
            {children}
        </Link>
    );
}

export function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            className={baseStyles(className)}
            {...props}
        >
            {children}
        </button>
    );
}