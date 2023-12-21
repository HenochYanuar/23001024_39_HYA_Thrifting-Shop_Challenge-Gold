const { mailerVerification } = require('../utils/mailerConfig')
const ejs = require('ejs')
const path = require('path')

class MailRegister {

  constructor( user ){
    this.user = user
  }

  async sendMail(){
    // console.log(this.user.email)
    const emailParam = encodeURIComponent(this.user.email)
    const templatePath = path.join(__dirname, '..', 'views', 'mail', 'registerMail.ejs');

    const renderedTemplate = await ejs.renderFile(templatePath, {
      user: this.user,
      verificationLink: `http://localhost:3000/user/register/verify?email=${emailParam}`,
    })

    mailerVerification(this.user.email, renderedTemplate)

    // return res.render('../views/mail/registerMail.ejs', { user })
  }

}

module.exports = MailRegister