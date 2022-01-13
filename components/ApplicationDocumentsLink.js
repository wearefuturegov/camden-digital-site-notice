import styles from '../styles/ApplicationDocumentsLink.module.css'

const ApplicationDocumentsLink = ({applicationNumber}) => {
  const url = `http://camdocs.camden.gov.uk/HPRMWebDrawer/PlanRec?q=recContainer:%22${applicationNumber}%22`

  return (
    <section className={styles.container}>
      <div className={styles.decoration}></div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>View application documents</h2>
        <a href={url} target="_blank" rel='noreferrer'>
          <div className={styles.button}>
            View documents
          </div>
        </a>
      </div>

    </section>
  )
}

export default ApplicationDocumentsLink;
