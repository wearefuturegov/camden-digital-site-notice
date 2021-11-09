import styles from '../styles/PlanningAlertSignup.module.css'

const PlanningAlertSignup = () => {
  return (
    <section className={styles.container}>
      <div className={styles.decoration}></div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Sign up for alerts on applications near you</h2>
        <a href='https://accountforms.camden.gov.uk/planning-alerts/#/subscribe' target="_blank" rel='noreferrer'>
          <div className={styles.button}>
            Sign up now
          </div>
        </a>
      </div>

    </section>
  )
}

export default PlanningAlertSignup;
