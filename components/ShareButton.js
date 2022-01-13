import Image from 'next/image'
import styles from '../styles/ShareButton.module.css'

// Share button with icon. Can be used as a toggle to open a dialog with links
// to share content on social media.
export default function ShareButton() {
  return (
    <div className={styles.share}>
      <Image alt="" width='16' height='16' src='/icons/share-yellow.svg' />
      <span>Share</span>
    </div>
  )
}
