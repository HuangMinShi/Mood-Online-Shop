const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(flash())

app.use(session({
  secret: 'HelloKitty',
  cookie: { maxAge: 80000 },
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage')
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.errors = req.flash('errors')
  next()
})

app.listen(port, () => {
  console.log(`App is running on localhost:${port}, env:${env}`)
})

require('./routes')(app)