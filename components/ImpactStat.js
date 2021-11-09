import styles from '../styles/ImpactStat.module.css'

const ImpactStat = ({value, label}) => {
  return (
    <div className={styles.impactStat} >
      <span className={styles.number}>{value}</span>
      <span>{label}</span>
    </div>
  )
}

export default ImpactStat;
