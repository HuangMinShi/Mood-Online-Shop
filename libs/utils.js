const moment = require('moment')

const { shippingMethods } = require('../public/shippingMethods.json')

const utils = {
  formatDateToYYYYMMDD: (date) => {
    return moment(date).format('YYYY/MM/DD')
  },

  mapOrderStatusCodeToString: (statusNum) => {
    const orderStatusCodesList = {
      '-1': '取消',
      '0': '待付款',
      '1': '待出貨',
      '2': '待收貨',
      '3': '完成'
    }
    return orderStatusCodesList[statusNum.toString()]
  },

  getShippingFee: (shippingWay) => {
    const content = shippingMethods[shippingWay] || []
    const fee = Number(content[content.length - 1])
    return fee || 0
  }
}

module.exports = utils