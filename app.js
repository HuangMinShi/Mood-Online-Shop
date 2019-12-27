const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`App is running on localhost:${port}, env:${env}`)
})

require('./routes')(app)