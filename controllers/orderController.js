const bcrypt = require('bcryptjs')

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
const { createTransport, generateMail } = require('../libs/mail')

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

  postCheckoutShipping: (req, res) => {
    let orderInfo = req.flash('data')[0]
    req.flash('data', orderInfo)
    const shippingInfo = req.body
    const shippingFee = getShippingFee(shippingInfo.shippingWay)
    const totalAmount = orderInfo.subTotal + shippingFee

    Object.assign(orderInfo, shippingInfo, { shippingFee, totalAmount })
    orderInfo = generateReceiveAddress(orderInfo)

    req.flash('data', orderInfo)
    return res.redirect('/orders/checkout/payment')
  },

  getCheckoutPayment: (req, res) => {
    const orderInfo = req.flash('data')[0]

    req.flash('data', orderInfo)
    return res.render('checkoutPayment', orderInfo)
  },

  postCheckoutPayment: (req, res) => {
    const paymentInfo = req.body
    const orderInfo = req.flash('data')[0]
    req.flash('data', orderInfo)

    Object.assign(orderInfo, paymentInfo)

    req.flash('data', orderInfo)
    return res.redirect('/orders/checkout/order')
  },

  getCheckoutOrder: (req, res) => {
    const orderInfo = req.flash('data')[0]
    req.flash('data', orderInfo)

    return res.render('checkoutOrder', orderInfo)
  },

  postOrder: async (req, res) => {
    try {
      const orderInfo = req.flash('data')[0]
      // 若 err 發生，則返回上一頁能續帶上次資料
      req.flash('data', orderInfo)

      // 新增 user
      const salt = await bcrypt.genSalt(10)
      const passwordInHash = await bcrypt.hash('HelloKitty24', salt)
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: orderInfo.orderEmail
        },
        defaults: {
          email: orderInfo.orderEmail,
          password: passwordInHash,
          name: orderInfo.receiveName,
          address: orderInfo.receiveAddress,
          tel: orderInfo.receivePhone,
          role: 'visitor'
        }
      })

      if (isCreated) {
        // 寄信通知未完成註冊
      }

      // 避免併發狀況，再確認庫存
      const skus = orderInfo.cartItems.map(item => item.sku)
      let productSkus = await ProductSku.findAll({
        attributes: ['id', 'sku', 'stock'],
        where: {
          sku: skus
        }
      })

      productSkus = productSkus
        .map(item => {
          const sku = item.sku
          delete item.dataValues.sku
          return {
            [sku]: item.dataValues
          }
        })
        .reduce((prev, curr) => Object.assign(prev, curr))

      const errors = []
      orderInfo.cartItems.forEach(item => {
        const stock = productSkus[item.sku].stock
        if (stock < item.quantity) {
          errors.push({
            message: `哎呀！晚了一步，商品 ${item.name}，庫存數量為 ${item.stock}，庫存不足請確認`
          })
        }
      })

      if (errors.length) {
        req.flash('errors', errors)
        return res.redirect('/cart')
      }

      // 新增 order
      const order = await Order.create({
        ...orderInfo,
        UserId: user.id
      })

      const sn = '000000' + order.id
      await order.update({ sn })

      // 新增 orderItems
      const orderItems = orderInfo.cartItems.map(item => {
        return OrderProductSku.create({
          quantity: item.quantity,
          OrderId: order.id,
          ProductSkuId: productSkus[item.sku].id
        })
      })

      await Promise.all(orderItems)

      // 清除購物車及商品資料
      // await Cart.destroy({
      //   where: {
      //     id: req.session.cartId
      //   }
      // })

      // 寄發訂單成立 mail
      const mail = generateMail(orderInfo, sn)
      const transporter = createTransport()
      transporter.sendMail(mail, (err, info) => {
        if (err) return console.log(err);
        return console.log(`Email sent：${info.response}`);
      })

      // 若成功額外帶往下一個頁面
      req.flash('order', order)

      return res.redirect('/orders/success')

    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        req.flash('errorMessage', err.errors[0].message)
        return res.redirect('back')
      }
      return console.log(err);
    }
  },

  getSuccessOrder: (req, res) => {
    const orderInfo = req.flash('data')[0]
    const order = req.flash('order')[0]
    return res.render('checkoutOrder', { ...orderInfo, order })
  },

  cancelOrder: (req, res) => {
    return res.send('cancel order')
  },

  getPayment: (req, res) => {
    return res.send('get payment')
  }
}

module.exports = orderController