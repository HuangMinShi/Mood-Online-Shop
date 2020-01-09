const {
  Product,
  Color,
  Image,
  ProductSku,
  Sequelize
} = require('../models')

const { gt } = Sequelize.Op

const productController = {
  getProducts: async (req, res) => {

    try {
      let products = await Product.findAll({
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

      products = products
        .map(product => ({
          id: product.id,
          sn: product.sn,
          name: product.name,
          salePrice: product.salePrice,
          colorImages: {
            [product.Color.type]: product.Color.url
          },
          productImages: {
            [product.Color.type]: product.Images[0].url
          }
        }))
        .reduce((prev, curr) => {
          const len = prev.length
          const lastPrev = prev[len - 1] || {}
          lastPrev.sn = lastPrev.sn || ''

          if (lastPrev.sn === curr.sn) {
            Object.assign(lastPrev.colorImages, curr.colorImages)
            Object.assign(lastPrev.productImages, curr.productImages)
          } else {
            prev.push(curr)
          }

          return prev
        }, [])

      return res.render('products', { products })
      // return res.send(`${JSON.stringify(products)}`)
    } catch (err) {
      console.log(err)
    }
  },

  getProduct: (req, res) => {

  }
}

module.exports = productController

// const output = {
//   id:1,
//   sku:'0001'
//   name: "MEN'S BRTN CREW SWEATSHIRT",
//   salePrice: "2800",
//   productImages: {
//     'true_black': 'imgUrl',
//     'gray_heather': 'imgUrl'
//   },
//   colorImages: {
//     'true_black': 'colorUrl',
//     'gray_heather': 'colorUrl'
//   }
// }