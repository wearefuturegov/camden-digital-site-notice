import { useState } from 'react'
import { useRouter } from 'next/router'
import { getClient } from "@lib/sanity";
import { groq } from "next-sanity";
import Link from 'next/link'
import Head from 'next/head'
import FeedbackHeader from '../../../components/FeedbackHeader'
import FeedbackExplainer from '../../../components/explainers/FeedbackExplainer'
import HomesExplainer from '../../../components/explainers/HomesExplainer'
import OpenSpaceExplainer from '../../../components/explainers/OpenSpaceExplainer'
import JobsExplainer from '../../../components/explainers/JobsExplainer'
import CarbonExplainer from '../../../components/explainers/CarbonExplainer'
import ImpactStat from '../../../components/ImpactStat'
import ImpactFeedback from '../../../components/ImpactFeedback'
import Footer from '../../../components/Footer'
import styles from '../../../styles/Feedback.module.css'

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.API_URL}.json?pk=${context.query.id}`)
  const apiData = await res.json()

  const appNumber = apiData[0].application_number;

  const query = groq`
    *[_type == "planning-application" && applicationNumber == "${appNumber}"] | order(_createdAt desc) [0] {
      ...
    }
  `;
  const cmsData = await getClient().fetch(query);

  return {
    props: {
      appNumber,
      cmsData
    }
  }
}

export default function Feedback(props) {
  const { appNumber, cmsData } = props;
  const router = useRouter()
  const { id, feeling, feedback, postcode } = router.query

  const [housingFeedback, setHousingFeedback] = useState('');
  const [healthcareFeedback, setHealthcareFeedback] = useState('');
  const [openSpaceFeedback, setOpenSpaceFeedback] = useState('');
  const [jobsFeedback, setJobsFeedback] = useState('');
  const [co2Feedback, setCo2Feedback] = useState('');
  const [accessFeedback, setAccessFeedback] = useState('');
  const [error, setError] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const areasForFeedback = [
      {
        name: 'New homes',
        feedback: housingFeedback
      },
      {
        name: 'Healthcare',
        feedback: healthcareFeedback
      },
      {
        name: 'Open space',
        feedback: openSpaceFeedback
      },
      {
        name: 'New jobs',
        feedback: jobsFeedback
      },
      {
        name: 'Carbon emissions',
        feedback: co2Feedback
      },
      {
        name: 'Pedestrian and vehicle access',
        feedback: accessFeedback
      }
    ];

    const response = await fetch('/api/feedback', {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           applicationNumber: appNumber,
           feedbackEmotion: feeling,
           feedback: feedback,
           impactFeedback: areasForFeedback,
           postcode: postcode
         })
    });

    if (response.ok) {
      router.push(`/planning-applications/${id}/thank-you`);
    } else {
      console.log(response);
      // TODO better error handling
      setError('Sorry, something went wrong submitting your feedback');
    }
  }

  return (
    <>
      <Head>
        <title>Give feedback for planning application {appNumber} | Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <FeedbackHeader>
        <h1>Tell us what you think</h1>
        <p>Your feedback helps us improve developments so they meet the needs of people in Camden. It&apos;s important you let us know what you think.</p>

        <FeedbackExplainer />
      </FeedbackHeader>

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

              { cmsData.showHousing && cmsData.housing &&
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
                    value={Math.round((cmsData.housing.affordableResidentialUnits / cmsData.housing.residentialUnits * 100).toLocaleString()) + '%'}
                    label='affordable housing'
                  />

                  <HomesExplainer hasLightBg hasMarginTop />
                </ImpactFeedback>
              }

              { cmsData.showHealthcare && cmsData.healthcareDemand &&
                <ImpactFeedback
                  header='Healthcare'
                  image='healthcare'
                  onChange={setHealthcareFeedback}
                >
                  <ImpactStat
                    value={cmsData.healthcareDemand.toLocaleString() + '%'}
                    label='additional demand on GPs and hospitals'
                  />
                </ImpactFeedback>
              }

              { cmsData.showOpenSpace &&
                <ImpactFeedback
                  header='Open spaces'
                  image='open-spaces'
                  onChange={setOpenSpaceFeedback}
                >
                  <ImpactStat
                    value={cmsData.openSpaceArea?.toLocaleString()}
                    label='square metres'
                  />
                  <OpenSpaceExplainer hasLightBg hasMarginTop />
                </ImpactFeedback>
              }

              { cmsData.showJobs &&
                <ImpactFeedback
                  header='New jobs'
                  image='jobs'
                  onChange={setJobsFeedback}
                >
                  <ImpactStat
                    value={[cmsData.jobs.min?.toLocaleString(), cmsData.jobs.max?.toLocaleString()].filter(n => n).join(' - ')}
                    label='new roles'
                  />
                  <JobsExplainer hasLightBg hasMarginTop />
                </ImpactFeedback>
              }

              { cmsData.showCarbon &&
                <ImpactFeedback
                  header='Carbon emissions'
                  image='co2'
                  onChange={setCo2Feedback}
                >
                  <ImpactStat
                    value={cmsData.carbonEmissions?.toLocaleString() + '%'}
                    label='below legal requirements'
                  />
                  <CarbonExplainer hasLightBg hasMarginTop />
                </ImpactFeedback>
              }

              { cmsData.showAccess && cmsData.access &&
                <ImpactFeedback
                  header='Pedestrian and vehicle access'
                  image='access'
                  onChange={setAccessFeedback}
                >
                  <p className={styles.impactCopy}>{cmsData.access}</p>
                </ImpactFeedback>
              }

          { error && <p className={styles.error}>{error}</p> }

          <input className={styles.submitButton} type='submit' value='Submit your feedback' />
        </form>

        <Link href={`/planning-applications/${id}/feedback?feeling=${feeling}&feedback=${feedback}&postcode=${postcode}`} >
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
