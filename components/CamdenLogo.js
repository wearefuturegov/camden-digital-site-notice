import Image from 'next/image'
import styles from '../styles/CamdenLogo.module.css'

export default function CamdenLogo(props) {
  return (
    <div className={styles.logo}>
      <Image src={`/camden-logo-${props.colour}.svg`} alt="Camden Logo" width={127} height={39} priority={true} />
    </div>
  )
}
