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

  getProduct: async (req, res) => {
    try {
      const sn = req.params.sn
      let productItems = await Product.findAll({
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

      productItems = productItems
        .map(item => ({
          id: item.id,
          sn: item.sn,
          name: item.name,
          salePrice: item.salePrice,
          colorImages: {
            [item.Color.type]: item.Color.url
          },
          productImages: {
            [item.Color.type]: item.Images.map(image => image.url)
          },
          productSizes: {
            [item.Color.type]: item.ProductSkus.map(productSku => productSku.size)
          }
        })).reduce((prev, curr) => {
          const len = prev.length
          const lastPrev = prev[len - 1] || {}
          lastPrev.sn = lastPrev.sn || ''

          if (lastPrev.sn === curr.sn) {
            Object.assign(lastPrev.productImages, curr.productImages)
            Object.assign(lastPrev.productSizes, curr.productSizes)
            Object.assign(lastPrev.colorImages, curr.colorImages)
          } else {
            prev.push(curr)
          }

          return prev
        }, [])

      return res.render('product', { ...productItems[0] })
      // return res.send(JSON.stringify(productItems))
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = productController

// const outputs = {
//   id:1,
//   sn:'0001'
//   name: "MEN'S BRTN CREW SWEATSHIRT",
//   salePrice: "2800",
//   productImages: {
//     'true_black': 'imgUrl',
//     'gray_heather': 'imgUrl'
//   },
//   colorImages: {
//     'true_black': 'colorUrl',
//     'gray_heather': 'colorUrl'
//   },
// }

// const output = {
//   id:1,
//   sn:'0001',
//   name: "MEN'S BRTN CREW SWEATSHIRT",
//   salePrice: "2800"
//   productImages: {
//     'true_black': ['imgUrl-1','imgUrl-2','imgUrl-3','imgUrl-4','imgUrl-5']
//     'gray_heather': ['imgUrl-1','imgUrl-2','imgUrl-3','imgUrl-4','imgUrl-5']
//   },
//   productSizes: {
//     'true_black': ['S','M']
//     'gray_heather': ['XS','S','M','L']
//   },
//   colorImages: {
//     'true_black': 'colorUrl',
//     'gray_heather': 'colorUrl'
//   }
// }