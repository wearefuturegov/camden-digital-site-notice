import Explainer from '../Explainer'

export default function HomesExplainer(props) {
  return <Explainer hasLightBg={props.hasLightBg} hasMarginTop={props.hasMarginTop}
  buttonText='How did we calculate this?'>
    <h2>How to write good&nbsp;feedback?</h2>

    <h3>Influencing the finer details</h3>
    <p>
      By the time a development has reached application stage, the developer has probably already bought the land and drawn up plans. Now it&apos;s about the details. Residents knowledge about local need can help planners decide things like type of housing or what materials are appropriate.
    </p>

    <h3>Eyes and ears on the ground</h3>
    <p>
      Residents have in-depth knowledge about their local area and often highlight on-the-ground details that planners weren&apos;t aware of, like how a view could be affected or how a tree was left out of a developer&apos;s plans. 
      This is especially helpful now that planners aren&apos;t as likely to visit sites in person due to covid. Photos can be useful. 
    </p>

    <h3>Provide back up on what&apos;s important</h3>
    <p>
      Planners need bargaining power when negotiating with planners. It&apos;s useful to be able to demonstrate the certain priorities are important to residents so they can push developers to be more ambitious with their targets.
    </p>

    <h3>Is this development good for the area?</h3>
    <p>
      For Major Developments, planners make a judgement on whether the development is good for the area. This is based on whether the building is compliant with planning legislation and regulations and how well the development contributes to the priorities set out in the local plan and the national planning framework.
    </p>

    <h3>What are the priorities?</h3>
    <p>
      A single development is unlikely to fulfill all the priorities for the local area. The planner decides which priorities matter most and then negotiates with the developer on targets.
    </p>

    <h3>Should this development be approved now?</h3>
    <p>
      A planning committee made up of elected councillors makes the final decision about whether a development is allowed to go ahead. Widespread objection from the public can slow down the decision.
    </p>
  </Explainer>
}
