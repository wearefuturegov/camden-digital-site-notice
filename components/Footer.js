import Image from 'next/image'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h5>Learn more</h5>
      <ul>
        <li>
          <a href="https://www.camden.gov.uk/camden-local-plan1" className={styles.footerItem} target='_blank' rel='noreferrer'>
            <span>Read Camden&apos;s Local Plan</span>
            <Image src="/icons/arrow-right-yellow.svg" alt="" width={8} height={14} />
          </a>
        </li>
        <li>
          <a href="https://www.camden.gov.uk/planning-building-development" className={styles.footerItem} target='_blank' rel='noreferrer'>
            <span>Planning guidance</span>
            <Image src="/icons/arrow-right-yellow.svg" alt="" width={8} height={14} />
          </a>
        </li>
        <li>
          <a href="https://www.camden.gov.uk/planning-policy" className={styles.footerItem} target='_blank' rel='noreferrer'>
            <span>Planning policies</span>
            <Image src="/icons/arrow-right-yellow.svg" alt="" width={8} height={14} />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer;
