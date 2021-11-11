import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import CamdenLogo from '../../../components/CamdenLogo'
import BreadcrumbArrow from '../../../components/BreadcrumbArrow'
import styles from '../../../styles/Feedback.module.css'
import client, { getClient } from "@lib/sanity";
import { groq } from "next-sanity";
import ImpactStat from '../../../components/ImpactStat'
import ImpactFeedback from '../../../components/ImpactFeedback'
import Footer from '../../../components/Footer'

export async function getServerSideProps(context) {
  // Put the app number back into the way Camden store it
  const appNumber = context.query.id.replace(/-/g, '/').toUpperCase();

  const query = groq`
    *[_type == "planning-application" && applicationNumber == "${appNumber}"] | order(_createdAt desc) [0] {
      ...
    }
  `;
  const cmsData = await getClient().fetch(query);

  console.log(cmsData)

  return {
    props: {
      appNumber,
      cmsData
    }
  }
}

const buildFeedback = (area, feedback) => {
  return `${area}: ${feedback}`
}

export default function Feedback(props) {
  const { appNumber, cmsData } = props;
  const router = useRouter()
  const { id } = router.query

  const [housingFeedback, setHousingFeedback] = useState('');
  const [healthcareFeedback, setHealthcareFeedback] = useState('');
  const [openSpaceFeedback, setOpenSpaceFeedback] = useState('');
  const [jobsFeedback, setJobsFeedback] = useState('');
  const [co2Feedback, setCo2Feedback] = useState('');
  const [accessFeedback, setAccessFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(housingFeedback)

    let data = {
      subject: `New feedback for planning application ${appNumber}`,
      message: `New feedback for planning application ${appNumber}`
    }

    if (housingFeedback) { data.message += buildFeedback('New homes', housingFeedback) }
    if (healthcareFeedback) { data.message += buildFeedback('Healthcare', healthcareFeedback) }
    if (openSpaceFeedback) { data.message += buildFeedback('Open space', openSpaceFeedback) }
    if (jobsFeedback) { data.message += buildFeedback('Jobs', jobsFeedback) }

    console.log(data)
  }

  return (
    <>
      <section className={styles.header}>
        <CamdenLogo colour='white' />

        <div className={styles.breadcrumbs}>
          <Link href='/'>
            <a>Planning Applications</a>
          </Link>
          <BreadcrumbArrow />
          <Link href={`/planning-applications/${id}`}>
            <a>Overview</a>
          </Link>
          <BreadcrumbArrow />
          <span className={styles.highlight}>Submit your feedback</span>
        </div>
      </section>

      <div>
        <p className={styles.questionNumber}>Question 2/2</p>
      </div>

      <section className={styles.section}>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.question}>What does your community need most?</h1>
          <p>
            This development could have an impact in the following ways.
            Let us know which ones you care about. You can choose as many as you
            like.
          </p>

              { cmsData.showHousing &&
                <ImpactFeedback
                  header='New homes'
                  image='housing'
                  onChange={setHousingFeedback}
                >
                  <ImpactStat
                    value={cmsData.housing.residentialUnits.toLocaleString()}
                    label='new homes'
                  />

                  <ImpactStat
                    value={(cmsData.housing.affordableResidentialUnits / cmsData.housing.residentialUnits * 100).toLocaleString() + '%'}
                    label='affordable housing'
                  />
                </ImpactFeedback>
              }

              { cmsData.showHousing &&
                <ImpactFeedback
                  header='Healthcare'
                  image='healthcare'
                  onChange={setHealthcareFeedback}
                >
                  <ImpactStat
                    value={cmsData.housing.healthcareDemand.toLocaleString() + '%'}
                    label='additional demand on GPs and hospitals'
                  />
                </ImpactFeedback>
              }

              { cmsData.showOpenSpace &&
                <ImpactFeedback
                  header={`${ cmsData.openSpace.accessType == 'unrestricted' ? 'Public' : 'Private'} open spaces`}
                  image='open-spaces'
                  onChange={setOpenSpaceFeedback}
                >
                  <ImpactStat
                    value={cmsData.openSpace.area.toLocaleString()}
                    label='square metres'
                  />
                </ImpactFeedback>
              }

              { cmsData.showJobs &&
                <ImpactFeedback
                  header='New jobs'
                  image='jobs'
                  onChange={setJobsFeedback}
                >
                  <ImpactStat
                    value={[cmsData.jobs.min.toLocaleString(), cmsData.jobs.max.toLocaleString()].join(' - ')}
                    label='new roles'
                  />
                </ImpactFeedback>
              }

              { cmsData.showCarbon &&
                <ImpactFeedback
                  header='Carbon emissions'
                  image='co2'
                  onChange={setCo2Feedback}
                >
                  <ImpactStat
                    value={cmsData.carbonEmissions.toLocaleString() + '%'}
                    label='more CO2 emissions'
                  />
                </ImpactFeedback>
              }

              { cmsData.showAccess &&
                <ImpactFeedback
                  header='Pedestrian and vehicle access'
                  image='access'
                  onChange={setAccessFeedback}
                >
                  <p className={styles.impactCopy}>{cmsData.access}</p>
                </ImpactFeedback>
              }
          <input className={styles.submitButton} type='submit' value='Submit your feedback' />
        </form>

        <Link href={`/planning-applications/${id}/feedback`} >
          <a>
            <div className={styles.backButton}>
              Back
            </div>
          </a>
        </Link>
      </section>

      <Footer />
    </>

  )
}
