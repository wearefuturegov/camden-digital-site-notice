import styles from '../styles/BetaBanner.module.css'

export default function BetaBanner() {
  return (
    <div className={styles.banner}>
      <p className={styles.content}>
        <strong className={styles.tag}>Beta</strong>
        <span>This is a new service – your <a className={styles.link} href={process.env.NEXT_PUBLIC_FEEDBACK_LINK} target='_blank' rel='noreferrer'>feedback</a> will help us to improve it.</span>
      </p>
    </div>
  )
}
