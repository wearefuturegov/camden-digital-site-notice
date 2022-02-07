import Explainer from '../Explainer'

export default function HomesExplainer(props) {
  return <Explainer hasLightBg={props.hasLightBg} hasMarginTop={props.hasMarginTop}
  buttonText='How did we calculate this?'>
    <h2>How did we calculate this?</h2>

    <p>
      The number of self contained homes that are being proposed. This includes affordable, social and private housing. Larger schemes might have a range showing the minimum and maximum number of homes if the total number is going to be decided later.
    </p>

    <h3>Learn more about affordable housing</h3>
    <p>
      Affordable housing is a term used to cover different types of housing that are less costly than housing on the private market. This might be social rented housing, affordable rented housing or housing which the government helps people to buy a proportion of. It can be shown as a proportion of the total number of homes, or as a proportion of the total residential floorspace.
    </p>
  </Explainer>
}
