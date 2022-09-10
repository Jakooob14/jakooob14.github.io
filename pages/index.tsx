import type { NextPage } from 'next'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/Home.module.scss'
import bgMountains from '../public/mountains/bgmountains.png'
import fgMountains from '../public/mountains/fgmountains.png'
import gradient from '../public/mountains/gradient.png'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.loadingoverlay}></div>
        <div id='bgwrapper' className={styles.bgwrapper}>
          <div id='bg' className={`${styles.bgimage} ${styles.bg}`}></div>
          <div id='stars' className={`${styles.bgimage} ${styles.stars}`}></div>
          <h1 id='name'>Jakooob</h1>
          <h2 id='occ'>student & developer</h2>
          <div id='bgmountains' className={`${styles.bgimage} ${styles.bgmountains}`}><Image src={bgMountains} layout='fill' alt="Background mountains"></Image></div>
          <div id='gradient' className={`${styles.bgimage} ${styles.gradient}`}><Image src={gradient}layout='fill' alt="Gradient"></Image></div>
          <div id='fgmountains' className={`${styles.bgimage} ${styles.fgmountains}`}><Image src={fgMountains}layout='fill' alt="Foreground mountains"></Image></div>
        </div>
        <div className={styles.about}>
          <h2>About me</h2>
          <p>Hello, my name is Jakub Sokol I am an IT student from the Czech Republic and I have always had an adoration for computers and other forms of technology since I was little. My passion only grew stronger as I got to understand the inner workings of games and now my dream is to develop them. </p>
          <p>See my projects at the <Link href='/projects'>projects</Link> page. And you can contact me either through my email <a href='mailto:sokoljakub14@gmail.com'>sokoljakub14@gmail.com</a> or Instagram <a href='https://instagram.com/Jakooob14' target='_BLANK' rel="noreferrer">Jakooob14</a>.</p>
          
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home
