import {
  clacQtyWith,
  switchSizeTo,
  switchColorTo,
  switchSizeBlockTo,
  switchGalleryBlockTo,
  toSelectDefaultColor,
  switchGalleryMainImageTo,
} from './libs.js'

(function () {
  // 預設
  toSelectDefaultColor()

  // 選取顏色或尺寸事件
  $('.attribute-options').click(function (event) {

    if (event.target.matches('.color')) {
      const colorSelected = event.target.dataset.option
      switchColorTo(colorSelected, event.target)
      switchSizeBlockTo(colorSelected)
      switchGalleryBlockTo(colorSelected)
    }

    if (event.target.matches('.size')) {
      const sizeSelected = event.target.dataset.option
      switchSizeTo(sizeSelected, event.target)
    }

  })

  // 選取畫廊縮圖事件
  $('.nav-wrap').click(function (event) {

    if (event.target.matches('.img-order')) {
      const orderSelected = event.target.dataset.option
      switchGalleryMainImageTo(orderSelected)
    }

  })

  // 增減數量事件
  $('.calc-quantity').click(function (event) {
    if (event.target.matches('.quantity-plus')) return clacQtyWith('+')
    if (event.target.matches('.quantity-minus')) return clacQtyWith('-')
  })
})()
