const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { createTransport } = require('nodemailer');
const checkEnv = require('check-env');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
// Enable CORS
app.use(cors());

app.use(bodyParser.json());

checkEnv(['OUTLOOK_EMAIL', 'OUTLOOK_PASSWORD']);
// Configure Nodemailer transporter
// Configuration for NodeMailer transporter
const transporter = createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.OUTLOOK_EMAIL, // Your Outlook email address
    pass: process.env.OUTLOOK_PASSWORD // Your Outlook email password
  }
});

// POST endpoint to handle booking submission
app.post('/api/sendEmail', async (req, res) => {
  try {
    const { checkIn, checkOut, adults, kids, email } = req.body;

    // Create email message
    const message = {
      from: 'ottojoash48@outlook.com',
      to: 'louisjoshbricks@gmail.com', // Email address where the booking information will be sent
      subject: 'Booking Information',
      text: `
        Check-in: ${checkIn}
        Check-out: ${checkOut}
        Adults: ${adults}
        Kids: ${kids}
        Email: ${email}
      `,
    };

    // Send email
    await transporter.sendMail(message);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
  

// const express = require('express');
// const bodyParser = require('body-parser');
// const sgMail = require('@sendgrid/mail');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(cors());

// // Set your SendGrid API key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// // POST endpoint to handle booking submission
// app.post('/api/sendEmail', async (req, res) => {
//   try {
//     const { checkIn, checkOut, adults, kids, email } = req.body;

//     // Create email message
//     const msg = {
//       to: 'ottojoash48@gmail.com',
//       from: 'ottojoash48@outlook.com', // Your verified email address on SendGrid
//       subject: 'Booking Information',
//       text: `
//         Check-in: ${checkIn}
//         Check-out: ${checkOut}
//         Adults: ${adults}
//         Kids: ${kids}
//         Email: ${email}
//       `,
//     };

//     // Send email
//     await sgMail.send(msg);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Failed to send email');
//   }
// });

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
//   });