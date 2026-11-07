'use client';

import { LuAtSign, LuGithub, LuInstagram, LuLanguages, LuLinkedin } from "react-icons/lu";
import { useScroll, motion, useTransform } from "motion/react";
import Dropdown, { DropdownItem } from "./Dropdown";
import IconContainer from "@/components/IconContainer";
import socials from "@/data/socials";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, localeLabels, Locale } from "@/i18n/config";
import { setLocaleCookie } from "@/lib/cookies";

export { default as Dropdown } from "./Dropdown";
export type { DropdownItem, DropdownProps } from "./Dropdown";

export default function Header() {
    const { scrollY } = useScroll();
    const locale = useLocale();
    const tNav = useTranslations("nav");
    const pathname = usePathname();
    const router = useRouter();

    const isHomePage = pathname === "/";

    const navItems = [
        { id: "home", label: tNav("home") },
        { id: "about", label: tNav("about") },
        { id: "portfolio", label: tNav("portfolio") },
        { id: "certificates", label: tNav("certificates") },
        { id: "contact", label: tNav("contact") },
    ];

    const links = navItems.map((item) => ({
        href: isHomePage ? `#${item.id}` : `/${locale}#${item.id}`,
        label: item.label,
    }));

    const position = useTransform(scrollY, (value) =>
        value > 54 ? "fixed" : "absolute"
    );

    const top = useTransform(scrollY, (value) =>
        value > 54 ? 26 : 80
    );

    const handleLocaleChange = (newLocale: Locale) => {
        if (newLocale === locale) return;
        setLocaleCookie(newLocale);
        router.replace(pathname, { locale: newLocale });
    };

    const languageItems: DropdownItem[] = locales.map((loc) => ({
        label: localeLabels[loc] ?? loc.toUpperCase(),
        active: loc === locale,
        onClick: () => handleLocaleChange(loc),
    }));

    return (
        <motion.header 
            className={'w-full z-40'}
            style={{ position, top }}
        >
            <nav className={'relative container mx-auto flex justify-between'}>
                <section className={'shadow-lg rounded-full'}>
                    <a href={isHomePage ? "#home" : `/${locale}`}>
                        <IconContainer>
                            <span className={'font-heading font-black'}>JS</span>
                        </IconContainer>
                    </a>
                </section>
                <ul className={'flex gap-6 h-12 items-center bg-background rounded-full px-2 py-1.75 font-medium shadow-lg'}>
                    {links.map((link, idx) => (
                        <li key={link.href} className={'h-full'}>
                            <a 
                                href={link.href} 
                                className={`${idx === 0 ? 'bg-foreground text-background hover:text-background' : 'hover:bg-foreground/15 hover:text-foreground'} px-4 h-full grid place-content-center rounded-full transition-colors duration-100`}
                            >
                                {link.label}
                            </a>
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
                        <IconContainer aria-label={tNav("contactOptions")} className={'shadow-lg'}>
                            <LuAtSign />
                        </IconContainer>
                    </Dropdown>

                    <Dropdown 
                        items={languageItems}
                        align="right"
                    >
                        <IconContainer aria-label={tNav("selectLanguage")} className={'shadow-lg'}>
                            <LuLanguages />
                        </IconContainer>
                    </Dropdown>
                </section>
            </nav>
        </motion.header>
    );
}
