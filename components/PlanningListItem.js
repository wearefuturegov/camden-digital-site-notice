import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/PlanningListItem.module.css'
import distanceInMiles from '../utils/geolocationHelpers'

const PlanningListItem = (props) => {
  const { development, currentLocation } = props;

  const appId = development.pk;

  const distance = currentLocation ? distanceInMiles(currentLocation, development.location) : null;

  return (
    (<Link href={`/planning-applications/${appId}`}>

      <div className={styles.container} >
        <div className={styles.imageSpacer}></div>
        <div className={styles.details}>

          { development.comment &&
            <div className={styles.feedbackTag}>
              We want your feedback!
              <span className={styles.arrow}>
                <Image src="/icons/arrow-right-yellow-chunky.svg" alt="" width={10} height={12} />
              </span>
            </div>
          }

          <h2 className={styles.heading}>{ development.siteNoticeName }</h2>
          <div className={styles.location}>
            <div className={styles.locationMarkerWrapper}>
              <Image src="/icons/location-marker.svg" alt="Distance" width={16} height={25} />
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

    </Link>)
  );
}

export default PlanningListItem;
