import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import BetaBanner from '../../../components/BetaBanner'
import CamdenLogo from '../../../components/CamdenLogo'
import BreadcrumbArrow from '../../../components/BreadcrumbArrow'
import PlanningAlertSignup from '../../../components/PlanningAlertSignup'
import Divider from '../../../components/Divider'
import Dialog from '../../../components/Dialog'
import Share from '../../../components/Share'
import ShareButton from '../../../components/ShareButton'
import Footer from '../../../components/Footer'
import styles from '../../../styles/ThankYou.module.css'

export default function ThankYou(props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Thank you for your feedback | Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <BetaBanner />

      <section className={styles.header}>
        <div className={styles.share}>
          <div className={styles.shareButton}>
            <Dialog openComponent={<ShareButton isGreen />} >
              <Share applicationId={id} />
            </Dialog>
          </div>
        </div>

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

        <h1 className={styles.heading}>Thank you for your feedback</h1>
        <p>You can find out more about planning policies and developments in Camden by reading the <a href="https://www.camden.gov.uk/camden-local-plan1" className={styles.footerItem} target='_blank' rel='noreferrer'>Camden Local Plan</a>.</p>
      </section>
      
      <PlanningAlertSignup />

      <Divider padded />

      <section className={styles.shareContainer}>
        <div className={styles.decoration}></div>
        <Share applicationId={id} />
      </section>

      <Footer />
    </>

  )
}
