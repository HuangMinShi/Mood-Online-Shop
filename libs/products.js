const sizes = ['XS', 'S', 'M', 'L']

const generateSKU = (properties) => {
  const {
    size,
    color,
    productSn
  } = properties

  let sku = ''
  const seperatedColorWords = color.split('_').slice(0, 2)

  if (seperatedColorWords.length > 1) {
    sku += seperatedColorWords.map(str => str[0]).join('').toUpperCase()
  } else {
    sku += seperatedColorWords[0].substring(0, 2).toUpperCase()
  }

  sku += (sizes.findIndex(item => item === size) + 1).toString()
  sku += productSn.toString()

  return sku
}

module.exports = {
  generateSKU
}