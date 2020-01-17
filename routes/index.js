const users = require('./users')
const products = require('./products')
const cart = require('./cart')

module.exports = app => {
  app.use('/users', users)
  app.use('/products', products)
  app.use('/cart', cart)

  app.use('/', (req, res) => res.send('HOME'))
}
