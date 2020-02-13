import { switchProductMainImage } from './libs.js'

(function () {
  $('[class=product-img] img:first-child').each(function () {
    $(this).addClass('selected')
  })

  $('.products').click(function (event) {

    if (event.target.matches('.color-option')) {
      const productSn = event.target.dataset.productSn
      const colorOption = event.target.dataset.colorOption

      switchProductMainImage(productSn, colorOption)
    }

  })
})()
