const {
  Cart,
  Color,
  Image,
  Product,
  ProductSku,
  CartProductSku
} = require('../models')

const generateSku = require('../libs/generateSku').generateSku

const cartController = {
  getCart: async (req, res) => {
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

      // 先查詢 Carts JOIN CartProductSkus 及 ProductSkus
      let cart = await Cart.findByPk(req.session.cartId, {
        include: 'cartItems'
      })
      cart = cart || { cartItems: [] }

      // 整理 Carts 查詢後資料
      let cartItems = cart.cartItems.map(item => ({
        size: item.size,
        ProductId: item.ProductId,
        CartProductSkuId: item.CartProductSku.id,
        quantity: item.CartProductSku.quantity,
      }))


      // 再查詢 Products JOIN Color 及 Image
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

      // 上述查詢做資料合併
      cartItems = cartItems.map(item => {
        const product = products.find(product => product.id === item.ProductId)
        return {
          ...item,
          sn: product.sn,
          name: product.name,
          salePrice: Number(product.salePrice),
          color: product.Color.type.split('_').join(' ').toUpperCase(),
          image: product.Images[0].url,
          subTotalAmount: Number(product.salePrice) * Number(item.quantity)
        }
      })

      const totalAmount = cartItems.length ? cartItems.map(item => item.subTotalAmount).reduce((a, c) => a + c) : 0

      return res.render('cart', { cartItems, totalAmount })
    } catch (err) {
      console.log(err)
    }
  },

  postCart: async (req, res) => {
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

      // 若購買數量超過庫存跳出警告
      cartProductSku.quantity = cartProductSku.quantity || 0
      const purchaseQuantity = Number(req.body.quantity)
      const totalPurchaseQuantity = cartProductSku.quantity + purchaseQuantity

      if (productSku.stock < totalPurchaseQuantity) {
        req.flash(
          'errorMessage',
          `庫存 ${productSku.stock} 件，
          已購 ${cartProductSku.quantity} 件，
          欲購 ${purchaseQuantity} 件，庫存不足請確認`
        )

        return res.redirect('back')
      }

      // 將購買數量寫入資料庫
      await cartProductSku.update({
        quantity: totalPurchaseQuantity
      })

      req.flash('successMessage', `${req.body.name} 成功加入購物車`)
      return res.redirect('back')

    } catch (err) {
      console.log(err);
    }
  },

  addCartItemQuantity: async (req, res) => {
    try {
      const cartItem = await CartProductSku.findOne({
        where: {
          id: req.params.id,
          CartId: req.session.cartId || 0
        }
      })

      if (!cartItem) {
        req.flash('errorMessage', '未授權行為')
        return res.redirect('/products')
      }

      await cartItem.increment('quantity')

      return res.redirect('back')
    } catch (err) {
      console.log(err)
    }
  },

  subCartItemQuantity: async (req, res) => {
    try {
      const cartItem = await CartProductSku.findOne({
        where: {
          id: req.params.id,
          CartId: req.session.cartId || 0
        }
      })

      if (!cartItem) {
        req.flash('errorMessage', '未授權行為')
        return res.redirect('/products')
      }

      await cartItem.decrement('quantity')

      return res.redirect('back')
    } catch (err) {
      console.log(err)
    }
  },

  deleteCartItme: (req, res) => {
    return res.send('deleteCartItme')
  }
}

module.exports = cartController