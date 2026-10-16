'use client';

import { LuAtSign, LuLanguages } from "react-icons/lu";
import Link from "next/link";
import { useScroll, motion, useTransform } from "motion/react";

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
    ]

    const position = useTransform(scrollY, (value) =>
        value > 54 ? "fixed" : "absolute"
    );

    const top = useTransform(scrollY, (value) =>
        value > 54 ? 26 : 80
    );

    return (
        <motion.header 
            className="w-full"
            style={{ position, top }}
        >
            <nav className="relative container mx-auto flex justify-between">
                <section>
                    <IconContainer>
                        <span className={'font-heading font-black'}>JS</span>
                    </IconContainer>
                </section>
                <ul className={'flex gap-6 h-12 items-center bg-background rounded-full px-2 font-medium'}>
                    {links.map((link) => (
                        <li key={link.path}>
                            <Link href={link.path} className={`${link.active ? 'bg-foreground text-background' : 'hover:bg-foreground/15'}  px-4 py-1.75 rounded-full transition-colors`}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <section className={'flex gap-4'}>
                    <IconContainer>
                        <LuAtSign/>
                    </IconContainer>
                    <IconContainer>
                        <LuLanguages/>
                    </IconContainer>
                </section>
            </nav>
        </motion.header>
    );
}

function IconContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className={'bg-background grid place-content-center rounded-full w-12 h-12 text-xl'}>
            {children}
        </div>
    );
}