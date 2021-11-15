import Image from 'next/image'
import styles from '../styles/FeedbackEmotion.module.css'

export default function FeedbackEmotion({emotion, handleSelect, selected}) {
  return (
    <label className={styles.emotion}>
      <input
        type='radio'
        required
        className={styles.input}
        value={emotion}
        name='emotion'
        onChange={handleSelect}
        checked={selected} />

      <Image
        src={`/icons/feedback/emotions/${emotion}${ selected ? '-selected' : ''}.svg`}
        alt=''
        width='62'
        height='62'
        priority={true} />

      <span className={styles.label}>{emotion}</span>
    </label>
  )
}
