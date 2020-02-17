const {
  getProduct,
  getProducts
} = require('../services/productService')

const productController = {
  getProducts: async (req, res) => {
    try {

      return await getProducts(req, res, (data) => {
        return res.render('products', {
          products: data,
          page: 'products'
        })
      })

    } catch (err) {
      return res.status(500).json(err.stack)
    }
  },

  getProduct: async (req, res) => {
    try {

      return await getProduct(req, res, (data) => {
        return res.render('product', {
          productItem: data,
          page: 'product'
        })
      })

    } catch (err) {
      return res.status(500).json(err.stack)
    }
  }
}

module.exports = productController