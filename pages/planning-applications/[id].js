import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/PlanningApplication.module.css'
import About from '../../components/About'
import ImpactArea from '../../components/ImpactArea'
import ImpactStat from '../../components/ImpactStat'
import HomesExplainer from '../../components/explainers/HomesExplainer'
import OpenSpaceExplainer from '../../components/explainers/OpenSpaceExplainer'
import JobsExplainer from '../../components/explainers/JobsExplainer'
import CarbonExplainer from '../../components/explainers/CarbonExplainer'
import ApplicationTimeline from '../../components/ApplicationTimeline'
import ApplicationDocumentsLink from '../../components/ApplicationDocumentsLink'
import PlanningApplicationHeader from '../../components/PlanningApplicationHeader'
import PlanningAlertSignup from '../../components/PlanningAlertSignup'
import FeedbackCTA from '../../components/FeedbackCTA'
import Divider from '../../components/Divider'
import Footer from '../../components/Footer'
import client, { getClient } from "@lib/sanity"
import { groq } from "next-sanity"
import { useNextSanityImage } from 'next-sanity-image'

export async function getServerSideProps(context) {
  const id = context.query.id;
  const res = await fetch(`${process.env.API_URL}.json?pk=${id}`)
  const apiData = await res.json()
  console.log(apiData)

  const query = groq`
    *[_type == "planning-application" && applicationNumber == "${apiData[0].application_number}"] | order(_createdAt desc) [0] {
      ...
    }
  `;
  const cmsData = await getClient().fetch(query);

  console.log(cmsData)

  if (!apiData || apiData.length == 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      id: id,
      development: apiData[0],
      cmsData: cmsData
    }
  }
}

export default function PlanningApplication(props) {
  const { id, development, cmsData } = props;
  const appNumber = development.application_number;
  console.log(cmsData);

  const showImpactSection = !!cmsData && (cmsData.showHousing || cmsData.showHealthcare ||
    cmsData.showOpenSpace || cmsData.showJobs || cmsData.showCarbon);

  // Fetch the props for the massings image from Sanity
  const imageProps = useNextSanityImage(
    client,
    cmsData?.massings
  );

  return (
    <>
      <Head>
        <title>Digital Site Notice for planning application {appNumber} | Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <PlanningApplicationHeader />

      <main className={styles.main}>
        <section className={styles.header}>
          <div>
            <h1 className={styles.title}>
              { cmsData?.name || development.application_type }
            </h1>
            <p className={styles.address}>
              { development.development_address }
            </p>
          </div>
        </section>

        { cmsData?.massings &&
          <div className={styles.massingsImage}>
            <Image {...imageProps} alt="Image showing the proposed massings for the development" layout='responsive' />
          </div>
        }

        <About
          description={development.development_description}
          applicationType={development.application_type}
          applicationNumber={development.application_number}
          height={cmsData?.height}
          constructionTime={cmsData?.constructionTime}
          proposedLandUse={cmsData?.proposedLandUse}
        />

        { showImpactSection &&
          <div>
            <div className={styles.impactDecoration}></div>
            <section className={styles.impact}>
              <h2>How could this affect you?</h2>
              <p className={styles.subtitle}>This development could impact your local community in the following ways</p>

              { cmsData.showHousing && cmsData.housing &&
                <ImpactArea header='New homes' image='housing'>
                  <ImpactStat
                    value={cmsData.housing.residentialUnits.toLocaleString()}
                    label={`new home${cmsData.housing.residentialUnits == 1 ? '' : 's'}`}
                  />

                  { cmsData.housing.affordableResidentialUnits &&
                    <ImpactStat
                      value={Math.round((cmsData.housing.affordableResidentialUnits / cmsData.housing.residentialUnits * 100).toLocaleString()) + '%'}
                      label='affordable housing'
                    />
                  }

                  <HomesExplainer hasLightBg hasMarginTop />
                </ImpactArea>
              }

              { cmsData.showHealthcare && cmsData.healthcareDemand &&
                <ImpactArea header='Healthcare' image='healthcare'>
                  <ImpactStat
                    value={cmsData.healthcareDemand.toLocaleString() + '%'}
                    label='additional demand on GPs and hospitals'
                  />
                </ImpactArea>
              }

              { cmsData.showOpenSpace &&
                <ImpactArea header='Open spaces' image='open-spaces'>
                  <ImpactStat
                    value={cmsData.openSpaceArea?.toLocaleString()}
                    label='square metres'
                  />
                  <OpenSpaceExplainer hasLightBg hasMarginTop />
                </ImpactArea>
              }

              { cmsData.showJobs &&
                <ImpactArea header='New jobs' image='jobs'>
                  <ImpactStat
                    value={[cmsData.jobs.min?.toLocaleString(), cmsData.jobs.max?.toLocaleString()].filter(n => n).join(' - ')}
                    label='new roles'
                  />
                  <JobsExplainer hasLightBg hasMarginTop />
                </ImpactArea>
              }

              { cmsData.showCarbon &&
                <ImpactArea header='Carbon emissions' image='co2' >
                  <ImpactStat
                    value={cmsData.carbonEmissions?.toLocaleString() + '%'}
                    label='below legal requirements'
                  />
                  <CarbonExplainer hasLightBg hasMarginTop />
                </ImpactArea>
              }

              { cmsData.showAccess && cmsData.access &&
                <ImpactArea header='Pedestrian and vehicle access' image='access' >
                  <p className={styles.impactCopy}>{cmsData.access}</p>
                </ImpactArea>
              }
            </section>
          </div>
        }

        <ApplicationTimeline
          systemStatus={development.system_status}
          decisionType={development.decision_type}
        />

        <Divider />

        <PlanningAlertSignup />

        <Divider />

        <ApplicationDocumentsLink applicationNumber={appNumber} />
      </main>

      { development.comment && <FeedbackCTA id={id} /> }

      <Footer />
    </>
  )
}
