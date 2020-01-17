const {
  Cart,
  ProductSku,
  CartProductSku
} = require('../models')

const generateSku = require('../libs/generateSku').generateSku

const cartController = {
  getCart: (req, res) => {
    return res.send('GET cart')
  },

  postCart: async (req, res) => {
    try {
      // 依據 input 的商品資料轉成 sku
      const sku = generateSku(req.body)
      let reqSessionCartId = req.session.cartId || 0

      // 尋找購物車，若無則建立新購物車
      const [cart, isCreated] = await Cart.findOrCreate({
        where: {
          id: reqSessionCartId
        }
      })

      // 若購物車為新建立，則利用 session 儲存該訪客購物車
      reqSessionCartId = isCreated ? cart.id : reqSessionCartId

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
  }
}

module.exports = cartController