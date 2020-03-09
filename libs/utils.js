const {
  orderStatus,
  shippingMethods
} = require('../config/business.json')

const utils = {
  mapOrderStatusCodeToString: (statusNum) => {
    return orderStatus[statusNum.toString()]
  },

  getShippingFee: (shippingWay) => {
    const content = shippingMethods[shippingWay] || []
    const fee = Number(content[content.length - 1])
    return fee || 0
  },

  formatReceiveAddress: (data) => {
    const addressRequiredElements = ['zip', 'county', 'township', 'street']
    const { zip, county, township, street } = data

    data.receiveAddress = `${zip}  ${county}${township}${street}`

    addressRequiredElements.forEach(element => {
      delete data[element]
    })

    return
  },

  genDate: (str) => {
    const dateStr = str.slice(0, 10) + 'T' + str.slice(10)
    return new Date(dateStr)
  },

  reCalcShippingFeeAndTotalAmount: (data) => {
    data.shippingFee = this.getShippingFee(data.shippingWay)
    data.totalAmount = data.subTotal + data.shippingFee
    return
  },
}

this.getShippingFee = utils.getShippingFee  // genOrderInfo 使用

module.exports = utils