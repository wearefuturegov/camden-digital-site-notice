import styles from '../styles/ImpactData.module.css'

const ImpactData = ({value, label}) => {
  return (
    <div className={styles.impactData} >
      <span className={styles.number}>{value}</span>
      <span>{label}</span>
    </div>
  )
}

export default ImpactData;
