import styles from '../styles/ApplicationDetail.module.css'

const ApplicationDetail = ({heading, children}) => {
  return (
    <div className={styles.applicationDetail}>
      <h3 className={styles.descriptionHeaderSmall}>{heading}</h3>
      { children }
    </div>
  )
}

export default ApplicationDetail;
