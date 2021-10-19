import Head from 'next/head'
import Image from 'next/image'
import PlanningListItem from '../components/PlanningListItem'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

const limit = 50;
const distance = 500;

export async function getServerSideProps(context) {
  const whereQuery = `system_status not in('Final Decision', 'Withdrawn')`;

  const res = await fetch(`${process.env.API_URL}.json?$limit=${limit}&$where=${whereQuery}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      apiUrl: process.env.API_URL,
      developments: data
    }
  }
}

const PlanningList = (props) => {
  const { developments, currentLocation } = props;

  return (
    developments.map((d) => <PlanningListItem key={d.pk} development={d} currentLocation={currentLocation} />)
  )
}

export default function Home(props) {
  const [developments, setDevelopments] = useState(props.developments);
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();

  const postcodeLookup = async (e) => {
    e.preventDefault();

    const postcodeRes = await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    const postcodeData = await postcodeRes.json()

    setError(postcodeData.error);

    if (postcodeData.error) {
      return
    }

    setLoading(true);
    setPostcode(postcodeData.result.postcode);

    const whereQuery = `system_status not in('Final Decision', 'Withdrawn') and within_circle(location, ${postcodeData.result.latitude}, ${postcodeData.result.longitude}, ${distance})`;

    const res = await fetch(`${props.apiUrl}.json?$limit=${limit}&$where=${whereQuery}`)
    const data = await res.json()

    setCurrentLocation({ latitude: postcodeData.result.latitude, longitude: postcodeData.result.longitude });
    setDevelopments(data);
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

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

            <form onSubmit={postcodeLookup}>
              <label htmlFor='postcode' className={styles.searchLabel}>Enter your postcode</label>
              <input type='text' id='postcode' name='postcode' value={postcode} onChange={e => setPostcode(e.target.value)} className={styles.searchInput} />
              { error ? <p>{ error }</p> : null }
              <button>Search</button>
            </form>
          </div>
        </div>

        <section className={styles.results}>
          { loading ? <p>Loading...</p> :  <PlanningList developments={developments} currentLocation={currentLocation} /> }
        </section>
      </main>

    </div>
  )
}
