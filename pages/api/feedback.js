import sendgrid from '@sendgrid/mail'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { applicationNumber, feedbackEmotion, feedback, impactFeedback, postcode } = req.body;
    console.log(req.body);

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    const impactFeedbackHTML = impactFeedback ? impactFeedback.map(area => area.feedback ? `<h3>${area.name}</h3><p>${area.feedback}</p>` : null ).join('') : '';

    const message = {
      to: process.env.FEEDBACK_TO_EMAIL,
      from: {
        email: process.env.FEEDBACK_FROM_EMAIL,
        name: 'Camden Digital Site Notice',
      },
      subject: `New feedback for planning application ${applicationNumber}`,
      html: `<h1>New feedback for planning application ${applicationNumber}</h1>
      <h2>Feeling</h2>
      <p>${feedbackEmotion}</p>
      <h2>Feedback</h2>
      <p>${feedback ? feedback : 'Not provided'}</p>
      ${ impactFeedbackHTML }
      <h2>Postcode</h2>
      <p>${postcode ? postcode : 'Not provided'}</p>`
    }

    try {
      await sendgrid.send(message)

      res.status(200).send({ message: 'Success' })
    } catch(error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
        res.status(400).send({ message: error.response.body })
      }

      res.status(400).send({ message: error })
    }

  } else {
    res.status(400).send({ message: 'Only POST requests allowed' })
  }

}
