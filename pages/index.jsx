import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/Home.module.scss'
import bgMountains from '../public/mountains/bgmountains.png'
import fgMountains from '../public/mountains/fgmountains.png'
import gradient from '../public/mountains/gradient.png'
import Image from 'next/image'
import Link from 'next/link'
import DHead from "../components/Head";

const Home = () => {
  return (
    <>
      <DHead title="Jakooob | Home"/>

      <Header />
      <main className={styles.main}>
        <div className={styles.loadingoverlay}/>
        <div id='bgwrapper' className={styles.bgwrapper}>
          <div id='bg' className={`${styles.bgimage} draggable={"false"} ${styles.bg}`}/>
          <div id='stars' className={`${styles.bgimage} draggable={"false"} ${styles.stars}`}/>
          <h1 id='name'>Jakooob</h1>
          <h2 id='occ'>student & developer</h2>
          <div id='bgmountains' className={`${styles.bgimage} ${styles.bgmountains}`}><Image draggable={"false"} src={bgMountains} layout='fill' alt="Background mountains" priority/></div>
          <div id='gradient' className={`${styles.bgimage} ${styles.gradient}`}><Image draggable={"false"} src={gradient}layout='fill' alt="Gradient" priority/></div>
          <div id='fgmountains' className={`${styles.bgimage} ${styles.fgmountains}`}><Image draggable={"false"} src={fgMountains}layout='fill' alt="Foreground mountains" priority/></div>
        </div>
          <div className={styles.about}>
              <h2>About me</h2>
              <p>Hello, my name is Jakub Sokol I am an IT student from the Czech Republic and I have always had an adoration for computers and other forms of technology since I was little. My passion only grew stronger as I got to understand the inner workings of games and now my dream is to develop them. </p>
              <span className='_spacer'/>
              <p>See my projects at the <Link href='/projects'>projects</Link> page. And you can contact me either through my email <a href='mailto:me@jakooob.dev'>me@jakooob.dev</a> or Instagram <a href='https://instagram.com/Jakooob14' target='_BLANK' rel="noreferrer noopener">Jakooob14</a>.</p>
          </div>
      </main>
      <Footer />
    </>
  )
}

export default Home
