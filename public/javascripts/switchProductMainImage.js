
// Select every products which first main imgs and add class '.selected'
$('[class=product-imgs] img:first-child').each((index, item) => {
  $(item).addClass('selected')
})

$('#data-panel').click((event) => {
  if (event.target.matches('.color-option')) {
    const productSn = event.target.dataset.productSn
    const colorOption = event.target.dataset.colorOption
    switchProductMainImage(productSn, colorOption)
  }
})

function switchProductMainImage(productSn, colorOption) {
  $(`.product-${productSn} .product-imgs`).find('.selected').removeClass('selected')
  $(`.product-${productSn} .product-imgs`).find(`.color-option-${colorOption}`).addClass('selected')
}