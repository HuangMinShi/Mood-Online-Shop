const {
  User,
  Order,
  ProductSku,
  OrderProductSku
} = require('../models')

const {
  getShippingFee,
  formatDateToYYYYMMDD,
  mapOrderStatusCodeToString,
  generateReceiveAddress
} = require('../libs/utils')

const { counties } = require('../config/geonames.json')
const { shippingMethods } = require('../config/business.json')
const { shippingOptions } = require('../config/options.json')

const orderController = {
  getOrders: async (req, res) => {

    /** expected output
     * 
     * orders = {
     *  sn: '456789987',
     *  createdAt: 2010/02/10,
     *  receiveAddress: '台北市中正區1號',
     *  order: 2980,
     *  status: '待付款'
     * }
     * 
     */

    let orders = await Order.findAll({
      where: {
        UserId: 1
      },
      attributes: ['id', 'sn', 'status', 'totalAmount', 'receiveAddress', 'createdAt'],
      order: [['sn', 'ASC']]
    })

    orders = orders.map(order => {
      return {
        ...order.dataValues,
        createdAt: formatDateToYYYYMMDD(order.createdAt),
        status: mapOrderStatusCodeToString(order.status)
      }
    })

    return res.render('orders', { orders })
  },

  getOrder: (req, res) => {
    return res.send('get order')
  },

  getCheckoutShipping: (req, res) => {
    const cartInfo = req.flash('data')[0]
    const shippingInfo = req.query
    const shippingFee = getShippingFee(shippingInfo.shippingWay)
    const totalAmount = cartInfo.subTotal + shippingFee
    const orderInfo = Object.assign({}, cartInfo, shippingInfo, { shippingFee, totalAmount })

    req.flash('data', orderInfo)
    return res.render('checkoutShipping', { ...orderInfo, counties, shippingMethods, ...shippingOptions })
  },


    return res.render('checkout', { ...cartInfo, counties, shippingMethods, ...options })
  },

  postCheckoutShipping: (req, res) => {
    // console.log('postCheckoutShipping', req.flash('data'));



    return res.send('postCheckoutShipping')
  },

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