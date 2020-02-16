import { switchProductMainImage } from './libs.js'

(function () {
  // 預設
  $('[class=product-img] img:first-child').each(function () {
    $(this).addClass('selected')
  })

  $('.products').click(function (event) {

    if (event.target.matches('.color')) {
      const target = event.target
      const productSn = event.target.dataset.productSn
      const colorOption = event.target.dataset.colorOption

      switchProductMainImage(productSn, colorOption)

      // 選取顏色時變化
      $('.color-img-wrapper.selected').removeClass('selected')
      $(target).parent().addClass('selected')
    }

  })
})()
