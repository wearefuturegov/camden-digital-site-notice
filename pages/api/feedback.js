import sendgrid from '@sendgrid/mail'
import { GoogleSpreadsheet } from 'google-spreadsheet'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { applicationNumber, feedbackEmotion, feedback, impactFeedback, postcode } = req.body;
    console.log(req.body);

    // Send the feedback to a Google spreadsheet if a sheet ID is present
    if (process.env.GOOGLE_SHEET_ID) {
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

      try {
        await doc.useServiceAccountAuth({
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY,
        });

        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsByIndex[0];

        let row = {
          'Application number': applicationNumber,
          'User postcode': postcode,
          'Feedback emotion': feedbackEmotion,
          'General feedback': feedback
        };

        impactFeedback.forEach(area => row[area.name] = area.feedback);

        await sheet.addRow(row);
      } catch (err) {
        console.log(err)
      }
    }

    // Send an email containing the feedback
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
