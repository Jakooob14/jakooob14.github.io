import '@/app/styles/globals.scss'
import {Metadata} from "next";

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
    colorScheme: 'dark',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body>{children}</body>
      </html>
  )
}
