const { getShippingFee } = require('../libs/utils')

const cartRepository = require('../repositories/cartRepository')

const cartService = {
  getCart: async (req, res, cb) => {

    // 先固定 req.session.cartId 方便測試
    req.session.cartId = 1

    try {
      let { cart, products } = await cartRepository.getCart(req.session.cartId)

      // 整理 cart
      let cartItems = cart.cartItems.map(item => ({
        sku: item.sku,
        size: item.size,
        ProductId: item.ProductId,
        CartProductSkuId: item.CartProductSku.id,
        quantity: item.CartProductSku.quantity,
      }))

      // 合併 cart and products
      cartItems = cartItems.map(item => {
        const product = products.find(product => product.id === item.ProductId)

        return {
          ...item,
          sn: product.sn,
          name: product.name,
          image: product.Images[0].url,
          color: product.Color.type.split('_').join(' ').toUpperCase(),
          salePrice: +product.salePrice,
          itemTotal: +product.salePrice * +item.quantity
        }
      })

      // 計算運費及總金額
      const shippingInfo = req.flash('shippingInfo')[0] || { shippingWay: 'inStorePickup' }
      const shippingFee = getShippingFee(shippingInfo.shippingWay)
      const subTotal = cartItems.length ? cartItems.map(item => item.itemTotal).reduce((a, c) => a + c) : 0
      const totalAmount = subTotal + shippingFee

      const data = {
        ...shippingInfo,
        totalAmount,
        shippingFee,
        cartItems,
        subTotal
      }

      return cb(data)

    } catch (err) {
      return res.status(500).json(err.stack)
    }
  },
}

module.exports = cartService