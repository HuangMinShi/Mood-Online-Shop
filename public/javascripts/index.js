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





  /************* cart 頁面 *************/
  $('.cart .info').change(function (event) {
    const target = event.target
    const value = target.value

    if ($(target).is('#country')) {
      $('.quantity-change input[name="country"]').attr('value', value)
    }

    if ($(target).is('#county')) {
      $('.quantity-change input[name="county"]').attr('value', value)
    }

    if ($(target).is('#postal')) {
      $('.quantity-change input[name="postal"]').attr('value', value)
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