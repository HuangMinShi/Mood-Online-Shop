const bcrypt = require('bcryptjs')

const {
  Cart,
  User,
  Order,
  Product,
  sequelize,
  PaymentLog,
  ProductSku,
  OrderProductSku,
} = require('../models')

const {
  genDate,
  mapOrderStatusCodeToString,
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
        createdAt: order.createdAt,
        status: mapOrderStatusCodeToString(order.status)
      }
    })

    return res.render('orders', { orders })
  },

  getOrder: (req, res) => {
    return res.send('get order')
  },

  postOrder: async (req, res) => {
    try {
      const purchasedInfo = Object.assign({}, req.session.purchasedInfo)

      // 查詢庫存資料
      const skus = purchasedInfo.cartItems.map(item => item.sku)
      let productSkus = await ProductSku.findAll({
        attributes: ['id', 'sku', 'stock'],
        where: {
          sku: skus
        },
      })

      // 資料整理成以 sku 當 key 的 object
      let formattedProductSkus = productSkus.map(item => ({ ...item.dataValues })) // deep copy
      formattedProductSkus = formattedProductSkus.map(item => {
        const sku = item.sku
        delete item.sku
        return {
          [sku]: item
        }
      }).reduce((prev, curr) => Object.assign(prev, curr))

      // 比對庫存是否足夠
      const errors = []
      purchasedInfo.cartItems.forEach(item => {
        const stock = formattedProductSkus[item.sku].stock

        if (stock < item.quantity) {
          errors.push({
            message: `哎呀！晚了一步，商品 ${item.name}，庫存數量為 ${item.stock}，庫存不足請確認`
          })
        }

      })

      // 發現庫存不足，返回
      if (errors.length) {
        req.flash('errors', errors)
        return res.redirect('/cart')
      }

      // 準備成立訂單，使用 transaction
      const {
        order,
        isUserCreated
      } = await sequelize.transaction(async (transaction) => {

        // 新增 user
        const salt = await bcrypt.genSalt(10)
        const passwordInHash = await bcrypt.hash('HelloKitty24', salt)
        const [user, isUserCreated] = await User.findOrCreate({
          where: {
            email: purchasedInfo.orderEmail
          },
          defaults: {
            email: purchasedInfo.orderEmail,
            password: passwordInHash,
            name: purchasedInfo.receiveName,
            address: purchasedInfo.receiveAddress,
            tel: purchasedInfo.receivePhone,
            role: 'visitor'
          },
          transaction
        })

        // 新增 order
        const order = await Order.create({
          ...purchasedInfo,
          UserId: user.id
        }, { transaction })

        // 更新 order sn
        const sn = Math.floor(Math.random() * 100) + '000000' + order.id
        await order.update({ sn }, { transaction })

        // 新增 orderItems
        const orderItems = purchasedInfo.cartItems.map(item => {
          return OrderProductSku.create({
            quantity: item.quantity,
            OrderId: order.id,
            ProductSkuId: formattedProductSkus[item.sku].id
          }, { transaction })
        })
        await Promise.all(orderItems)

        // 清除 cart ( Model, DB 2 層均設置 cascade delete )
        const cart = await Cart.findByPk(req.session.cartId, { transaction })
        await cart.destroy({ transaction })

        // 更新庫存
        const updatedProductSkusStock = productSkus.map(productSku => {
          const qty = purchasedInfo.cartItems.find(item => item.sku === productSku.sku).quantity
          const remainedQty = productSku.stock - qty

          return productSku.update({ stock: remainedQty }, { transaction })
        })
        await Promise.all(updatedProductSkusStock)

        return { isUserCreated, order }
      })

      // 新用戶則寄信通知未完成註冊
      if (isUserCreated) {
        console.log('sent 訪客通知會員權益 mail');
      }

      // 寄發訂單成立 mail
      const mail = generateMail(purchasedInfo, order.sn)
      const transporter = createTransport()
      transporter.sendMail(mail, (err, info) => {
        if (err) return console.log(err);
        return console.log(`Email sent：${info.response}`);
      })

      // 訂單建立成功，將 order 資訊帶往 success order page
      const orderContent = {
        id: order.id,
        createdAt: order.createdAt,
        sn: order.sn
      }
      Object.assign(orderContent, req.session.purchasedInfo)
      req.flash('order', orderContent)

      // 新建立訂單與否帶往付款，讓付款 action 查詢訂單
      req.flash('isOrderCreated', true)

      // 移除 session data
      delete req.session.cartId
      delete req.session.purchasedInfo

      return res.redirect('/orders/success')

    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        req.flash('errorMessage', err.errors[0].message)
        return res.redirect('back')
      }
      return res.status(500).json(err.stack)
    }
  },

  getOrderSuccess: (req, res) => {
    const order = req.flash('order')[0]
    return res.render('checkout', { ...order, page: 'checkoutFinal' })
  },

  getPayment: async (req, res) => {
    try {
      const isOrderCreated = req.flash('isOrderCreated')[0]
      const orderId = req.params.id
      let order = null

      if (isOrderCreated) {

        // 只是為了 itemDesc 就要 join 到 product，未來得試著再反正規化
        order = await Order.findByPk(orderId, {
          attributes: ['id', 'sn', 'totalAmount', 'note', 'orderEmail'],
          include: [{
            model: ProductSku,
            attributes: ['id'],
            include: [{
              model: Product,
              attributes: ['id', 'name']
            }],
            as: 'orderItems'
          }]
        })
      } else {
        // 訪客查詢訂單
      }

      const tradeParams = {
        sn: order.sn,
        totalAmount: order.totalAmount,
        note: order.note,
        orderEmail: order.orderEmail,
        itemDesc: `${order.orderItems[0].Product.name} 等 ${order.orderItems.length} 件`
      }

      if (!order) {
        req.flash('errorMessage', '非法訪問')
        return res.redirect('/products')
      }

      const tradeInfo = genTradeInfo(tradeParams)

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
      const sn = tradeInfo.Result.MerchantOrderNo
      const isTradeSuccess = (tradeInfo.Status === 'SUCCESS') ? true : false

      if (fromURL === 'NotifyURL') {
        const order = await Order.findOne({ where: { sn } })

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

        return res.render('paymentSuccess', {
          sn,
          isTradeSuccess,
          isDoublePayment
        })

      }

      req.flash('errorMessage', '不合法的訪問')
      return res.redirect('/products')

    } catch (err) {
      return console.log(err)
    }
  },

  getOrderCheck: (req, res) => {
    return res.send('getOrderCheck')
  },

  postOrderCheck: (req, res) => {
    return res.send('postOrderCheck')
  },
}

module.exports = orderController