import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/FeedbackCTA.module.css'

export default function FeedbackCTA({id}) {
  return (
    <Link href={`/planning-applications/${id}/feedback`}>
      <a className={styles.button}>
        We want your feedback!
        <div className={styles.arrow}>
          <Image src="/icons/arrow-right-yellow.svg" alt="" width={14} height={20} />
        </div>
      </a>
    </Link>
  )
}
