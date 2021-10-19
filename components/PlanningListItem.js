import Link from 'next/link'
import styles from '../styles/PlanningListItem.module.css'

const PlanningListItem = (props) => {
  const { development } = props;

  // The app numbers contain forward slashes, so we replace those with underscores
  // here so it's URL compatible
  const appId = development.application_number.replace(/\//g, "_")

  return (
    <Link href={`/planning-applications/${appId}`}>
      <a>
        <div className={styles.planningListItem} >
          <div className={styles.imageSpacer}></div>
          <div className={styles.listItemDetails}>
            <h2 className={styles.listItemHeading}>{ development.development_description }</h2>
            { development.development_address }
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PlanningListItem;
