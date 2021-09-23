import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logo}>
          <Image src="/Camden_Logo_Blk.svg" alt="Camden Logo" width={127} height={39} />
        </span>

        <div className={styles.header}>
          <h1 className={styles.title}>
            Find planning applications near you
          </h1>

          <p className={styles.description}>
            Find, review and leave feedback on open planning applications in Camden.
          </p>
        </div>
      </main>

    </div>
  )
}
