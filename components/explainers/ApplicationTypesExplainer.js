import Explainer from '../Explainer'

export default function ApplicationTypesExplainer(props) {
  return <Explainer hasLightBg={props.hasLightBg} hasMarginTop={props.hasMarginTop} buttonText='Learn more about application types'>
    <h2>Learn more about application types</h2>

    <h3>Full planning application</h3>
    <p>
      An application to alter, change the use of or construct a building. A full planning application provides all the details of the proposed development in one go.
    </p>

    <h3>Outline planning application</h3>
    <p>
      An application seeking approval for the principle of the development — including size, layout, uses and key features. The rest of the details are provided later with a reserved matters applications.
    </p>

    <h3>Reserved matters application</h3>
    <p>
      Provides the additional details that aren&apos;t provided in an outline planning application. This could include layout, materials and landscape details.
    </p>

    <h3>Application for removal/variation of conditions</h3>
    <p>
      Planning applications are often approved with ‘conditions’, which have to be delivered before, during or after construction. Applicants have to apply to change these conditions.
    </p>

  </Explainer>
}
