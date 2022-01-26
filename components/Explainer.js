import Dialog from '../components/Dialog'
import styles from '../styles/Explainer.module.css'

// Component for explainer text. It's essentially a dialog with a standard
// open component that has a question mark icon and some text. Clicking it opens
// the dialog with the explainer text.
export default function Explainer(props) {
  const hasLightBgClass = props.hasLightBg ? styles.hasLightBg : '';
  const hasMarginTopClass = props.hasMarginTop ? styles.hasMarginTop : '';

  const button = <>
    <span className={[styles.button, hasLightBgClass, hasMarginTopClass].join(' ')}>
      <div className={styles.questionMark}>?</div>
      {props.buttonText}
    </span>
  </>;

  return (
    <Dialog openComponent={button}>
      {props.children}
    </Dialog>
  )
}
