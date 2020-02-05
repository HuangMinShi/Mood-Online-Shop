const moment = require('moment')

const { shippingMethods } = require('../config/business.json')

const utils = {
  formatDateToYYYYMMDD: (date) => {
    return moment(date).format('YYYY/MM/DD')
  },

  mapOrderStatusCodeToString: (statusNum) => {
    const orderStatusCodesList = {
      '0': '取消',
      '1': '待付款',
      '2': '待出貨',
      '3': '待收貨',
      '4': '完成'
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