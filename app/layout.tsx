import type { Metadata } from "next";
import "./globals.scss";
import Signature from "@/app/utilities/signature";
import CursorEffect from "@/app/components/CursorEffect";

export const metadata: Metadata = {
    title: "Jakub Sokol"
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased text-white`}>
                {/*<DebugBorder/>*/}
                {children}
                <Signature/>
                <CursorEffect/>
            </body>
        </html>
    );
}
