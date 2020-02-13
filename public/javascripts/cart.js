import { addShippingFeeAndDisplayTotalAmount } from './libs.js'

(function () {
  $('.cart .info').change(function (event) {
    const target = event.target
    const value = target.value

    if ($(target).is('#receiveCountry')) {
      $('.qty-change input[name="receiveCountry"]').attr('value', value)
    }

    if ($(target).is('#county')) {
      $('.qty-change input[name="county"]').attr('value', value)
    }

    if ($(target).is('#zip')) {
      $('.qty-change input[name="zip"]').attr('value', value)
    }

    if ($(target).is('input[name="shippingWay"]')) {
      $('.qty-change input[name="shippingWay"]').attr('value', value)
    }
  })

  $('.shipping-methods').change(function () {
    addShippingFeeAndDisplayTotalAmount(this)
  })
})()