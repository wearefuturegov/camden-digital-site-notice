import Explainer from '../Explainer'

export default function JobsExplainer(props) {
  return <Explainer hasLightBg={props.hasLightBg} hasMarginTop={props.hasMarginTop}
  buttonText='How did we calculate this?'>
    <h2>How did we calculate this?</h2>

    <p>
      The council  estimates how many new jobs a new development will produce based on the size and type of development. This estimate is based on the Employment Density Guide (3rd addition) produced by Homes & Community Agency (2015). A summary of this guide is published as part of the Camden Planning Guidance for Employment sites and business premises (Appendix 1).
    </p>

  </Explainer>
}
