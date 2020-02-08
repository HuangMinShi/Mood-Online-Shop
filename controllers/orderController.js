const bcrypt = require('bcryptjs')

const { counties } = require('../config/geonames.json')
const { shippingMethods } = require('../config/business.json')
const { shippingOptions } = require('../config/options.json')

const {
  User,
  Order,
  ProductSku,
  OrderProductSku,
  PaymentLog
} = require('../models')

const {
  genDate,
  getShippingFee,
  formatDateToYYYYMMDD,
  generateReceiveAddress,
  mapOrderStatusCodeToString
} = require('../libs/utils')

const {
  createTransport,
  generateMail
} = require('../libs/mail')

const {
  decrypt,
  genTradeInfo
} = require('../libs/newebpay')

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
      // delete req.session.cartId

      // 寄發訂單成立 mail
      // const mail = generateMail(orderInfo, sn)
      // const transporter = createTransport()
      // transporter.sendMail(mail, (err, info) => {
      //   if (err) return console.log(err);
      //   return console.log(`Email sent：${info.response}`);
      // })

      // 若成功額外帶往下一個頁面
      req.flash('order', order)
      req.flash('isOrderNewCreated', true)

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

  getPayment: async (req, res) => {
    try {
      const isOrderNewCreated = req.flash('isOrderNewCreated')[0]
      const orderId = req.params.id
      let order = null

      if (isOrderNewCreated) {
        order = await Order.findByPk(orderId, {
          attributes: ['id', 'sn', 'totalAmount', 'note', 'orderEmail']
        })
      } else {
        // 訪客查詢訂單
      }

      if (!order) {
        req.flash('errorMessage', '非法訪問')
        return res.redirect('/products')
      }

      const tradeInfo = genTradeInfo(order.dataValues)

      return res.render('payment', { tradeInfo })
    } catch (err) {
      console.log(err);
    }
  },

  newebpayCallback: async (req, res) => {
    try {
      const fromURL = req.query.from
      const tradeResult = req.body
      const tradeInfo = JSON.parse(decrypt(tradeResult.TradeInfo))
      const isTradeSuccess = (tradeInfo.Status === 'SUCCESS') ? true : false

      if (fromURL === 'NotifyURL') {
        const sn = tradeInfo.Result.MerchantOrderNo
        const order = await Order.findOne({ whehe: { sn } })

        const [paymentLog, isNewCreated] = await PaymentLog.findOrCreate({
          where: {
            OrderId: order.id,
            status: true
          },
          defaults: {
            tradeNo: tradeInfo.Result.TradeNo,
            paymentType: tradeInfo.Result.PaymentType,
            payTime: genDate(tradeInfo.Result.PayTime),
            amt: Number(tradeInfo.Result.Amt),
            OrderId: order.id
          }
        })

        // 從 newebpay 觸發交易，但 paymentLog 已有該筆訂單成功付款紀錄
        if (!isNewCreated) {
          console.log('商店管理員重複觸發交易')
          return res.status(200).send('商店管理員重複觸發交易')
        }

        // 交易成功，修改訂單及交易紀錄的狀態
        if (isTradeSuccess && isNewCreated) {
          await paymentLog.update({ status: true }) // true成功, false失敗
          await order.update({ status: '2' }) // 0取消 1待付款 2待出貨 3待收貨 4完成
        }

        return res.status(200).send('消費者付款失敗');
      }

      if (fromURL === 'ReturnURL') {

        // 已存在相同的商店訂單編號
        const isDoublePayment = (tradeInfo.Status === 'MPG03008') ? true : false

        return res.render('test', {
          fromURL,
          isTradeSuccess,
          isDoublePayment
        })

      }

      req.flash('errorMessage', '不合法的訪問')
      return res.redirect('/products')
    } catch (err) {
      return console.log(err)
    }
  }
}

module.exports = orderController