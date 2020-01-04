const users = require('./users')

module.exports = app => {
  app.use('/users', users)
  app.use('/', (req, res) => res.send('home page'))
}
