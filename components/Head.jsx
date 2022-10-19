import Head from "next/head";

const DHead = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/jakooob logo.svg"/>
        </Head>
    )
}

export default DHead;