const moment = require('moment')

const {
  shippingMethods,
  receiptMethods,
  paymentMethods
} = require('../config/business.json')

module.exports = {
  currency: (price) => {
    const priceToNum = Number(price)

    if (price === '' || isNaN(priceToNum)) return price

    const options = { style: 'currency', currency: 'TWD' }
    const currency = priceToNum.toLocaleString('zh-TW', options)
    return currency.split('.', 1)[0]
  },

  shippingWayToMandarin: (way) => {
    return shippingMethods[way] && shippingMethods[way][0]
  },

  receiptToMandarin: (index) => {
    return receiptMethods[index]
  },

  paymentToMandarin: (index) => {
    return paymentMethods[index]
  },

  displayDate: (datetime) => {
    return moment(datetime).format('YYYY/MM/DD')
  },
}