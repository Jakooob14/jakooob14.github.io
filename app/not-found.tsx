import {Heading1} from "@/app/components/Headings";
import Link from "next/link";

export default function NotFound(){
    return (
        <main className={'h-[calc(100vh-246px)]'}>
            <div className={'container mx-auto flex justify-center flex-col h-full'}>
                <Heading1>404 - Not found</Heading1>
                <Link href={'/'} className={'text-5xl mt-8 w-fit'}>Home</Link>
            </div>
        </main>
    )
}