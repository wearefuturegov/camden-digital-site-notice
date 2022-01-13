import Image from 'next/image'
import styles from '../styles/ImpactArea.module.css'

function ImpactArea({ header, image, children }) {

  return (
    <div className={styles.container} >

      <div className={styles.headerWrapper} >
        <h3 className={styles.header}>{header}</h3>
        <div className={styles.icon}>
          <Image src={`/icons/impact/${image}.svg`} alt="" width={65} height={65}/>
        </div>
      </div>

      { children }

    </div>

  )
}

export default ImpactArea
