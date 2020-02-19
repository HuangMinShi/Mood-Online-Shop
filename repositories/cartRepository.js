const {
  Cart,
  Color,
  Image,
  Product,
  ProductSku,
  CartProductSku
} = require('../models')

const cartRepository = {
  getCart: async (id) => {
    try {

      // 查詢 Carts JOIN CartProductSkus and ProductSkus
      let cart = await Cart.findByPk(+id, { include: 'cartItems' })
      cart = cart || { cartItems: [] }

      return cart

    } catch (err) {
      return console.log(err)
    }
  },

  getProducts: async (query) => {
    try {

      // 查詢購物車裡 Products JOIN Color and Image 
      const products = await Product.findAll({
        attributes: ['id', 'sn', 'name', 'salePrice'],
        where: query,
        include: [
          {
            model: Color,
            attributes: ['type']
          },
          {
            model: Image,
            attributes: ['url'],
            where: { isMain: true }
          }
        ]
      })

      return products

    } catch (err) {
      return console.log(err)
    }
  },

  getOrCreateCart: async (query) => {
    try {

      return await Cart.findOrCreate({ where: query })

    } catch (err) {
      return console.log(err)
    }
  },

  getProductSku: async (query) => {
    try {

      return await ProductSku.findOne({
        attributes: ['id', 'stock'],
        where: query
      })

    } catch (err) {
      return console.log(err)
    }
  },

  getOrCreateCartProductSku: async (query) => {
    try {

      const [cartProductSku] = await CartProductSku.findOrCreate({
        where: query,
        defaults: query
      })

      return cartProductSku

    } catch (err) {
      return console.log(err)
    }
  },

  updateCartProductSku: async (cartProductSku, query) => {
    return await cartProductSku.update(query)
  },

  sumCartProductSkuQty: async (query) => {
    return await CartProductSku.sum('quantity', { where: query })
  }
}

module.exports = cartRepository