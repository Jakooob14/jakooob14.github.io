import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import CertificatesSection from "@/components/home/CertificatesSection";

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isValidLocale(locale)) notFound();

    setRequestLocale(locale);

    return (
        <div>
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
            <CertificatesSection />
        </div>
    );
}
