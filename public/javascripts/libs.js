/** Products **/
function switchProductMainImage(productSn, colorOption) {
  $(`.product-${productSn} .product-img`).find('.selected').removeClass('selected')
  $(`.product-${productSn} .product-img`).find(`.color-option-${colorOption}`).addClass('selected')
}

/** Product **/
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

/** Cart and Checkout **/
function formatToCurrency(price) {
  const currency = price.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
  const formatedPrice = currency.replace(/[^0-9-.,]+/g, '');
  return 'NT$ ' + formatedPrice.split('.', 1)[0]
}

function formatToNum(currency) {
  return Number(currency.replace(/[^0-9.-]+/g, ''))
}

function addShippingFeeAndDisplayTotalAmount(target) {
  const itemsAmount = $('.items.amount span:last').text()
  const shippingFee = $(target).find('input[name="shippingWay"]:checked + label span').eq(1).text()

  const totalAmountInNum = formatToNum(itemsAmount) + formatToNum(shippingFee)
  const totalAmount = formatToCurrency(totalAmountInNum)

  $('.shipping-fee.amount span:last').replaceWith(`<span>${shippingFee}</span>`)
  $('.total.amount span:last').replaceWith(`<span>${totalAmount}</span>`)
}

function displayPickStores() {
  if ($('#inStorePickup').is(':checked')) {
    $('.store').addClass('show')
  }

  if ($('#directDelivery').is(':checked')) {
    $('.store').removeClass('show').find('option:selected').prop('selected', false)
  }
}

export {
  clacQtyWith,
  formatToNum,
  switchSizeTo,
  switchColorTo,
  formatToCurrency,
  displayPickStores,
  switchSizeBlockTo,
  toSelectDefaultColor,
  switchGalleryBlockTo,
  switchProductMainImage,
  switchGalleryMainImageTo,
  addShippingFeeAndDisplayTotalAmount,
}