import Head from 'next/head'
import CamdenLogo from '../components/CamdenLogo'
import PlanningList from '../components/PlanningList'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import client, { getClient } from "@lib/sanity"
import { groq } from "next-sanity"

const limit = 50;
const distance = 500;
const ignoredSystemStatus = ['Final Decision', 'Withdrawn'];
const applicationTypes = ['Full Planning Permission', 'Outline Planning Permission', 'Variation or Removal of Condition(s)', 'Approval of Reserved Matters'];

const arrayToSoqlString = (arr) => arr.map(s => JSON.stringify(s)).join()

export async function getServerSideProps(context) {
  let whereQuery = `system_status not in(${arrayToSoqlString(ignoredSystemStatus)}) and decision_type is null and application_type in(${arrayToSoqlString(applicationTypes)})`;
  let orderQuery = `registered_date DESC, last_uploaded DESC`;
  let postcode;

  if (context.query.postcode) {
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
    whereQuery += ` and within_circle(location, ${postcodeData.result.latitude}, ${postcodeData.result.longitude}, ${distance})`;
    orderQuery = `distance_in_meters(location, 'POINT (${postcodeData.result.longitude} ${postcodeData.result.latitude})')`
  }

  const res = await fetch(`${process.env.API_URL}.json?$limit=${limit}&$where=${whereQuery}&$order=${orderQuery}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  const ids = data.map(development => `'${development.application_number}'`);
  const query = groq`
    *[_type == "planning-application" && applicationNumber in [${ids}]] {
      ...
    }
  `;

  const cmsData = await getClient().fetch(query);

  const developments = data.map(development => {
    const siteNotice = cmsData.find(el => el.applicationNumber == development.application_number);

    return {
      ...development,
      siteNoticeName: siteNotice ? siteNotice.name : development.development_description
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
              <button>Search</button>
            </form>
          </div>
        </div>

        <section className={styles.results}>
          { developments && <PlanningList developments={developments} currentLocation={currentLocation} /> }
        </section>
      </main>

    </div>
  )
}
