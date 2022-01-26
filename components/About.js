import ApplicationDetail from './ApplicationDetail'
import ApplicationTypesExplainer from './explainers/ApplicationTypesExplainer'
import styles from '../styles/About.module.css'

const landUseClassLabels = {
  classB: 'Industrial',
  classC: 'Residential',
  classE: 'Commercial',
  classF: 'Community',
  suiGeneris: 'Sui Generis'
}

const applicationTypeExplainers = {
  'Full Planning Permission': 'this is for the alteration, change of use or erection of a building. A full planning application provides all the details in one go.',
  'Outline Planning Permission': 'this seeks approval for the principle of detail (usually include the size of development and key features) with the detail provided later in a reserved matters application.',
  'Variation or Removal of Condition(s)': 'this provides the additional details that were not provided in an outline planning application, which might include layout, materials and landscape details.',
  'Approval of Reserved Matters': 'planning applications are often approved with ‘conditions’, which have to be delivered before, during or after construction. Applicants have to apply to change these conditions.'
}

const About = function(props) {
  const { description, applicationType, applicationNumber, proposedLandUse,
    height, constructionTime } = props;

  // Turn the land use classes into something non-planner friendly
  let landUse = null;
  if (proposedLandUse) {
    landUse = Object.keys(proposedLandUse).map(key => proposedLandUse[key] ? landUseClassLabels[key] : null).filter(Boolean).join(', ');
    if (proposedLandUse.suiGeneris && proposedLandUse.suiGenerisDetail) {
      landUse += ` (${proposedLandUse.suiGenerisDetail})`;
    }
  }

  // Find the app type explainer
  const appTypeExplainer = applicationTypeExplainers[applicationType];

  return (
    <section className={styles.section}>
      <div className={styles.description}>
        <h2 className={styles.descriptionHeader}>About this development</h2>
        <p>{ description }</p>
      </div>

      <div className={styles.applicationDetails}>
        <ApplicationDetail heading='Application type'>
          <p>{`${applicationType}${ appTypeExplainer ? ' - ' + appTypeExplainer : '' }`}</p>
          <ApplicationTypesExplainer />
        </ApplicationDetail>

        <ApplicationDetail heading='Application reference'>
          <p>{applicationNumber}</p>
        </ApplicationDetail>

        { landUse &&
          <ApplicationDetail heading='How will the site be used'>
            <p>{landUse}</p>
          </ApplicationDetail>
        }

        { height &&
          <ApplicationDetail heading='Height'>
            <p>{`Maximum ${height} storey${height == 1 ? '' : 's'}`}</p>
          </ApplicationDetail>
        }

        { constructionTime &&
          <ApplicationDetail heading='Estimated construction time'>
            <p>{constructionTime}</p>
          </ApplicationDetail>
        }
      </div>
    </section>
  )
}


export default About
