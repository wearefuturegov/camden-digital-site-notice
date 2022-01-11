import nodemailer from 'nodemailer'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { applicationNumber, feedbackEmotion, feedback, impactFeedback, postcode } = req.body;
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const impactFeedbackHTML = impactFeedback ? impactFeedback.map(area => area.feedback ? `<h3>${area.name}</h3><p>${area.feedback}</p>` : null ).join('') : '';

    const options = {
      from: 'Camden Digital Site Notice',
      to: process.env.GMAIL_USER,
      subject: `Camden Digital Site Notice: New feedback for planning application ${applicationNumber}`,
      html: `<h1>New feedback for planning application ${applicationNumber}</h1>
            <h2>Feeling</h2>
            <p>${feedbackEmotion}</p>
            <h2>Feedback</h2>
            <p>${feedback}</p>
            ${ impactFeedbackHTML }
            <h2>Postcode</h2>
            <p>${postcode ? postcode : 'Not provided'}</p>`
    }

    transporter.sendMail(options, (error) => {
      if (error) {
        console.log(error);
        res.status(400).send({ message: error })
      } else {
        res.status(200).send({ message: 'Success' })
      }
    });

  } else {
    res.status(400).send({ message: 'Only POST requests allowed' })
    return
  }

}
