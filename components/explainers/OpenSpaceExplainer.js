import Explainer from '../Explainer'

export default function OpenSpaceExplainer(props) {
  return <Explainer hasLightBg={props.hasLightBg} hasMarginTop={props.hasMarginTop}
  buttonText='How did we calculate this?'>
    <h2>How did we calculate this?</h2>

    <p>
      Open space includes land and areas of water (such as rivers and canals) which can be used for sport, recreation and relaxation. Applicants calculate the amount of open space, but it’s checked by council planners when assessing the application.
    </p>

  </Explainer>
}
