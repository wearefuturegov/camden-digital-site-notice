import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Dialog.module.css'

export default function Dialog({openComponent, children}) {
  const [showDialog, setShowDialog] = useState(false);
  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  return (
    <>
      <a onClick={handleOpen}>
        {openComponent}
      </a>

      <div className={showDialog ? styles.dialogOpen : styles.dialogClosed}>
        <div className={styles.inner}>
          <div className={styles.decoration}></div>

          <button aria-label="Close" className={styles.closeButton} onClick={handleClose}>
            <Image src='/icons/cross.svg' alt="Close" width={14} height={14}/>
          </button>

          { children }
        </div>
      </div>
      <div onClick={handleClose} className={showDialog ? styles.overlayOpen : styles.overlayClosed }></div>
    </>
  )
}

