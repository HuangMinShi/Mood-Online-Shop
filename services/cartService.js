const cartRepository = require('../repositories/cartRepository')

const { getShippingFee } = require('../libs/utils')
const { generateSKU } = require('../libs/products')

const cartService = {
  getCart: async (req, res, cb) => {

    // 先固定 req.session.cartId 方便測試
    req.session.cartId = 1

    try {

      // 找 cart 
      const cartId = req.session.cartId ? req.session.cartId : 0
      let cart = await cartRepository.getCart(cartId)

      // 整理 cart
      let cartItems = cart.cartItems.map(item => ({
        sku: item.sku,
        size: item.size,
        ProductId: item.ProductId,
        CartProductSkuId: item.CartProductSku.id,
        quantity: item.CartProductSku.quantity,
      }))

      // 找 products
      const query = {
        id: cartItems.map(item => item.ProductId)
      }

      const products = await cartRepository.getProducts(query)

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
        subTotal,
        itemsCount: cartItems.length
      }

      return cb(data)

    } catch (err) {
      return res.status(500).json(err.stack)
    }
  },

  postCart: async (req, res, cb) => {

    // 先固定 req.session.cartId 方便測試
    req.session.cartId = 1

    try {

      // 尋找購物車，若無則建立
      const queryCart = { id: req.session.cartId || 0 }
      const [cart, isCreated] = await cartRepository.getOrCreateCart(queryCart)

      // set session cartId
      req.session.cartId = isCreated ? cart.id : req.session.cartId

      // 依據 sku 尋找商品項目的庫存量
      const queryProductSku = {
        sku: generateSKU(req.body)
      }
      const productSku = await cartRepository.getProductSku(queryProductSku)

      // 尋找購物車裡的商品項目，若無則建立
      const queryCartProductSku = {
        CartId: cart.id,
        ProductSkuId: productSku.id
      }
      const cartProductSku = await cartRepository.getOrCreateCartProductSku(queryCartProductSku)

      // 確認庫存數量 
      const currentPurchasedQuantity = cartProductSku.quantity || 0
      const customerWantPurchaseQuantity = +req.body.quantity
      const totalPurchasedQuantity = currentPurchasedQuantity + customerWantPurchaseQuantity

      if (productSku.stock < totalPurchasedQuantity) {
        return cb({
          status: 'failure',
          message: `很抱歉，該商品剩 ${productSku.stock} 件，您已購買 ${currentPurchasedQuantity} 件，請確認`
        })
      }

      // 購買數量寫入資料庫
      const queryToUpdateCartProductSku = { quantity: totalPurchasedQuantity }
      await cartRepository.updateCartProductSku(cartProductSku, queryToUpdateCartProductSku)

      return cb({
        status: 'success',
        message: `${req.body.name} 成功加入購物車`
      })

    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return cb({
          status: 'failure',
          message: err.errors[0].message
        })
      }
      return res.status(500).json(err.stack)
    }
  }
}

module.exports = cartService