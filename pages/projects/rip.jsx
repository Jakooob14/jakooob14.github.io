import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Image from 'next/image';
import DHead from "../../components/Head";
import styles from "/styles/Projects.Rip.module.scss";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
const Rip = () => {
    const router = useRouter();
    const urlTo = router.query.url;
    const name = router.query.name;

    const [countdown, setCountdown] = useState(5);
    if (countdown > 0){
        setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);
    }

    return (
        <>
            <DHead title="Jakooob | Warning"/>

            <Header />
            <main className={styles.main}>
                <div>
                    <h1>WARNING!</h1>
                    <p>{name ? name : urlTo} has unfortunately died. So now the domain is probably not theirs anymore, so take caution visiting this domain, as someone with bad intent could&apos;ve put malicious stuff there, so beware!</p>
                    <div><a className={countdown === 0 ? styles.active : null} href={urlTo}  rel='noreferrer noopener'>{urlTo}</a><p className={`${styles.countdown} ${countdown === 0 ? styles.disabled : null}`}>{countdown}</p></div>
                    <Link href={"/projects"}>I&apos;d rather go back</Link>
                </div>
            </main>
            <Footer />
        </>
    )
}



export default Rip
