import PlanningListItem from './PlanningListItem'

const PlanningList = (props) => {
  const { developments, currentLocation } = props;

  return (
    developments.map((d) => <PlanningListItem key={d.pk} development={d} currentLocation={currentLocation} />)
  )
}

export default PlanningList;
