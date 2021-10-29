import Head from 'next/head'
import Image from 'next/image'
import PlanningList from '../components/PlanningList'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import Script from 'next/script'

const limit = 50;
const distance = 500;

export async function getServerSideProps(context) {
  let whereQuery = `system_status not in('Final Decision', 'Withdrawn') and decision_type is null`;
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
  }


  const res = await fetch(`${process.env.API_URL}.json?$limit=${limit}&$where=${whereQuery}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      developments: data,
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
        <title>Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />

      <main className={styles.main}>

        <div className={styles.searchWrapper}>
          <div className={styles.logo}>
            <Image src="/Camden_Logo_Blk.svg" alt="Camden Logo" width={127} height={39} />
          </div>

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

      <Script
        id='netlify-auth'
        dangerouslySetInnerHTML={{
          __html: `if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            })
          }`
        }} />
    </div>
  )
}
