import { useRouter } from 'next/router'
import Link from 'next/link'
import CamdenLogo from '../../../components/CamdenLogo'
import BreadcrumbArrow from '../../../components/BreadcrumbArrow'
import PlanningAlertSignup from '../../../components/PlanningAlertSignup'
import Footer from '../../../components/Footer'
import styles from '../../../styles/ThankYou.module.css'

export default function ThankYou(props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
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
      </section>

      <section className={styles.mainSection}>
        <h1 className={styles.heading}>Thank you, we&apos;re listening</h1>
        <p>
        Did you know you can have an even bigger impact by getting involved in <a href="https://www.camden.gov.uk/camden-local-plan1" className={styles.footerItem} target='_blank' rel='noreferrer'>Camden&apos;s Local Plan</a>?</p>
      </section>
      
      <PlanningAlertSignup />
      <Footer />
    </>

  )
}
