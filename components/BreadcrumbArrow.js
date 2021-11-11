import Image from 'next/image'
import styles from '../styles/BreadcrumbArrow.module.css'

export default function BreadcrumbArrow({ colour }) {
  return (
    <span className={styles.arrow}>
      <Image src={`/icons/arrow-right-${ colour || 'white'}.svg`} alt="" width={8} height={12} />
    </span>
  )
}
