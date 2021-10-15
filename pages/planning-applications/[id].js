import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/PlanningApplication.module.css'

export async function getServerSideProps(context) {
  // Put the app number back into the way Camden store it
  const appNumber = context.query.id.replace(/_/g, '/');

  const res = await fetch(`${process.env.API_URL}.json?application_number=${appNumber}`)
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
  const { development_address, development_description } = props;

  return (
    <div className={styles.page}>
      <Head>
        <title>Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <main className={styles.main}>

        <div className={styles.header}>
          <div className={styles.logo}>
            <Image src="/Camden_Logo_White.svg" alt="Camden Logo" width={127} height={39} />
          </div>

          <div className={styles.breadcrumbs}>
            <Link href='/'>
              <a>Planning Applications</a>
            </Link>
            <span> &gt; </span>
            <span className={styles.highlight}>Overview</span>
          </div>

          <div>
            <h2 className={styles.title}>
              Not available
            </h2>
            <p className={styles.address}>
              { development_address }
            </p>
          </div>
        </div>

        <div className={styles.mapSpacer}></div>

        <div className={styles.description}>
          <h3 className={styles.descriptionHeader}>What&apos;s the plan?</h3>
          <p>
            { development_description }
          </p>
        </div>

        <section className={styles.progress}>
          <h4>Where we are in the process</h4>
          <p>{ props.system_status } { props.decision_type ? `- ${props.decision_type}` : null }</p>
        </section>
      </main>

    </div>
  )
}
