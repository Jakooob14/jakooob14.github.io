import Head from 'next/head'
import styles from '../../styles/Posts.module.scss'
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Posts({ posts }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Posts</title>
            </Head>

            <Header/>

            <main className={styles.main}>
                <div className={styles.posts}>
                {posts.map(post => {
                    return (
                        <div className={styles.post} key={post._id}>
                            <Link href={`/posts/${post._id}`}>
                                <a>{post.title}</a>
                            </Link>
                            <br/>
                            <Link href={`/posts/${post._id}/edit`}>
                                <a>EDIT</a>
                            </Link>
                            <br/>
                            <p>{post.content}</p>
                        </div>
                    )
                })}
                </div>
            </main>

            <Footer/>
        </div>
    )
}

Posts.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/post');
    const { data } = await res.json();

    return { posts: data }
}