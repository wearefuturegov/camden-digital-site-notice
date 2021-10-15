import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export async function getServerSideProps(context) {
  const limit = 25;

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

const PlanningListItem = (props) => {
  const { development } = props;

  // The app numbers contain forward slashes, so we replace those with underscores
  // here so it's URL compatible
  const appId = development.application_number.replace(/\//g, "_")

  return (
    <Link href={`/planning-applications/${appId}`}>
      <a>
        <div className={styles.planningListItem} >
          <div className={styles.imageSpacer}></div>
          <div className={styles.listItemDetails}>
            <h2 className={styles.listItemHeading}>{ development.development_description }</h2>
            { development.development_address }
          </div>
        </div>
      </a>
    </Link>
  )
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
