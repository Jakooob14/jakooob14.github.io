import '@/app/styles/globals.scss'
import {Metadata, Viewport} from "next";

export const metadata: Metadata = {
    title: {
      template: 'Jakooob | %s',
      default: 'Jakooob'
    },
    description: 'Jakooob\'s personal website',
    generator: 'Next.js',
    authors: [{name: 'Jakooob'}],
    creator: 'Jakooob',
    publisher: 'Jakooob',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    }
}

export const viewport: Viewport = {
    themeColor: 'blue',
}

export default async function RootLayout({ children }: {
  children: React.ReactNode
}) {
    return (
        // <html lang={params.lang ? params.lang : "en"}>
        <html>
        <body>{children}</body>
        </html>
    )
}
