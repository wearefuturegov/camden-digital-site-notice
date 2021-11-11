import Image from 'next/image'
import styles from '../styles/FeedbackEmotion.module.css'

export default function FeedbackEmotion({emotion, handleSelect, selected}) {
  return (
    <label className={styles.emotion}>
      <input type='radio' required className={styles.input} value={emotion} name='emotion' onChange={handleSelect} />
      <Image src={`/icons/feedback/emotions/${emotion}${ selected ? '-selected' : ''}.svg`} alt={emotion} width='62' height='62' />

      <span className={styles.label}>{emotion}</span>
    </label>
  )
}
