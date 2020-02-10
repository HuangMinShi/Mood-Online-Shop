(function () {
  /************* Products 頁面 *************/
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

  /************* Product 頁面 *************/

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





  /************* cart 頁面 *************/
  $('.cart .info').change(function (event) {
    const target = event.target
    const value = target.value

    if ($(target).is('#receiveCountry')) {
      $('.quantity-change input[name="receiveCountry"]').attr('value', value)
    }

    if ($(target).is('#county')) {
      $('.quantity-change input[name="county"]').attr('value', value)
    }

    if ($(target).is('#zip')) {
      $('.quantity-change input[name="zip"]').attr('value', value)
    }

    if ($(target).is('input[name="shippingWay"]')) {
      const productsAmount = $('.products-amount span:last').text()
      const shippingFee = $(this).find('input[name="shippingWay"]:checked + label span:last').text()
      const totalAmountInNum = formatCurrencyToNumber(productsAmount) + formatCurrencyToNumber(shippingFee)
      const totalAmount = formatNumberToCurrency(totalAmountInNum)

      $('.shipping-fee span:last').replaceWith(`<span>${shippingFee}</span>`)
      $('.total-amount span:last').replaceWith(`<span>${totalAmount}</span>`)

      // 增減數量 button 綁定
      $('.quantity-change input[name="shippingWay"]').attr('value', value)
    }
  })




  /************* checkout shipping *************/
  $('.shipping-methods').change(function () {
    const itemsAmount = $('.items.amount span:last').text()
    const shippingFee = $(this).find('input[name="shippingWay"]:checked + label span:last').text()
    const totalAmountInNum = formatCurrencyToNumber(itemsAmount) + formatCurrencyToNumber(shippingFee)
    const totalAmount = formatNumberToCurrency(totalAmountInNum)

    $('.shipping-fee span:last').replaceWith(`<span>${shippingFee}</span>`)
    $('.total span:last').replaceWith(`<span>${totalAmount}</span>`)
  })





  /************* Functions *************/

  /** products **/
  function switchProductMainImage(productSn, colorOption) {
    $(`.product-${productSn} .product-img`).find('.selected').removeClass('selected')
    $(`.product-${productSn} .product-img`).find(`.color-option-${colorOption}`).addClass('selected')
  }

  /** product **/
  function toSelectDefaultColor() {

    // 預設選取第一組 color
    $('.color-option .color-img-wrapper').first().addClass('selected')
    const defaultColor = $('.color-option img').first().addClass('selected').attr('data-option')

    // 依據 color 選取 size
    $(`.size-option div[class~=color-${defaultColor}]`).addClass('selected')

    // 依據 color 選取 gallery
    $(`.gallery span[class~=color-${defaultColor}]`).each(function () {
      $(this).addClass('selected').children().first().addClass('selected')
    })
    // 依據 color 輸入 value
    $('input[name=color]').attr('value', defaultColor)

  }

  function switchColorTo(color, colorEventTarget) {
    $('.color-option .color-img-wrapper.selected').removeClass('selected')
    $('.color-option img.selected').removeClass('selected')
    $(colorEventTarget).addClass('selected').parent().addClass('selected')
    $('input[name=color]').attr('value', color)
  }

  function switchSizeTo(size, sizeEventTarget) {
    $('.size-option button.selected').removeClass('selected')
    $(sizeEventTarget).addClass('selected')
    $('input[name=size]').attr('value', size)
  }

  function switchGalleryBlockTo(color) {

    // 移除組圖以及該張圖片
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

  function clacQtyWith(operator) {
    let quantity = $('.quantity').attr('value')

    switch (operator) {
      case '+':
        quantity = (quantity < 3) ? ++quantity : 3
        break
      case '-':
        quantity = (quantity > 1) ? --quantity : 1
        break
    }

    $('.quantity').attr('value', quantity)
  }

  function formatNumberToCurrency(price) {
    const currency = price.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    const formatedPrice = currency.replace(/[^0-9-.,]+/g, '');
    return 'NT$ ' + formatedPrice.split('.', 1)[0]
  }

  function formatCurrencyToNumber(currency) {
    return Number(currency.replace(/[^0-9.-]+/g, ''))
  }

})()