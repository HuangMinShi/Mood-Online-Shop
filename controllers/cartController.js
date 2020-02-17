const {
  ProductSku,
  CartProductSku
} = require('../models')

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
    try {

      return await cartService.postCart(req, res, (data) => {
        if (data.status === 'failure') {
          req.flash('errorMessage', data.message)
          return res.redirect('back')
        }

        req.flash('successMessage', data.message)
        return res.redirect('back')
      })

    } catch (err) {
      return res.status(500).json(err.stack)
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