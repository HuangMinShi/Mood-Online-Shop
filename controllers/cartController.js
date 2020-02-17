const {
  Cart,
  ProductSku,
  CartProductSku
} = require('../models')

const { generateSKU } = require('../libs/products')
const { counties } = require('../config/geonames.json')
const { shippingMethods } = require('../config/business.json')

const cartService = require('../services/cartService')

const cartController = {
  getCart: async (req, res) => {
    try {

      return await cartService.getCart(req, res, (data) => {
        // 傳至確認頁
        req.flash('data', data)

        return res.render('cart', {
          ...data,
          counties,
          shippingMethods,
          page: 'cart'
        })
      })

    } catch (err) {
      return res.status(500).json(err.stack)
    }
  },

  postCart: async (req, res) => {
    req.session.cartId = 1
    try {
      // 依據 input 的商品資料轉成 sku
      const sku = generateSKU(req.body)

      // 尋找購物車，若無則建立新購物車
      const [cart, isCreated] = await Cart.findOrCreate({
        where: {
          id: req.session.cartId || 0
        }
      })

      /**
       * 若購物車為新建立，則利用 session 儲存該訪客購物車，
       * 不過試圖修改共享記憶體的內容，可能會產生 race condition，先關掉 rule 
       * */
      req.session.cartId = isCreated ? cart.id : req.session.cartId

      // 依據 sku 尋找商品項目的庫存量
      const productSku = await ProductSku.findOne({
        attributes: ['id', 'stock'],
        where: {
          sku: sku
        }
      })

      // 尋找購物車裡的商品項目，若無則建立該商品項目
      const [cartProductSku] = await CartProductSku.findOrCreate({
        where: {
          CartId: cart.id,
          ProductSkuId: productSku.id
        },
        default: {
          CartId: cart.id,
          ProductSkuId: productSku.id
        }
      })

      // 確認庫存數量 
      const currentPurchasedQuantity = cartProductSku.quantity || 0
      const customerWantPurchaseQuantity = Number(req.body.quantity)
      const totalPurchasedQuantity = currentPurchasedQuantity + customerWantPurchaseQuantity

      if (productSku.stock < totalPurchasedQuantity) {
        req.flash(
          'errorMessage',
          `很抱歉，該商品僅剩 ${productSku.stock} 件，您已購買 ${currentPurchasedQuantity} 件，請確認`
        )
        return res.redirect('back')
      }

      // 將購買數量寫入資料庫
      await cartProductSku.update({
        quantity: totalPurchasedQuantity
      })

      req.flash('successMessage', `${req.body.name} 成功加入購物車`)
      return res.redirect('back')

    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        req.flash('errorMessage', err.errors[0].message)
        return res.redirect('back')
      }
      return console.log(err)
    }
  },

  addCartItemQuantity: async (req, res) => {
    try {

      // 紀錄訪客估算運費資訊 && 重置 req.flash('data)
      req.flash('shippingInfo', req.body)
      req.flash('data')

      const cartItem = await CartProductSku.findOne({
        where: {
          id: req.params.id,
          CartId: req.session.cartId || 0
        },
        include: {
          model: ProductSku,
          attributes: ['stock']
        }
      })

      if (!cartItem) {
        req.flash('errorMessage', '未授權行為')
        return res.redirect('back')
      }

      // 確認庫存數量
      const expectedPurchaseQuantity = cartItem.quantity + 1
      if (cartItem.ProductSku.stock < expectedPurchaseQuantity) {
        req.flash(
          'errorMessage',
          `很抱歉，該商品僅剩 ${cartItem.ProductSku.stock} 件，您已購買 ${cartItem.quantity} 件，請確認`
        )
        return res.redirect('back')
      }

      await cartItem.update({
        quantity: expectedPurchaseQuantity
      })

      return res.redirect('back')

    } catch (err) {

      if (err.name === 'SequelizeValidationError') {
        req.flash('errorMessage', err.errors[0].message)
        return res.redirect('back')
      }

      return console.log(err)

    }
  },

  subCartItemQuantity: async (req, res) => {
    try {

      // 紀錄訪客估算運費資訊 && 重置 req.flash('data)
      req.flash('shippingInfo', req.body)
      req.flash('data')

      const cartItem = await CartProductSku.findOne({
        where: {
          id: req.params.id,
          CartId: req.session.cartId || 0
        }
      })

      if (!cartItem) {
        req.flash('errorMessage', '未授權行為')
        return res.redirect('back')
      }

      await cartItem.update({
        quantity: cartItem.quantity - 1
      })

      return res.redirect('back')

    } catch (err) {

      if (err.name === 'SequelizeValidationError') {
        req.flash('errorMessage', err.errors[0].message)
        return res.redirect('back')
      }

      return console.log(err)

    }
  },

  deleteCartItme: async (req, res) => {
    try {
      const cartItem = await CartProductSku.findOne({
        where: {
          id: req.params.id,
          CartId: req.session.cartId || 0
        }
      })

      if (!cartItem) {
        req.flash('errorMessage', '未授權行為')
        return res.redirect('back')
      }

      await cartItem.destroy()

      req.flash('successMessage', '成功刪除')
      return res.redirect('back')
    } catch (err) {
      return console.log(err)
    }
  }
}

module.exports = cartController