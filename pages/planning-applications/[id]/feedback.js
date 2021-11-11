import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import CamdenLogo from '../../../components/CamdenLogo'
import BreadcrumbArrow from '../../../components/BreadcrumbArrow'
import FeedbackEmotion from '../../../components/FeedbackEmotion'
import Footer from '../../../components/Footer'
import styles from '../../../styles/Feedback.module.css'

export default function Feedback(props) {
  const router = useRouter()
  const { id } = router.query
  const [feedbackEmotion, setFeedbackEmotion] = useState()
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState()

  const emotions = ['love', 'happy', 'meh', 'concerned', 'angry'];

  const handleSelect = (e) => {
    setFeedbackEmotion(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Put the app number back the way Camden store it
    const appNumber = id.replace(/-/g, '/').toUpperCase()

    const response = await fetch('/api/feedback', {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           applicationNumber: appNumber,
           feedbackEmotion: feedbackEmotion,
           feedback: feedback
         })
    });

    if (response.ok) {
      router.push(`/planning-applications/${id}/thank-you`);
    } else {
      console.log(response);
      // TODO better error handling
      setError('Sorry, something went wrong submitting your feedback');
    }
  }


  return (
    <>
      <section className={styles.header}>
        <CamdenLogo colour='white' />

        <div className={styles.breadcrumbs}>
          <Link href='/'>
            <a>Planning Applications</a>
          </Link>
          <BreadcrumbArrow />
          <Link href={`/planning-applications/${id}`}>
            <a>Overview</a>
          </Link>
          <BreadcrumbArrow />
          <span className={styles.highlight}>Submit your feedback</span>
        </div>

        <h1>Tell us what you think</h1>
        <p>Your feedback helps us improve developments so they meet the needs of people in Camden. It&apos;s important you let us know what you think.</p>
      </section>

      <section className={styles.section}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.question}>How do you feel about this development?</label>

          <div className={styles.emotionsWrapper}>
            { emotions.map(e => <FeedbackEmotion
                                  key={e}
                                  emotion={e}
                                  handleSelect={handleSelect}
                                  selected={feedbackEmotion == e} />
                          ) }
          </div>

          <textarea placeholder='Why do you feel this way?' rows='10' className={styles.textInput} value={feedback} onChange={(e)=>setFeedback(e.target.value)} />
          { error && <p className={styles.error}>{error}</p> }
          <input className={styles.submitButton} type='submit' value='Submit your feedback' />
        </form>
      </section>

      <Footer />
    </>

  )
}
