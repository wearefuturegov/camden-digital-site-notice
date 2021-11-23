import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import CamdenLogo from '../../../components/CamdenLogo'
import BreadcrumbArrow from '../../../components/BreadcrumbArrow'
import PlanningAlertSignup from '../../../components/PlanningAlertSignup'
import Divider from '../../../components/Divider'
import Share from '../../../components/Share'
import Footer from '../../../components/Footer'
import styles from '../../../styles/ThankYou.module.css'

export default function ThankYou(props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Thank you for the feedback | Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <section className={styles.header}>
        <CamdenLogo colour='black' />

        <div className={styles.breadcrumbs}>
          <Link href='/'>
            <a>Planning Applications</a>
          </Link>
          <BreadcrumbArrow colour='darkgreen' />
          <Link href={`/planning-applications/${id}`}>
            <a>Overview</a>
          </Link>
          <BreadcrumbArrow colour='darkgreen' />
          <span className={styles.highlight}>Submit your feedback</span>
        </div>

        <h1 className={styles.heading}>Thank you, we&apos;re listening</h1>
        <p>
        Did you know you can have an even bigger impact by getting involved in <a href="https://www.camden.gov.uk/camden-local-plan1" className={styles.footerItem} target='_blank' rel='noreferrer'>Camden&apos;s Local Plan</a>?</p>
      </section>
      
      <PlanningAlertSignup />

      <Divider padded />

      <section className={styles.shareContainer}>
        <div className={styles.decoration}></div>
        <Share />
      </section>

      <Footer />
    </>

  )
}
