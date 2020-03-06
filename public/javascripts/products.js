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

  // banner 預設
  showSlides(1);

  // 指示器點選事件
  $('.indicator').click(function (event) {
    if (event.target.matches('.dot')) {
      const targetSlideIndex = event.target.dataset.order
      currentSlide(targetSlideIndex)
    }
  })

  // 控制指示器
  function currentSlide(n) {
    const length = $('.slides').length
    let slideIndex = n

    if (n < 1) {
      slideIndex = length
    }

    if (n > length) {
      slideIndex = 1
    }

    showSlides(slideIndex);
  }

  function showSlides(slideIndex) {
    // 關閉舊的圖片
    const prevSlideIndex = $('.dot.active').removeClass('active').attr('data-order')
    $(`.slides-${prevSlideIndex}`).css('display', 'none')

    // 滑至新的圖片
    $(`.slides-${slideIndex}`).css('display', 'block')
    $(`.dots-${slideIndex}`).addClass('active')
  }

})()
