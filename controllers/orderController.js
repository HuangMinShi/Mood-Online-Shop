const {
  Cart,
  Order,
  Color,
  Image,
  Product
} = require('../models')

const {
  formatDateToYYYYMMDD,
  mapOrderStatusCodeToString
} = require('../libs/utils')

const { getShippingFee } = require('../libs/utils')
const { counties } = require('../public/counties.json')
const { shippingMethods } = require('../public/shippingMethods.json')

const options = {
  email: 'england78999@gmail.com',
  name: '蔡易軒',
  country: '台灣',
  county: '南投縣',
  township: '南投市',
  street: '埔里鎮民生路127號',
  postal: '400',
  phone: '0912387122',
  shipping: 'directDelivery'
}

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
      attributes: ['id', 'sn', 'status', 'total', 'receiveAddress', 'createdAt'],
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
    const shippingInfo = req.query
    const cartInfo = req.flash('cartInfo')[0] || {}
    const shippingFee = getShippingFee(shippingInfo.shippingWay)
    const total = cartInfo.subTotal + shippingFee

    Object.assign(cartInfo, shippingInfo, { shippingFee, total })

    // 資料閃存
    const flashLength = req.flash('cartInfo').length
    if (flashLength < 2) {
      req.flash('cartInfo', cartInfo)
    }

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