'use client';

import { useState } from "react";
import Link from "next/link";
import { Heading6 } from "@/components/Heading";
import socials from "@/data/socials";
import copy from "@/lib/copy";
import {
    LuArrowUpRight,
    LuCheck,
    LuCopy,
    LuGithub,
    LuInstagram,
    LuLinkedin,
    LuMail,
    LuMapPin,
    LuPhone
} from "react-icons/lu";
import { ReactNode } from "react";

export default function Footer() {
    const [copiedTarget, setCopiedTarget] = useState<string | null>(null);

    const handleCopy = async (text: string, id: string) => {
        const success = await copy(text);
        if (success) {
            setCopiedTarget(id);
            setTimeout(() => {
                setCopiedTarget((current) => (current === id ? null : current));
            }, 2000);
        }
    };

    const currentYear = new Date().getFullYear();

    const navLinks = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Certificates", href: "#certificates" },
    ];

    return (
        <footer id="contact" className="mt-20 pb-8">
            <div className="container mx-auto bg-neutral-100 rounded-3xl p-8 sm:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    <div className="flex flex-col gap-3">
                        <Link href="/" className="font-heading font-black text-2xl tracking-tighter text-heading w-fit">
                            Jakub Sokol
                        </Link>
                        <p className="text-foreground/75 text-sm leading-relaxed max-w-xs">
                            Full-stack developer focused on building modern, high-performance web applications.
                        </p>
                        <div className="flex flex-col gap-1 text-sm text-foreground/60 pt-2">
                            <span className="text-neutral-500">IČO: 29972736</span>
                        </div>
                    </div>

                    <nav aria-label="Footer navigation">
                        <Heading6 visualLevel={6} variant="heading" className="mb-3 text-lg sm:text-xl">
                            Navigation
                        </Heading6>
                        <ul className="flex flex-col gap-2 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-foreground/75 hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <Heading6 visualLevel={6} variant="heading" className="mb-3 text-lg sm:text-xl">
                            Contact
                        </Heading6>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Link
                                    href={`mailto:${socials.email}`}
                                    className="flex items-center gap-2 text-foreground/80 hover:text-accent transition-colors group"
                                >
                                    <LuMail className="w-4 h-4 shrink-0" aria-hidden="true" />
                                    <span>{socials.email}</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleCopy(socials.email, "email")}
                                    aria-label="Copy email address"
                                    title="Copy email address"
                                    className="p-1 rounded-md text-foreground/50 hover:text-accent hover:bg-neutral-200/60 transition-colors cursor-pointer"
                                >
                                    {copiedTarget === "email" ? (
                                        <span className="flex items-center gap-1 text-emerald-600 font-medium text-xs">
                                            <LuCheck className="w-4 h-4" aria-hidden="true" />
                                            <span className="sr-only sm:not-sr-only">Copied</span>
                                        </span>
                                    ) : (
                                        <LuCopy className="w-4 h-4" aria-hidden="true" />
                                    )}
                                </button>
                            </li>

                            <li className="flex items-center gap-2">
                                <Link
                                    href={`https://wa.me/${socials.phone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-foreground/80 hover:text-accent transition-colors group"
                                >
                                    <LuPhone className="w-4 h-4 shrink-0" aria-hidden="true" />
                                    <span>{socials.phone}</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleCopy(socials.phone, "phone")}
                                    aria-label="Copy phone number"
                                    title="Copy phone number"
                                    className="p-1 rounded-md text-foreground/50 hover:text-accent hover:bg-neutral-200/60 transition-colors cursor-pointer"
                                >
                                    {copiedTarget === "phone" ? (
                                        <span className="flex items-center gap-1 text-emerald-600 font-medium text-xs">
                                            <LuCheck className="w-4 h-4" aria-hidden="true" />
                                            <span className="sr-only sm:not-sr-only">Copied</span>
                                        </span>
                                    ) : (
                                        <LuCopy className="w-4 h-4" aria-hidden="true" />
                                    )}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <Heading6 visualLevel={6} variant="heading" className="mb-3 text-lg sm:text-xl">
                            Socials
                        </Heading6>
                        <ul className="flex flex-col gap-2 text-sm font-medium">
                            <li>
                                <SocialLink title="GitHub" href={socials.github.link} icon={<LuGithub />} />
                            </li>
                            <li>
                                <SocialLink title="LinkedIn" href={socials.linkedin.link} icon={<LuLinkedin />} />
                            </li>
                            <li>
                                <SocialLink title="Instagram" href={socials.instagram.link} icon={<LuInstagram />} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

interface SocialLinkProps {
    title: string;
    href: string;
    icon: ReactNode;
}

function SocialLink({ title, href, icon }: SocialLinkProps) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-foreground/75 hover:text-accent transition-colors w-fit"
        >
            <span className="w-4 h-4 flex items-center justify-center shrink-0">{icon}</span>
            <span>{title}</span>
        </Link>
    );
}
