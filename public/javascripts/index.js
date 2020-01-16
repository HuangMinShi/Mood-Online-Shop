(function () {
  /************* products 頁面 *************/
  $('[class=product-imgs] img:first-child').each(function () {
    $(this).addClass('selected')
  })

  $('#data-panel').click((event) => {
    if (event.target.matches('.color-option')) {
      const productSn = event.target.dataset.productSn
      const colorOption = event.target.dataset.colorOption
      switchProductMainImage(productSn, colorOption)
    }
  })


  /************* product 頁面 *************/
  // 預設
  defaultSelectedColor()

  // 選取顏色或尺寸事件
  $('.attribute-options').click(function (event) {
    if (event.target.matches('.color')) {
      const selectedColor = event.target.dataset.option
      switchColorTo(selectedColor, event.target)
      switchSizeBlockTo(selectedColor)
      switchGalleryBlockTo(selectedColor)
    }
    if (event.target.matches('.size')) {
      const selectedSize = event.target.dataset.option
      switchSizeTo(selectedSize, event.target)
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
    if (event.target.matches('.quantity-plus')) return calcQuantityUse('+')
    if (event.target.matches('.quantity-minus')) return calcQuantityUse('-')
  })

  /************* Functions *************/
  /** products **/
  function switchProductMainImage(productSn, colorOption) {
    $(`.product-${productSn} .product-imgs`).find('.selected').removeClass('selected')
    $(`.product-${productSn} .product-imgs`).find(`.color-option-${colorOption}`).addClass('selected')
  }

  /** product **/
  function defaultSelectedColor() {
    // 預設第一組 color
    const defaultColor = $('.color-option img').first().addClass('selected').attr('data-option')
    // 依據預設 color 選取 size and gallery 並輸入 value
    $(`.size-option div[class~=color-${defaultColor}]`).addClass('selected')
    $(`.gallery span[class~=color-${defaultColor}]`).each(function () {
      $(this).addClass('selected').children().first().addClass('selected')
    })
    $('input[name=color]').attr('value', defaultColor)
  }

  function switchColorTo(color, colorTarget) {
    $('.color-option img.selected').removeClass('selected')
    $(colorTarget).addClass('selected')
    $('input[name=color]').attr('value', color)
  }

  function switchSizeTo(size, sizeTarget) {
    $('.size-option button.selected').removeClass('selected')
    $(sizeTarget).addClass('selected')
    $('input[name=size]').attr('value', size)
  }

  function switchGalleryBlockTo(color) {
    $('.gallery span.selected').each(function () {
      $(this).removeClass('selected').find('img.selected').removeClass('selected')
    })
    $(`.gallery span[class~=color-${color}]`).each(function () {
      $(this).addClass('selected').children().first().addClass('selected')
    })
  }

  function switchSizeBlockTo(color) {
    $('.size-option div.selected').removeClass('selected')
    $(`.size-option div[class~=color-${color}]`).addClass('selected')
    // 切換顏色時 size 也要清空
    $('.size-option button.selected').removeClass('selected')
    $('input[name=size]').attr('value', null)
  }

  function switchGalleryMainImageTo(order) {
    $('.gallery img.selected').each(function () {
      $(this).removeClass('selected')
    })
    $(`.gallery span.selected img[class~=order-${order}]`).each(function () {
      $(this).addClass('selected')
    })
  }

  function calcQuantityUse(operator) {
    let quantity = $('.quantity').attr('value')

    if (operator === '+') {
      quantity = (quantity < 10) ? ++quantity : 10
    }
    if (operator === '-') {
      quantity = (quantity > 1) ? --quantity : 1
    }

    $('.quantity').attr('value', quantity)
  }
})()