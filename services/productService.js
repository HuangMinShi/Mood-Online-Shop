const {
  getProduct,
  getProducts
} = require('../repositories/productRepository')

const productService = {
  getProducts: async (req, res, cb) => {
    try {
      let products = await getProducts()

      // 整理資料後再合併 sn 一樣的商品
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

      // 為了同時後端 render 及 API 所以用 callback 形式
      return cb(products)

    } catch (err) {
      return res.status(500).json(err.stack)
    }
  },

  getProduct: async (req, res, cb) => {
    try {
      const productItems = await getProduct(req.params.sn)

      const productItem = productItems
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
        }))
        .reduce((prev, curr) => {
          Object.assign(prev.productImages, curr.productImages)
          Object.assign(prev.productSizes, curr.productSizes)
          Object.assign(prev.colorImages, curr.colorImages)

          return prev
        })

      return cb(productItem)

    } catch (err) {
      return res.status(500).json(err.stack)
    }
  }
}

module.exports = productService