import "./globals.css";
import Link from "next/link";
import { defaultLocale } from "@/i18n/config";

export default function RootNotFound() {
    return (
        <html lang={defaultLocale} className="h-full antialiased">
            <body className="min-h-full flex flex-col items-center justify-center text-center p-8 bg-background text-foreground">
                <div className="max-w-md mx-auto flex flex-col items-center gap-4">
                    <span className="font-heading font-black text-7xl text-heading">404</span>
                    <h1 className="text-2xl font-bold font-heading">Page Not Found</h1>
                    <p className="text-foreground/70">
                        The page you are looking for does not exist or has been moved.
                    </p>
                    <Link
                        href={`/${defaultLocale}`}
                        className="mt-4 bg-foreground text-background px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                        Return Home
                    </Link>
                </div>
            </body>
        </html>
    );
}
