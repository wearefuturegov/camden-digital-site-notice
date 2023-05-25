import Head from 'next/head'
import CamdenLogo from '../components/CamdenLogo'
import PlanningList from '../components/PlanningList'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import { getClient } from "@lib/sanity"
import { groq } from "next-sanity"
import BetaBanner from '../components/BetaBanner'

const limit = 50;
const distance = 1000;

// Helper method to convert a JS array to a string for a SOQL query
const arrayToSoqlString = (arr) => "'" + arr.toString().replace(/,/g , "','") + "'"

export async function getServerSideProps(context) {
  let postcode;

  // First, fetch the data from the CMS
  const query = groq`
    *[_type == "planning-application"] {
      ...
    }
  `;

  const cmsData = await getClient().fetch(query);


  // Then fetch the matching data from Camden's API
  const ids = cmsData.map(development => development.applicationNumber);

  let whereQuery = `application_number in(${arrayToSoqlString(ids)})`;
  let orderQuery = `registered_date DESC, last_uploaded DESC`;

  // If the user has searched by postcode, we need to tweak the request to
  // Camden's API to filter by location.
  if (context.query.postcode) {
    // Verify that it's a real postcode and get its geolocation
    const postcodeRes = await fetch(`https://api.postcodes.io/postcodes/${context.query.postcode}`)
    const postcodeData = await postcodeRes.json()

    if (postcodeData.error) {
      return {
        props: {
          error: postcodeData.error,
          currentPostcode: context.query.postcode
        }
      }
    }

    postcode = postcodeData.result;
    // TBD whether we only want to order by location or also filter out
    // developments that are too far away. For now there won't be too many site
    // notices, so leaving this out.
    // whereQuery += ` and within_circle(location, ${postcodeData.result.latitude}, ${postcodeData.result.longitude}, ${distance})`;
    orderQuery = `distance_in_meters(location, 'POINT (${postcodeData.result.longitude} ${postcodeData.result.latitude})')`
  }


  const res = await fetch(`${process.env.API_URL}.json?$limit=${limit}&$where=${whereQuery}&$order=${orderQuery}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  // Build up the array of developments from the CMS data and the data from
  // Camden's API, mapping from Camden's API so we know we're only showing
  // developments that exist in M3 and the Planning Explorer
  const developments = data.map(development => {
    const siteNotice = cmsData.find(el => el.applicationNumber == development.application_number);

    // Skip if there's no CMS data
    if (!siteNotice) { return }

    return {
      ...development,
      siteNoticeName: siteNotice.name ? siteNotice.name : development.development_description
    }
  });

  return {
    props: {
      developments: developments,
      currentPostcode: postcode ? postcode.postcode : '',
      currentLocation: postcode ? { latitude: postcode.latitude, longitude: postcode.longitude } : null
    }
  }
}

export default function Home(props) {
  const { developments, error, currentPostcode, currentLocation } = props;
  const [postcode, setPostcode] = useState(currentPostcode);

  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Site Notice | Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <BetaBanner />
      
      <main className={styles.main}>

        <div className={styles.searchWrapper}>
          <CamdenLogo colour='black' />

          <div>
            <h1 className={styles.title}>
              Find planning applications near you
            </h1>

            <p className={styles.description}>
              Find, review and leave feedback on open planning applications in Camden.
            </p>

            <form>
              <label htmlFor='postcode' className={styles.searchLabel}>Enter your postcode</label>
              <input type='text' id='postcode' name='postcode' value={postcode} onChange={e => setPostcode(e.target.value)} className={styles.searchInput} />
              { error ? <p>{ error }</p> : null }
              <button className={styles.searchButton}>Search</button>
            </form>
          </div>
        </div>

        <section className={styles.results}>
          { developments.length > 0 ? <PlanningList developments={developments} currentLocation={currentLocation} /> : <p>No results</p>}
        </section>
      </main>

    </div>
  )
}
