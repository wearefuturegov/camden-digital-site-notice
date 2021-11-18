import styles from '../styles/ApplicationTimeline.module.css'

const ApplicationTimeline = function(props) {
  const { systemStatus, decisionType } = props;

  return (
    <section className={styles.progress}>

      <h2>Where we are in the process</h2>
      <div className={styles.timeline}>
        <div className={styles.solidLine}></div>
        <div className={styles.progressItem}>
          <span className={styles.point}></span>
          <p className={styles.status}>
            { systemStatus }
          </p>
          { decisionType ? <p className={styles.statusDetail}>{decisionType}</p> : null }
        </div>
      </div>

    </section>
  )
}

export default ApplicationTimeline
