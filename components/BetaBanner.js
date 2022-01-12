import styles from '../styles/BetaBanner.module.css'

export default function BetaBanner() {
  return (
    <div className={styles.banner}>
      <p className={styles.content}>
        <strong className={styles.tag}>Beta</strong>
        <span>This is a new service – your feedback will help us to improve it.</span>
      </p>
    </div>
  )
}
