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

  getProducts: async (whereQuery) => {
    try {

      // 查詢購物車裡 Products JOIN Color and Image 
      const products = await Product.findAll({
        attributes: ['id', 'sn', 'name', 'salePrice'],
        where: whereQuery,
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
  }
}

module.exports = cartRepository