'use client';

import {LuAtSign, LuGithub, LuInstagram, LuLanguages, LuLinkedin} from "react-icons/lu";
import Link from "next/link";
import { useScroll, motion, useTransform } from "motion/react";
import { HTMLAttributes, ReactNode } from "react";
import Dropdown, { DropdownItem } from "./Dropdown";
import IconContainer from "@/components/IconContainer";
import socials from "@/data/socials";

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
                <section className={'shadow-lg rounded-full'}>
                    <Link href={'/'}>
                        <IconContainer>
                            <span className={'font-heading font-black'}>JS</span>
                        </IconContainer>
                    </Link>
                </section>
                <ul className={'flex gap-6 h-12 items-center bg-background rounded-full px-2 font-medium shadow-lg'}>
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
                            { label: "GitHub", href: socials.github.link, icon: <LuGithub /> },
                            { label: "LinkedIn", href: socials.linkedin.link, icon: <LuLinkedin /> },
                            { label: "Instagram", href: socials.instagram.link, icon: <LuInstagram /> }
                        ]} 
                        align="right"
                    >
                        <IconContainer aria-label="Contact options" className={'shadow-lg'}>
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
                        <IconContainer aria-label="Select language" className={'shadow-lg'}>
                            <LuLanguages />
                        </IconContainer>
                    </Dropdown>
                </section>
            </nav>
        </motion.header>
    );
}