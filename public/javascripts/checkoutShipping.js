import { addShippingFeeAndDisplayTotalAmount } from './libs.js'

(function () {
  $('.shipping-methods').change(function () {
    addShippingFeeAndDisplayTotalAmount(this)
  })
})()