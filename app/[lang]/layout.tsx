
export default async function RootLayout({ children, params }: any) {
    return (
        <html lang={params.lang ? params.lang : "en"}>
            <body>{children}</body>
        </html>
    )
}