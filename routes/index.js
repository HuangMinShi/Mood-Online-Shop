const users = require('./users')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')

module.exports = app => {
  app.use('/users', users)
  app.use('/products', products)
  app.use('/cart', cart)
  app.use('/orders', orders)
}
