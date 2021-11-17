import styles from '../styles/Share.module.css'
import Image from 'next/image'

const Share = () => {
  return (
    <section className={styles.container}>
      <div className={styles.decoration}></div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Share with your&nbsp;community</h2>

        <div className={styles.shareIcons}>
          <div className={styles.shareIcon}>
            <Image src="/icons/sharing/twitter.svg" alt="Share on Twitter" width={52} height={52} />
          </div>
          <div className={styles.shareIcon}>
            <Image src="/icons/sharing/facebook.svg" alt="Share on Facebook" width={52} height={52} />
          </div>
          <div className={styles.shareIcon}>
            <Image src="/icons/sharing/instagram.svg" alt="Share on Instagram" width={52} height={52} />
          </div>
        </div>

        <p>
          Get other people involved, together we can make a difference!
        </p>
      </div>

    </section>
  )
}

export default Share;
