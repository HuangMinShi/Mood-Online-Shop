const moment = require('moment')

const utils = {
  formatDateToYYYYMMDD: (date) => {
    return moment(date).format('YYYY/MM/DD')
  },

  formatNumberToCurrency: (price) => {
    const formatedPrice = price.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    return formatedPrice.split('.', 1)[0]
  },

  formatCurrencyToNumber: (currency) => {
    return Number(currency.replace(/[^0-9.-]+/g, ''))
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
  }
}

module.exports = utils