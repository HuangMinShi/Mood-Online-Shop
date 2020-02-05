const {
  Cart,
  Color,
  Image,
  Product,
  ProductSku,
  CartProductSku
} = require('../models')

const { getShippingFee } = require('../libs/utils')
const { generateSku } = require('../libs/generateSku')
const { counties } = require('../config/geonames.json')
const { shippingMethods } = require('../config/business.json')

const cartController = {
  getCart: async (req, res) => {
    req.session.cartId = 1
    try {

      /**
       * 查詢預先載入 Cart => ProductSku => Product => Color,Image 是一種方式
       * 但資料包裹太多層不利維護，因此拆出分段資料整理。另外 Color 可以反正規化進入 Product
       * 不用多合併一張表，減少效能。
       * */

      /** expect output:
       * cartItem = {
       *  mainImage: 'https://www.example.com'  // Image
       *  name: 'FONTAWESOME T-SHIRT'           // Product
       *  color: 'true_black'                   // Color
       *  size: 'S                              // ProductSku
       *  salePrice: 2450                       // Product
       *  quantity: 1                           // CartProductSku
       * }
       */

      // 查詢 Carts JOIN CartProductSkus and ProductSkus
      let cart = await Cart.findByPk(req.session.cartId, {
        include: 'cartItems'
      })
      cart = cart || { cartItems: [] }

      // 整理
      let cartItems = cart.cartItems.map(item => ({
        sku: item.sku,
        size: item.size,
        ProductId: item.ProductId,
        CartProductSkuId: item.CartProductSku.id,
        quantity: item.CartProductSku.quantity,
      }))

      // 查詢 Products JOIN Color and Image
      const products = await Product.findAll({
        attributes: ['id', 'sn', 'name', 'salePrice'],
        where: {
          id: cartItems.map(item => item.ProductId)
        },
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

      // 合併
      cartItems = cartItems.map(item => {
        const product = products.find(product => product.id === item.ProductId)

        return {
          ...item,
          sn: product.sn,
          name: product.name,
          image: product.Images[0].url,
          color: product.Color.type.split('_').join(' ').toUpperCase(),
          salePrice: Number(product.salePrice),
          itemTotal: Number(product.salePrice) * Number(item.quantity)
        }
      })

      // 計算運費及總金額
      const shippingInfo = req.flash('shippingInfo')[0] || { shippingWay: 'inStorePickup' }
      const shippingFee = getShippingFee(shippingInfo.shippingWay)
      const subTotal = cartItems.length ? cartItems.map(item => item.itemTotal).reduce((a, c) => a + c) : 0
      const totalAmount = subTotal + shippingFee

      const data = {
        ...shippingInfo,
        cartItems,
        subTotal
      }

      const renderParams = {
        ...data,
        shippingFee,
        totalAmount,
        counties,
        shippingMethods
      }

      // 傳至確認頁
      req.flash('data', data)

      return res.render('cart', renderParams)

    } catch (err) {
      console.log(err)
    }
  },

  postCart: async (req, res) => {
    req.session.cartId = 1
    try {
      // 依據 input 的商品資料轉成 sku
      const sku = generateSku(req.body)

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