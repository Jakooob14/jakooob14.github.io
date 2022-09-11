import type { NextPage } from 'next'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/Projects.module.scss'
import nepIcon from '../public/nep icon.png'
import Image from 'next/image'
import Head from 'next/head'

const Projects: NextPage = () => {
  return (
    <>
    <Head>
        <title>Projects</title>
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Header />
    <main className={styles.main}>
        <div className={styles.projects}>
            <div className={styles.project}>
                <span><Image src={nepIcon} layout='fill' objectFit='contain' alt="Not enough PvP image"/></span>
                <div>
                    <h1><a href='https://github.com/Jakooob14/Not-Enough-PvP'>Not Enough PvP</a> (2022)</h1>
                    <p>Not Enough PvP or just NEP is a simple mod for Minecraft Fabric 1.19.2 that adds a missing armor HUD. So when you&apos;re in a fight you know instantly when an armor piece breaks so you can put on a new one. If I have more ideas I will add more features. If you have any ideas for this mod you can post them in the GitHub repo <a href='https://github.com/Jakooob14/Not-Enough-PvP/issues'>issues tab</a>.</p>
                </div>
            </div>
        </div>
    </main>
    <Footer />
    </>
  )
}

export default Projects
