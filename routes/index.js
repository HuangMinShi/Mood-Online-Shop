const users = require('./users')
const products = require('./products')

module.exports = app => {
  app.use('/users', users)
  app.use('/products', products)

  app.use('/', (req, res) => res.send('HOME'))
}
