'use client';

import {Heading6} from "@/components/Heading";
import Link from "next/link";
import socials from "@/data/socials";
import copy from "@/lib/copy";
import {LuCopy, LuGithub, LuInstagram, LuLinkedin, LuMail, LuPhone} from "react-icons/lu";
import {ReactNode} from "react";

export default function Footer() {
    return (
        <footer className={'mt-12 pb-8'}>
            <div className={'container mx-auto bg-neutral-100 rounded-3xl p-8'}>
                <section>
                    <Heading6>Contact</Heading6>
                    <ul className={'flex flex-col'}>
                        <li><SocialLink title="GitHub" href={socials.github.link} icon={<LuGithub/>} /></li>
                        <li><SocialLink title="LinkedIn" href={socials.linkedin.link} icon={<LuLinkedin/>} /></li>
                        <li><SocialLink title="Instagram" href={socials.instagram.link} icon={<LuInstagram/>} /></li>
                        <li className={'flex items-center gap-2'}>
                            <SocialLink title={socials.email} href={`mailto:${socials.email}`} icon={<LuMail/>} />
                            <button
                                onClick={() => copy(socials.email)}
                                aria-label="Copy email address"
                                className={'w-4 h-4 flex items-center justify-center shrink-0 hover:text-accent transition-colors cursor-pointer'}
                            >
                                <LuCopy aria-hidden="true" className={'w-4 h-4'}/>
                            </button>
                        </li>
                        <li className={'flex items-center gap-2'}>
                            <SocialLink title={socials.phone} href={`https://wa.me/${socials.phone.replace(/\D/g, '')}`} icon={<LuPhone/>} />
                            <button
                                onClick={() => copy(socials.phone)}
                                aria-label="Copy phone number"
                                className={'w-4 h-4 flex items-center justify-center shrink-0 hover:text-accent transition-colors cursor-pointer'}
                            >
                                <LuCopy aria-hidden="true" className={'w-4 h-4'}/>
                            </button>
                        </li>
                        <li>IČO: 29972736</li>
                    </ul>
                </section>
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
        <Link href={href} className={'flex items-center gap-2 w-fit'} target={href.includes('mailto:') ? '' : '_blank'}>
            <span className={'w-4 h-4 flex items-center justify-center shrink-0'}>{icon}</span>
            <span>{title}</span>
        </Link>
    );
}
