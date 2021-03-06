const { counties } = require('../config/geonames.json')
const { shippingMethods } = require('../config/business.json')

const {
  formatReceiveAddress,
  reCalcShippingFeeAndTotalAmount,
} = require('../libs/utils')

const checkoutController = {
  getShipping: (req, res) => {

    // 合併
    const purchasedInfo = Object.assign({}, req.session.purchasedInfo, req.query)

    // 無商品進入
    if (!purchasedInfo.itemsCount) {
      req.flash('errorMessage', '購物車目前沒有任何商品唷。')
      return res.redirect('back')
    }

    // 重新計算運費
    reCalcShippingFeeAndTotalAmount(purchasedInfo)

    return res.render('checkout', { ...purchasedInfo, counties, shippingMethods, page: 'checkoutShipping' })
  },

  postShipping: (req, res) => {

    // 合併
    const purchasedInfo = Object.assign({}, req.session.purchasedInfo, req.body)

    // 重新計算運費
    reCalcShippingFeeAndTotalAmount(purchasedInfo)

    // 重組地址
    formatReceiveAddress(purchasedInfo)

    // 更新 session data
    Object.assign(req.session.purchasedInfo, purchasedInfo)

    return res.redirect('/checkout/payment')
  },

  getPayment: (req, res) => {
    const purchasedInfo = Object.assign({}, req.session.purchasedInfo)
    return res.render('checkout', { ...purchasedInfo, page: 'checkoutPayment' })
  },

  postPayment: (req, res) => {
    Object.assign(req.session.purchasedInfo, req.body)
    return res.redirect('/checkout/final')
  },

  getFinalCheck: (req, res) => {
    const purchasedInfo = Object.assign({}, req.session.purchasedInfo)
    return res.render('checkout', { ...purchasedInfo, page: 'checkoutFinal' })
  }
}

module.exports = checkoutController