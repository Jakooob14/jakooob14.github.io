import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
    const t = useTranslations("notFound");

    return (
        <main className="flex-1 flex flex-col items-center justify-center text-center p-8 pt-36">
            <span className="font-heading font-black text-7xl text-heading mb-2">
                {t("title")}
            </span>
            <h1 className="text-2xl font-bold font-heading mb-2">
                {t("heading")}
            </h1>
            <p className="text-foreground/70 mb-6 max-w-md">
                {t("description")}
            </p>
            <Link
                href="/"
                className="bg-foreground text-background px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
                {t("returnHome")}
            </Link>
        </main>
    );
}
