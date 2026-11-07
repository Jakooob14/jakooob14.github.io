import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { locales, defaultLocale, isValidLocale } from "@/i18n/config";

const nexa = localFont({
    src: [
        {
            path: "../../../public/fonts/Nexa/Nexa-ExtraLight.ttf",
            weight: "200",
        },
        {
            path: "../../../public/fonts/Nexa/Nexa-Heavy.ttf",
            weight: "900",
        },
    ],
    variable: "--font-nexa",
});

const hostGrotesk = localFont({
    src: [
        {
            path: "../../../public/fonts/Host Grotesk/HostGrotesk-VariableFont_wght.ttf",
        },
        {
            path: "../../../public/fonts/Host Grotesk/HostGrotesk-Italic-VariableFont_wght.ttf",
            style: "italic",
        },
    ],
    variable: "--font-host-grotesk",
});

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isValidLocale(locale)) return {};

    const t = await getTranslations({ locale, namespace: "metadata" });

    const languages: Record<string, string> = {};
    for (const loc of locales) {
        languages[loc] = `https://jakubsokol.cz/${loc}`;
    }
    languages["x-default"] = `https://jakubsokol.cz/${defaultLocale}`;

    return {
        metadataBase: new URL("https://jakubsokol.cz"),
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `https://jakubsokol.cz/${locale}`,
            languages,
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `https://jakubsokol.cz/${locale}`,
            siteName: "Jakub Sokol",
            locale: locale === "cs" ? "cs_CZ" : "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isValidLocale(locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={`${nexa.variable} ${hostGrotesk.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col h-[1500px]">
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
