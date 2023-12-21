const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'henochyanuar13@gmail.com',
    pass: 'wjnb hvbc qqxf ztvs'
  },
  port: 587,
  secure: false
})

const mailerVerification = async (toEmail, template) => {
  const mailerConfig = {
    from: 'henochyanuar13@gmail.com',
    to: toEmail,
    subject: 'Account Verification',
    html: template
  };

  try {
    const info = await transporter.sendMail(mailerConfig);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { mailerVerification };