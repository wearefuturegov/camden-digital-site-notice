import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/ImpactFeedback.module.css'

// Component that shows an impact area on which a user can give feedback.
// Includes the name of the impact area and a logo, and an input for feedback
// that can be toggled on/off depending on whether the user would like to feed
// back on the impact data.
// Can also take other components as props, e.g. to show the impact stats.
function ImpactFeedback({ header, image, children, onChange }) {
  const [showInput, setShowInput] = useState(false);
  const open = () => setShowInput(!showInput);

  return (
    <div className={styles.impactAreaWrapper}>
      <div className={ showInput ? styles.impactAreaActive : styles.impactArea }>
        <a onClick={open} className={styles.impactDataButton}>
          <div className={styles.headerWrapper}>
            <div className={styles.impactIcon}>
              <Image src={`/icons/feedback/impact/${image}.svg`} alt="" width={60} height={60}/>
            </div>
            <h3 className={styles.header}>{header}</h3>
          </div>
          <div className={styles.checkbox}>
            <Image alt='' src='/icons/checkmark.svg' height='12x' width='12px'/>
          </div>
        </a>

        { showInput &&
          <div className={styles.inner}>

            { children }

            <textarea
              onChange={(e) => onChange(e.target.value)}
              required={true}
              placeholder='How can we do better?'
              rows='6'
              className={styles.textInput}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default ImpactFeedback

