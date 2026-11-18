import Card from "@/components/Card";
import { Heading1 } from "@/components/Heading";
import { useTranslations } from "next-intl";
import {
    LuAppWindow,
    LuGauge,
    LuGlobe,
    LuServer,
} from "react-icons/lu";
import { ReactNode } from "react";

interface ServiceDefinition {
    id: "webApps" | "websites" | "backend" | "optimization";
    stack: string;
    icon: ReactNode;
}

const services: ServiceDefinition[] = [
    {
        id: "webApps",
        stack: "React • Next.js • ASP.NET Core",
        icon: <LuAppWindow />,
    },
    {
        id: "websites",
        stack: "Next.js • Nuxt.js • Tailwind CSS",
        icon: <LuGlobe />,
    },
    {
        id: "backend",
        stack: "ASP.NET • Node.js • PostgreSQL",
        icon: <LuServer />,
    },
    {
        id: "optimization",
        stack: "Core Web Vitals • TypeScript • Docker",
        icon: <LuGauge />,
    },
];

export default function ServicesSection() {
    const t = useTranslations("services");

    return (
        <section id="services" className="container mx-auto mt-24">
            <Heading1 className="max-w-[750px] mb-0!">{t("heading")}</Heading1>
            <p className="text-xl sm:text-2xl text-foreground/75 max-w-[700px] mb-10">
                {t("subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {services.map((service) => (
                    <Card
                        key={service.id}
                        icon={service.icon}
                        title={t(`items.${service.id}.title`)}
                        subtitle={service.stack}
                        description={t(`items.${service.id}.description`)}
                        className="h-full"
                    />
                ))}
            </div>
        </section>
    );
}
