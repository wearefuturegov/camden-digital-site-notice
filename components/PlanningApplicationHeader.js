import Link from 'next/link'
import BetaBanner from '../components/BetaBanner'
import CamdenLogo from '../components/CamdenLogo'
import BreadcrumbArrow from '../components/BreadcrumbArrow'
import Dialog from '../components/Dialog'
import Share from '../components/Share'
import ShareButton from '../components/ShareButton'
import styles from '../styles/PlanningApplicationHeader.module.css'

export default function PlanningApplicationHeader(props) {
  return (
    <>
      <BetaBanner />

      <header className={styles.pageHeader}>
        <div className={styles.share}>
          <Dialog openComponent={<ShareButton />} >
            <Share applicationNumber={props.applicationNumber} />
          </Dialog>
        </div>

        <CamdenLogo colour='white' />

        <div className={styles.breadcrumbs}>
          <Link href='/'>
            <a>Planning Applications</a>
          </Link>
          <BreadcrumbArrow />
          <span className={styles.highlight}>Overview</span>
        </div>
      </header>
    </>
  )
}
