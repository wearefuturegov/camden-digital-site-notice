import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/PlanningListItem.module.css'
import distanceInMiles from '../utils/geolocationHelpers'

const PlanningListItem = (props) => {
  const { development, currentLocation } = props;

  // The app numbers contain forward slashes, so we replace those with underscores
  // here so it's URL compatible
  const appId = development.application_number.replace(/\//g, "-")

  const distance = currentLocation ? distanceInMiles(currentLocation, development.location) : null;

  return (
    <Link href={`/planning-applications/${appId}`}>
      <a>
        <div className={styles.planningListItem} >
          <div className={styles.imageSpacer}></div>
          <div className={styles.listItemDetails}>
            <h2 className={styles.listItemHeading}>{ development.development_description }</h2>
            <div className={styles.listItemLocation}>
              <div className={styles.locationMarkerWrapper}>
                <Image src="/location-marker.svg" alt="Distance" width={16} height={25} />
              </div>
              <p>
                { distance &&
                  <>
                    <span>
                      { distance.toFixed(1) } miles
                    </span>
                    <span className={styles.spacer}>
                      •
                    </span>
                  </>
                }
                <span>
                  { development.development_address }
                </span>
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PlanningListItem;
