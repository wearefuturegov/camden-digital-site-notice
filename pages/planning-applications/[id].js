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
  console.log(appNumber)

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

  const showImpactSection = !!cmsData && (cmsData.showHousing || cmsData.showOpenSpace ||
    cmsData.showJobs || cmsData.showCarbon);

  const imageProps = useNextSanityImage(
    client,
    cmsData?.massings
  );

  return (
    <>
      <Head>
        <title>Camden Planning</title>
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
            <h3 className={styles.descriptionHeaderSmall}>Application type</h3>
            <p>
              <span>{ development.application_type }</span>
            </p>

            { cmsData?.proposedLandUse &&
              <ApplicationDetail
                heading='How will the site be used'
                value={cmsData.proposedLandUse} />
            }

            { cmsData?.height &&
              <ApplicationDetail
                heading='Height'
                value={cmsData.height} />
            }

            { cmsData?.constructionTime &&
              <ApplicationDetail
                heading='Construction time'
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

              { cmsData.showHousing &&
                <ImpactArea header='New homes' image='housing'>
                  <ImpactStat
                    value={cmsData.housing.residentialUnits.toLocaleString()}
                    label='new homes'
                  />
                  <ImpactStat
                    value={(cmsData.housing.affordableResidentialUnits / cmsData.housing.residentialUnits * 100).toLocaleString() + '%'}
                    label='affordable housing'
                  />
                </ImpactArea>
              }

              { cmsData.showHousing &&
                <ImpactArea header='Healthcare' image='healthcare'>
                  <ImpactStat
                    value={cmsData.housing.healthcareDemand.toLocaleString() + '%'}
                    label='additional demand on GPs and hospitals'
                  />
                </ImpactArea>
              }

              { cmsData.showOpenSpace &&
                <ImpactArea
                  header={`${ cmsData.openSpace.accessType == 'unrestricted' ? 'Public' : 'Private'} open spaces`}
                  image='open-spaces'
                >

                  <ImpactStat
                    value={cmsData.openSpace.area.toLocaleString()}
                    label='square metres'
                  />
                </ImpactArea>
              }

              { cmsData.showJobs &&
                <ImpactArea header='New jobs' image='jobs'>
                  <ImpactStat
                    value={[cmsData.jobs.min.toLocaleString(), cmsData.jobs.max.toLocaleString()].join(' - ')}
                    label='new roles'
                  />
                </ImpactArea>
              }

              { cmsData.showCarbon &&
                <ImpactArea header='Carbon emissions' image='co2' >
                  <ImpactStat
                    value={cmsData.carbonEmissions.toLocaleString() + '%'}
                    label='more CO2 emissions'
                  />
                </ImpactArea>
              }

              { cmsData.showAccess &&
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

      <a href={development.full_application.url} target='_blank' rel='noreferrer'>
        <small>DEBUG: View in Camden&apos;s Planning Explorer</small>
      </a>
    </>
  )
}
