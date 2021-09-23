import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/PlanningApplication.module.css'

export async function getServerSideProps(context) {
  const res = await fetch(process.env.API_URL)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: data[0],
  }
}

export default function PlanningApplication(props) {
  console.log(props)
  const { development_address, development_description } = props;

  return (
    <div className={styles.page}>
      <Head>
        <title>Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logo}>
          <Image src="/Camden_Logo_White.svg" alt="Camden Logo" width={127} height={39} />
        </span>

        <div>
          <span>Planning Applications</span>
          <span> &gt; </span>
          <span className={styles.highlight}>Overview</span>
        </div>

        <div className={styles.header}>
          <h2 className={styles.title}>
            { development_address }
          </h2>

          <div className={styles.highlight}>
            <h3 className={styles.descriptionHeader}>What&apos;s the plan?</h3>
            <p className={styles.description}>
              { development_description }
            </p>
          </div>
        </div>
      </main>

    </div>
  )
}
