import Link from "next/link";

export default function Page() {
    return (
        <>
            <h1 className={"text-3xl"}>Seems like the middleware did not work...</h1>
            <p>If you can please report this at <a href={'mailto:me@jakooob.dev'}>me@jakooob.dev</a></p>
            <p>Get to the right site <Link href={"/en"}>here</Link></p>
        </>
    )
}