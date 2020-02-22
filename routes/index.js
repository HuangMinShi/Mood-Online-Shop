const users = require('./users')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')
const checkout = require('./checkout')

module.exports = app => {
  app.use('/users', users)
  app.use('/products', products)
  app.use('/cart', cart)
  app.use('/checkout', checkout)
  app.use('/orders', orders)
  app.use('/', (req, res) => res.redirect('/products'))
}
