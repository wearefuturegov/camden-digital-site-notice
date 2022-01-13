import styles from '../styles/ImpactStat.module.css'

// Component that shows a single impact statistic, e.g. '180 new homes'.
// Takes a value (e.g. 180 or 35%) and a label (e.g. 'new homes' or 'affordable
// housing').
const ImpactStat = ({value, label}) => {
  return (
    <div className={styles.impactStat} >
      <span className={styles.number}>{value}</span>
      <span>{label}</span>
    </div>
  )
}

export default ImpactStat;
