const {
  shippingMethods,
  receiptMethods,
  paymentMethods
} = require('../config/business.json')

module.exports = {
  currency: (price) => {
    const priceToNum = Number(price)

    if (price === '' || isNaN(priceToNum)) {
      return price
    }

    const options = { style: 'currency', currency: 'TWD' }
    const currency = priceToNum.toLocaleString('zh-TW', options)
    return currency.split('.', 1)[0]
  }
}