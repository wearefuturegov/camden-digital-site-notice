import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h5>Learn more</h5>
      <ul>
        <li>
          <a href="" className={styles.footerItem}>
            <span>Read Camden&apos;s Local Plan</span>
            <Image src="/arrow-right-yellow.svg" alt="" width={8} height={14} />
          </a>
        </li>
        <li>
          <a href="" className={styles.footerItem}>
            <span>Application documents</span>
            <Image src="/arrow-right-yellow.svg" alt="" width={8} height={14} />
          </a>
        </li>
        <li>
          <a href="" className={styles.footerItem}>
            <span>Useful links</span>
            <Image src="/arrow-right-yellow.svg" alt="" width={8} height={14} />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer;
