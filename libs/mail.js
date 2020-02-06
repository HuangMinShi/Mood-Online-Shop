const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');

const user = process.env.GMAIL_USER
const pass = process.env.GMAIL_PASS

const createTransport = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  })

  const options = {
    viewEngine: {
      layoutsDir: './views/email_views/layouts',
      partialsDir: './views/email_views/partials',
      defaultLayout: 'main',
    },
    viewPath: './views/email_views'
  }

  transporter.use('compile', hbs(options))

  return transporter
}

const generateMail = (orderInfo, sn) => {
  const mail = {
    from: user,
    to: orderInfo.email,
    subject: '【Burton 訂購通知信-訪客購買】',
    template: 'email',
    context: { orderInfo, sn }
  }

  return mail
}

module.exports = {
  createTransport,
  generateMail
}