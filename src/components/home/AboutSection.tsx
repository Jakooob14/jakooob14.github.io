import Card from "@/components/Card";
import { Heading1, Heading2 } from "@/components/Heading";
import TechnologyMarquee from "@/components/home/TechnologyMarquee";
import { useTranslations } from "next-intl";
import { SiDotnet, SiNuxt, SiReact, SiVuedotjs } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { LuBriefcase, LuGraduationCap } from "react-icons/lu";

export default function AboutSection() {
    const t = useTranslations("about");
    
    const iconClassname = "inline-block pb-[0.5%] pt-[0.1%] mr-[0.4%] text-heading.";

    return (
        <section id="about" className="container mx-auto mt-24">
            <section>
                <Heading1 className="max-w-[600px]">{t("heading")}</Heading1>
                <span className="text-5xl">{t("lead")}</span>
                <div className="flex gap-8 w-full mt-8 items-center">
                    <div className="w-[350px] h-[120px] shrink-0 bg-primary-400 rounded-2xl"></div>
                    <span className="max-w-[700px]">{t.rich("bio", {
                        react: () => <SiReact className={iconClassname}/>,
                        nextjs: () => <RiNextjsFill className={iconClassname}/>,
                        vue: () => <SiVuedotjs className={iconClassname}/>,
                        nuxtjs: () => <SiNuxt className={iconClassname}/>,
                        aspnet: () => <SiDotnet className={iconClassname}/>
                    })}</span>
                </div>
            </section>

            <section className="mt-10">
                <Heading2
                    visualLevel={4}
                    variant="foreground"
                    className="mb-4"
                >
                    {t("background.heading")}
                </Heading2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <Card
                        icon={<LuGraduationCap />}
                        title={t("background.education.title")}
                        subtitle={t("background.education.institution")}
                        year={t("background.education.year")}
                        description={t("background.education.description")}
                        className="h-full"
                    />
                    <Card
                        icon={<LuBriefcase />}
                        title={t("background.experience.title")}
                        subtitle={t("background.experience.company")}
                        year={t("background.experience.year")}
                        description={t("background.experience.description")}
                        link={{
                            href: "/portfolio",
                            label: t("background.experience.cta"),
                        }}
                        className="h-full"
                    />
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
