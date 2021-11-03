import Image from 'next/image'
import styles from '../styles/ImpactDataHeader.module.css'

const ImpactDataHeader = ({header, image}) => {
  return (
    <div className={styles.impactData} >
      <h3 className={styles.impactHeader}>{header}</h3>
      <div className={styles.impactIcon}>
        <Image src={`/icons/impact/${image}.svg`} alt="" width={65} height={65}/>
      </div>
    </div>
  )
}

export default ImpactDataHeader;
