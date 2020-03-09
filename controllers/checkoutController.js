const { counties } = require('../config/geonames.json')
const { shippingMethods } = require('../config/business.json')

const {
  generateReceiveAddress,
  reCalcShippingFeeAndTotalAmount,
} = require('../libs/utils')

const checkoutController = {
  getShipping: (req, res) => {

    // 取得 cart 所傳送的暫存及使用者的預估選擇
    let orderInfo = req.flash('data')[0]
    const shippingInfo = req.query

    // 無商品進入
    if (!orderInfo.itemsCount) {
      req.flash('errorMessage', '購物車目前沒有任何商品唷。')
      return res.redirect('back')
    }

    // 計算運費並合併 order, shipping
    orderInfo = reCalcShippingFeeAndTotalAmount(orderInfo, shippingInfo)

    // 暫存新資料
    req.flash('data', orderInfo)

    return res.render('checkout', { ...orderInfo, counties, shippingMethods, page: 'checkoutShipping' })
  },

  postShipping: (req, res) => {
    let orderInfo = req.flash('data')[0]
    const shippingInfo = req.body

    // 1. 計算運費並合併 order, shipping  2.產生頁面顯示的地址
    orderInfo = reCalcShippingFeeAndTotalAmount(orderInfo, shippingInfo)
    orderInfo = generateReceiveAddress(orderInfo)

    req.flash('data', orderInfo)

    return res.redirect('/checkout/payment')
  },

  getPayment: (req, res) => {
    let orderInfo = req.flash('data')[0]
    req.flash('data', orderInfo)

    return res.render('checkout', { ...orderInfo, page: 'checkoutPayment' })
  },

  postPayment: (req, res) => {
    const orderInfo = req.flash('data')[0]
    const paymentInfo = req.body

    // 合併 order, payment
    Object.assign(orderInfo, paymentInfo)

    req.flash('data', orderInfo)

    return res.redirect('/checkout/final')
  },

  getFinalCheck: (req, res) => {
    const orderInfo = req.flash('data')[0]
    req.flash('data', orderInfo)

    return res.render('checkout', { ...orderInfo, page: 'checkoutFinal' })
  }
}

module.exports = checkoutController