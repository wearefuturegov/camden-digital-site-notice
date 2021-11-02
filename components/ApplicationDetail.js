import styles from '../styles/ApplicationDetail.module.css'

const ApplicationDetail = ({heading, value}) => {
  return (
    <div className={styles.applicationDetail}>
      <h3 className={styles.descriptionHeaderSmall}>{heading}</h3>
      <p>
        {value}
      </p>
    </div>
  )
}

export default ApplicationDetail;
