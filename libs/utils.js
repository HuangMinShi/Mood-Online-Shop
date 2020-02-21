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

  generateReceiveAddress: (orderInfo) => {
    const addressRequiredElements = ['zip', 'county', 'township', 'street']
    const { zip, county, township, street } = orderInfo

    orderInfo.receiveAddress = `${zip}  ${county}${township}${street}`

    addressRequiredElements.forEach(element => {
      delete orderInfo[element]
    })

    return orderInfo
  },

  genDate: (str) => {
    const dateStr = str.slice(0, 10) + 'T' + str.slice(10)
    return new Date(dateStr)
  },

  reCalcShippingFeeAndTotalAmount: (data, shippingInfo) => {
    const shippingFee = this.getShippingFee(shippingInfo.shippingWay)
    const totalAmount = data.subTotal + shippingFee
    Object.assign(data, shippingInfo, { shippingFee, totalAmount })
    return data
  },
}

this.getShippingFee = utils.getShippingFee  // genOrderInfo 使用

module.exports = utils