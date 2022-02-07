import Explainer from '../Explainer'

export default function CarbonExplainer(props) {
  return <Explainer hasLightBg={props.hasLightBg} hasMarginTop={props.hasMarginTop}
  buttonText='How did we calculate this?'>
    <h2>How did we calculate this?</h2>

    <p>
      Building regulations set the amount of carbon emissions a development can generate once it is in use.  This shows how far below the legal requirements the proposal is.
    </p>

  </Explainer>
}
