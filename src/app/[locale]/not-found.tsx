import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
    const tNav = useTranslations("nav");

    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-4xl font-bold font-heading mb-4">404</h2>
            <p className="text-foreground/70 mb-6">Page not found</p>
            <Link
                href="/"
                className="bg-foreground text-background px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
                {tNav("home")}
            </Link>
        </div>
    );
}
