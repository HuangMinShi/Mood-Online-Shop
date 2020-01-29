const {
  Order
} = require('../models')

const {
  formatDateToYYYYMMDD,
  formatNumberToCurrency,
  mapOrderStatusCodeToString
} = require('../libs/utils')

const counties = require('../public/counties.json').counties
const shippingMethods = require('../public/shippingMethods.json').shippingMethods

const orderController = {
  getOrders: async (req, res) => {

    /** expected output
     * 
     * orders = {
     *  sn: '456789987',
     *  createdAt: 2010/02/10,
     *  receiveAddress: '台北市中正區1號',
     *  amount: NT$ 2,980,
     *  status: '待付款'
     * }
     * 
     */

    let orders = await Order.findAll({
      where: {
        UserId: 1
      },
      attributes: ['id', 'sn', 'status', 'amount', 'receiveAddress', 'createdAt'],
      order: [['sn', 'ASC']]
    })

    orders = orders.map(order => {
      return {
        ...order.dataValues,
        createdAt: formatDateToYYYYMMDD(order.createdAt),
        amount: formatNumberToCurrency(order.amount),
        status: mapOrderStatusCodeToString(order.status)
      }
    })

    return res.render('orders', { orders })
  },

  getOrder: (req, res) => {
    return res.send('get order')
  },

  createOrder: (req, res) => {
    const cartInfo = req.query

    return res.render('create', { counties, shippingMethods })
  },

  postOrder: (req, res) => {
    return res.send('post order')
  },

  cancelOrder: (req, res) => {
    return res.send('cancel order')
  },

  getPayment: (req, res) => {
    return res.send('get payment')
  }
}

module.exports = orderController