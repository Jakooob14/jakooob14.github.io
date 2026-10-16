'use client';

import {LuAtSign, LuInstagram, LuLanguages, LuLinkedin} from "react-icons/lu";
import Link from "next/link";
import { useScroll, motion, useTransform } from "motion/react";
import { HTMLAttributes, ReactNode } from "react";
import Dropdown, { DropdownItem } from "./Dropdown";

export { default as Dropdown } from "./Dropdown";
export type { DropdownItem, DropdownProps } from "./Dropdown";

export default function Header() {
    const { scrollY } = useScroll();
    
    const links = [
        {
            path: "#home",
            label: "Home",
            active: true,
        },
        {
            path: "#about",
            label: "About"
        },
        {
            path: "#contact",
            label: "Contact"
        },
    ];

    const position = useTransform(scrollY, (value) =>
        value > 54 ? "fixed" : "absolute"
    );

    const top = useTransform(scrollY, (value) =>
        value > 54 ? 26 : 80
    );

    return (
        <motion.header 
            className={'w-full z-40'}
            style={{ position, top }}
        >
            <nav className={'relative container mx-auto flex justify-between'}>
                <section>
                    <Link href={'/'}>
                        <IconContainer>
                            <span className={'font-heading font-black'}>JS</span>
                        </IconContainer>
                    </Link>
                </section>
                <ul className={'flex gap-6 h-12 items-center bg-background rounded-full px-2 font-medium'}>
                    {links.map((link) => (
                        <li key={link.path}>
                            <Link href={link.path} className={`${link.active ? 'bg-foreground text-background' : 'hover:bg-foreground/15'}  px-4 py-1.75 rounded-full transition-colors duration-100`}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <section className={'flex gap-4'}>
                    <Dropdown 
                        items={[
                            { label: "LinkedIn", href: "https://linkedin.com/in/sokoljakub", icon: <LuLinkedin /> },
                            { label: "Instagram", href: "https://instagram.com/jakooob14", icon: <LuInstagram /> }
                        ]} 
                        align="right"
                    >
                        <IconContainer aria-label="Contact options">
                            <LuAtSign />
                        </IconContainer>
                    </Dropdown>

                    <Dropdown 
                        items={[
                            { label: "English", active: true },
                            { label: "Česky" }
                        ]}
                        align="right"
                    >
                        <IconContainer aria-label="Select language">
                            <LuLanguages />
                        </IconContainer>
                    </Dropdown>
                </section>
            </nav>
        </motion.header>
    );
}

interface IconContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

function IconContainer({ children, className = '', ...props }: IconContainerProps) {
    return (
        <div
            className={`bg-background grid place-content-center rounded-full w-12 h-12 text-xl relative transition-colors duration-150 hover:bg-foreground hover:text-background ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
