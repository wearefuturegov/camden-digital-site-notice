import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/PlanningApplication.module.css'
import Footer from '../../components/Footer'

export async function getServerSideProps(context) {
  // Put the app number back into the way Camden store it
  const appNumber = context.query.id.replace(/_/g, '/');

  const res = await fetch(`${process.env.API_URL}.json?application_number=${appNumber}`)
  const data = await res.json()

  if (!data || data.length == 0) {
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
              { props.application_type }
            </h2>
            <p className={styles.address}>
              { development_address }
            </p>
          </div>

        </div>

        <div className={styles.mapSpacer}></div>

        <section className={styles.greenSection}>
          <div className={styles.description}>
            <h3 className={styles.descriptionHeader}>What&apos;s the plan?</h3>
            <p>
              { development_description }
            </p>
          </div>

          <h3 className={styles.descriptionHeaderSmall}>Application type</h3>
          <p>
            <span>{ props.application_type }</span>
          </p>
          <a href="#">What are other types of permission?</a>
        </section>

        <section className={styles.progress}>

          <h4>Where we are in the process</h4>
          <div className={styles.timeline}>
            <div className={styles.solidLine}></div>
            <div className={styles.progressItem}>
              <span className={styles.point}></span>
              <p className={styles.status}>
                { props.system_status }
              </p>
              { props.decision_type ? <p className={styles.statusDetail}>{props.decision_type}</p> : null }
            </div>
          </div>

          <a href={props.full_application.url} target='_blank' rel='noreferrer'>
            <small>DEBUG: View in Camden&apos;s Planning Explorer</small>
          </a>
        </section>

      </main>

      <Footer />
    </div>
  )
}
