import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/PlanningApplication.module.css'
import CamdenLogo from '../../components/CamdenLogo'
import BreadcrumbArrow from '../../components/BreadcrumbArrow'
import ApplicationDetail from '../../components/ApplicationDetail'
import ImpactArea from '../../components/ImpactArea'
import ImpactStat from '../../components/ImpactStat'
import PlanningAlertSignup from '../../components/PlanningAlertSignup'
import FeedbackCTA from '../../components/FeedbackCTA'
import Footer from '../../components/Footer'
import client, { getClient } from "@lib/sanity"
import { groq } from "next-sanity"
import { useNextSanityImage } from 'next-sanity-image'

export async function getServerSideProps(context) {
  // Put the app number back into the way Camden store it
  const appNumber = context.query.id.replace(/-/g, '/').toUpperCase();

  const res = await fetch(`${process.env.API_URL}.json?application_number=${appNumber}`)
  const apiData = await res.json()
  console.log(apiData)

  const query = groq`
    *[_type == "planning-application" && applicationNumber == "${appNumber}"] | order(_createdAt desc) [0] {
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
      id: context.query.id,
      development: apiData[0],
      cmsData: cmsData
    }
  }
}

export default function PlanningApplication(props) {
  const { id, development, cmsData } = props;
  console.log(cmsData);

  const showImpactSection = !!cmsData && (cmsData.showHousing || cmsData.showHealthcare ||
    cmsData.showOpenSpace || cmsData.showJobs || cmsData.showCarbon);

  // Fetch the props for the massings image from Sanity
  const imageProps = useNextSanityImage(
    client,
    cmsData?.massings
  );

  const landUseClassLabels = {
    classB: 'Industrial',
    classC: 'Residential',
    classE: 'Commercial',
    classF: 'Community',
    suiGeneris: 'Sui Generis'
  }

  let proposedLandUse = null;
  if (cmsData) {
    proposedLandUse = Object.keys(cmsData.proposedLandUse).map(key => cmsData.proposedLandUse[key] ? landUseClassLabels[key] : null).filter(Boolean).join(', ');
  }

  return (
    <>
      <Head>
        <title>Digital Site Notice for planning application {development.application_number} | Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <main className={styles.main}>
        <section className={styles.header}>
          <CamdenLogo colour='white' />

          <div className={styles.breadcrumbs}>
            <Link href='/'>
              <a>Planning Applications</a>
            </Link>
            <BreadcrumbArrow />
            <span className={styles.highlight}>Overview</span>
          </div>

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

        <section className={styles.greenSection}>
          <div className={styles.description}>
            <h2 className={styles.descriptionHeader}>About this development</h2>
            <p>
              { development.development_description }
            </p>
          </div>

          <div className={styles.applicationDetails}>
            <ApplicationDetail
              heading='Application type'
              value={development.application_type} />

            { proposedLandUse &&
              <ApplicationDetail
                heading='How will the site be used'
                value={proposedLandUse} />
            }

            { cmsData?.height &&
              <ApplicationDetail
                heading='Height'
                value={`Maximum ${cmsData.height} storey${cmsData.height == 1 ? '' : 's'}`} />
            }

            { cmsData?.constructionTime &&
              <ApplicationDetail
                heading="Estimated construction time"
                value={cmsData.constructionTime} />
            }
          </div>
        </section>

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
                      value={(cmsData.housing.affordableResidentialUnits / cmsData.housing.residentialUnits * 100).toLocaleString() + '%'}
                      label='affordable housing'
                    />
                  }
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

              { cmsData.showOpenSpace && cmsData.openSpaceArea &&
                <ImpactArea header='Open spaces' image='open-spaces'>
                  <ImpactStat
                    value={cmsData.openSpaceArea.toLocaleString()}
                    label='square metres'
                  />
                </ImpactArea>
              }

              { cmsData.showJobs && cmsData.jobs &&
                <ImpactArea header='New jobs' image='jobs'>
                  <ImpactStat
                    value={[cmsData.jobs.min.toLocaleString(), cmsData.jobs.max.toLocaleString()].join(' - ')}
                    label='new roles'
                  />
                </ImpactArea>
              }

              { cmsData.showCarbon && cmsData.carbonEmissions &&
                <ImpactArea header='Carbon emissions' image='co2' >
                  <ImpactStat
                    value={cmsData.carbonEmissions.toLocaleString() + '%'}
                    label='more CO2 emissions'
                  />
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

        <section className={styles.progress}>

          <h2>Where we are in the process</h2>
          <div className={styles.timeline}>
            <div className={styles.solidLine}></div>
            <div className={styles.progressItem}>
              <span className={styles.point}></span>
              <p className={styles.status}>
                { development.system_status }
              </p>
              { development.decision_type ? <p className={styles.statusDetail}>{development.decision_type}</p> : null }
            </div>
          </div>

        </section>

        <PlanningAlertSignup />
      </main>

      { development.comment && <FeedbackCTA id={id} /> }

      <Footer />
    </>
  )
}
