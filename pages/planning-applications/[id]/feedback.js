import { useState } from 'react'
import { useRouter } from 'next/router'
import { getClient } from "@lib/sanity";
import { groq } from "next-sanity";
import Head from 'next/head'
import FeedbackHeader from '../../../components/FeedbackHeader'
import FeedbackEmotion from '../../../components/FeedbackEmotion'
import Footer from '../../../components/Footer'
import styles from '../../../styles/Feedback.module.css'

export async function getServerSideProps(context) {
  // Put the app number back into the way Camden store it
  const appNumber = context.query.id.replace(/-/g, '/').toUpperCase();

  // Fetch the CMS data so we know whether to take the user to the second page
  // of feedback questions
  const query = groq`
    *[_type == "planning-application" && applicationNumber == "${appNumber}"] | order(_createdAt desc) [0] {
      ...
    }
  `;
  const cmsData = await getClient().fetch(query);

  return {
    props: {
      appNumber,
      cmsData
    }
  }
}


export default function Feedback(props) {
  const { appNumber, cmsData } = props;
  const router = useRouter()
  const { id } = router.query

  const [feedbackEmotion, setFeedbackEmotion] = useState(router.query.feeling)
  const [feedback, setFeedback] = useState(router.query.feedback)
  const [error, setError] = useState()

  const goToImpact = !!cmsData && (
    cmsData.showHousing && cmsData.housing ||
    cmsData.showOpenSpace && cmsData.openSpaceArea ||
    cmsData.showJobs && cmsData.jobs ||
    cmsData.showCarbon && cmsData.carbonEmissions ||
    cmsData.showAccess && cmsData.acess
  );

  const emotions = ['Love', 'Happy', 'Meh', 'Concerned', 'Angry'];

  const handleSelect = (e) => {
    setFeedbackEmotion(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (goToImpact) {
      // Go to the next set of feedback questions
      router.push({
        pathname: '/planning-applications/[id]/feedback-impact',
        query: { id: id, feeling: feedbackEmotion, feedback: feedback }
      });
      return
    }

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
      <Head>
        <title>Give feedback for planning application {appNumber} | Camden Planning</title>
        <meta name="description" content="Camden Digital Site Notice" />
      </Head>

      <FeedbackHeader>
        <h1>Tell us what you think</h1>
        <p>Your feedback helps us improve developments so they meet the needs of people in Camden. It&apos;s important you let us know what you think.</p>
        { goToImpact &&
          <p>First, we&apos;re going to ask you how you feel the development will affect you. On the next page, we&apos;ll ask you how you think it could have a positive impact in your local area.</p>
        }
      </FeedbackHeader>

      { goToImpact &&
        <div>
          <p className={styles.questionNumber}>Question 1/2</p>
        </div>
      }

      <section className={styles.section}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.question}>How do you feel about this development?</label>

          <div className={styles.emotionsWrapper}>
            { emotions.map(e =>
              <FeedbackEmotion
                key={e}
                emotion={e}
                handleSelect={handleSelect}
                selected={feedbackEmotion == e} />
            ) }
          </div>

          <textarea
            required={true}
            placeholder='Why do you feel this way?'
            rows='10'
            className={styles.textInput}
            value={feedback}
            onChange={(e)=>setFeedback(e.target.value)} />

          { error && <p className={styles.error}>{error}</p> }

          <input
            className={styles.submitButton}
            type='submit'
            value={ goToImpact ? 'Next' : 'Submit your feedback' } />

        </form>
      </section>

      <Footer />
    </>
  )
}
