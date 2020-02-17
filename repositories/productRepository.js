const {
  Color,
  Image,
  Product,
  Sequelize,
  ProductSku
} = require('../models')

const { gt } = Sequelize.Op

const productRepository = {
  getProducts: async () => {
    try {

      return await Product.findAll({
        attributes: ['id', 'sn', 'name', 'salePrice'],
        include: [
          {
            model: Color,
            attributes: ['id', 'type', 'url']
          },
          {
            model: Image,
            attributes: ['id', 'url'],
            where: { isMain: true }
          },
          {
            model: ProductSku,
            attributes: ['stock'],
            where: {
              stock: {
                [gt]: 0
              }
            }
          }
        ]
      })

    } catch (err) {
      return console.log(err)
    }
  },

  getProduct: async (sn) => {
    try {

      return await Product.findAll({
        where: { sn: sn },
        attributes: ['id', 'sn', 'name', 'salePrice'],
        include: [
          {
            model: Color,
            attributes: ['id', 'type', 'url']
          },
          {
            model: Image,
            attributes: ['id', 'url']
          },
          {
            model: ProductSku,
            attributes: ['sku', 'size', 'stock'],
            where: {
              stock: {
                [gt]: 0
              }
            }
          }
        ]
      })

    } catch (err) {
      return console.log(err)
    }
  }
}
module.exports = productRepository