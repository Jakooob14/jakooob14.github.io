import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: '404'
}

export default function NotFound() {
    return (
        <>
            <Header/>
            <main className={'min-h-[calc(100vh-8rem)] flex items-center'}>
                <div className={'container mx-auto text-center'}>
                    <h1 className={'text-9xl font-bold mb-6'}>404</h1>
                    <h2 className={'uppercase text-4xl'}>This page does not exist</h2>
                </div>
            </main>
            <Footer/>
        </>
    )
}