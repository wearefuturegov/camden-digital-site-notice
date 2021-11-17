import styles from '../styles/Divider.module.css'

const Divider = ({padded}) => {
  if (padded) {
    return <div className={styles.dividerPadded}></div>
  } else {
    return <div className={styles.divider}></div>
  }
}

export default Divider;
