import CamdenLogo from '../components/CamdenLogo'
import BreadcrumbArrow from '../components/BreadcrumbArrow'
import Dialog from '../components/Dialog'
import Share from '../components/Share'
import ShareButton from '../components/ShareButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/FeedbackHeader.module.css'

export default function Header({ children }) {
  const router = useRouter()
  const { id } = router.query

  return (
    <section className={styles.header}>
      <div className={styles.share}>
        <Dialog openComponent={<ShareButton />} >
          <Share />
        </Dialog>
      </div>

      <CamdenLogo colour='white' />

      <div className={styles.breadcrumbs}>
        <Link href='/'>
          <a>Planning Applications</a>
        </Link>
        <BreadcrumbArrow />
        <Link href={`/planning-applications/${id}`}>
          <a>Overview</a>
        </Link>
        <BreadcrumbArrow />
        <span className={styles.highlight}>Submit your feedback</span>
      </div>

      { children }

    </section>
  );
}
