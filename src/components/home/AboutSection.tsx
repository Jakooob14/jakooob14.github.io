import { Heading1, Heading2 } from "@/components/Heading";
import TechnologyMarquee from "@/components/home/TechnologyMarquee";
import { useTranslations } from "next-intl";

export default function AboutSection() {
    const t = useTranslations("about");

    return (
        <section id="about" className="container mx-auto mt-24">
            <section>
                <Heading1 className="max-w-[600px]">{t("heading")}</Heading1>
                <span className="text-5xl">{t("lead")}</span>
                <div className="flex gap-8 w-full mt-8 items-center">
                    <div className="w-[350px] h-[120px] shrink-0 bg-primary-400 rounded-2xl"></div>
                    <span className="max-w-[700px]">{t("bio")}</span>
                </div>
            </section>
            <section className="mt-10">
                <Heading2
                    visualLevel={4}
                    variant="foreground"
                    className="mb-4"
                >
                    {t("technologies")}
                </Heading2>
                <TechnologyMarquee />
            </section>
        </section>
    );
}
