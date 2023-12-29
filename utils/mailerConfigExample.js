const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com', // Please write your email here
    pass: 'your_email_password_app' // Please write down your email app password here
  },
  port: 587,
  secure: false
})

const mailerVerification = async (toEmail, template) => {
  const mailerConfig = {
    from: 'your_email@gmail.com', // Please write your email here
    to: toEmail,
    subject: 'Account Verification',
    html: template
  };

  try {
    const info = await transporter.sendMail(mailerConfig)
    console.log('Email sent: ' + info.response)
  } catch (error) {
    console.error(error);
  }
};

module.exports = { mailerVerification }