import {
  switchProductMainImage,
  currentSlide,
  plusSlides,
  showSlides
} from './libs.js'

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

  // banner 預設
  showSlides(0);

  // click event
  $('.slideshow-container .action').click(function (event) {
    if (event.target.matches('.dot')) {
      const targetSlideIndex = event.target.dataset.order
      currentSlide(targetSlideIndex)
    }

    if (event.target.matches('.prev')) {
      plusSlides(-1)
    }

    if (event.target.matches('.next')) {
      plusSlides(1)
    }
  })

  // Change image every 5 seconds
  setInterval(function () {
    plusSlides(1)
  }, 5000)

})()
