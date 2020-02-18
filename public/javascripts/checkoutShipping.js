import {
  displayPickStores,
  addShippingFeeAndDisplayTotalAmount
} from './libs.js'

(function () {
  $('.shipping-methods').change(function () {
    addShippingFeeAndDisplayTotalAmount(this)
    displayPickStores()
  })

  // 一進頁面先判斷是否為到店自取
  if ($('#inStorePickup').is('.checked')) {
    $('.store').addClass('show')
  }
})()