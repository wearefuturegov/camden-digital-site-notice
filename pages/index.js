import Head from 'next/head'
import Image from 'next/image'
import PlanningListItem from '../components/PlanningListItem'
import styles from '../styles/Home.module.css'

export async function getServerSideProps(context) {
  const limit = 50;

  const res = await fetch(`${process.env.API_URL}.json?$limit=${limit}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      developments: data
    }
  }
}

export default function Home(props) {
  const { developments } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <main className={styles.main}>

        <div className={styles.searchWrapper}>
          <div className={styles.logo}>
            <Image src="/Camden_Logo_Blk.svg" alt="Camden Logo" width={127} height={39} />
          </div>

          <div>
            <h1 className={styles.title}>
              Find planning applications near you
            </h1>

            <p className={styles.description}>
              Find, review and leave feedback on open planning applications in Camden.
            </p>
          </div>
        </div>

        <section className={styles.results}>
          { developments.map((d) => <PlanningListItem key={d.pk} development={d}/>) }
        </section>
      </main>

    </div>
  )
}
