const {
  Cart,
  Order,
  Color,
  Image,
  Product
} = require('../models')

const {
  formatDateToYYYYMMDD,
  formatNumberToCurrency,
  formatCurrencyToNumber,
  mapOrderStatusCodeToString
} = require('../libs/utils')

const counties = require('../public/counties.json').counties
const shippingMethods = require('../public/shippingMethods.json').shippingMethods

const orderController = {
  getOrders: async (req, res) => {

    /** expected output
     * 
     * orders = {
     *  sn: '456789987',
     *  createdAt: 2010/02/10,
     *  receiveAddress: '台北市中正區1號',
     *  amount: NT$ 2,980,
     *  status: '待付款'
     * }
     * 
     */

    let orders = await Order.findAll({
      where: {
        UserId: 1
      },
      attributes: ['id', 'sn', 'status', 'amount', 'receiveAddress', 'createdAt'],
      order: [['sn', 'ASC']]
    })

    orders = orders.map(order => {
      return {
        ...order.dataValues,
        createdAt: formatDateToYYYYMMDD(order.createdAt),
        amount: formatNumberToCurrency(order.amount),
        status: mapOrderStatusCodeToString(order.status)
      }
    })

    return res.render('orders', { orders })
  },

  getOrder: (req, res) => {
    return res.send('get order')
  },

  createOrder: async (req, res) => {
    req.session.cartId = 1
    const cartInfo = req.query
    const options = {
      name: '蔡易軒',
      township: '南投市',
      street: '埔里鎮民生路127號',
      tel: '0912387122'
    }

    // 找出購物車商品
    let cart = await Cart.findByPk(req.session.cartId, { include: 'cartItems' })

    // 資料整理
    let cartItems = cart.cartItems.map(item => ({
      size: item.size,
      ProductId: item.ProductId,
      CartProductSkuId: item.CartProductSku.id,
      quantity: item.CartProductSku.quantity,
    }))

    // 找出商品資訊
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

    // 購物車商品與商品資訊合併
    cartItems = cartItems.map(item => {
      const product = products.find(product => product.id === item.ProductId)

      return {
        ...item,
        sn: product.sn,
        name: product.name,
        image: product.Images[0].url,
        color: product.Color.type.split('_').join(' ').toUpperCase(),
        salePrice: formatNumberToCurrency(Number(product.salePrice)),
        itemTotal: formatNumberToCurrency(Number(product.salePrice) * Number(item.quantity))
      }
    })

    // 運費及價格
    const selectedShippingWay = shippingMethods[cartInfo.shipping] || []
    const len = selectedShippingWay.length
    const selectedShippingFee = selectedShippingWay[len - 1] || ''

    let subTotal = cartItems.length ? cartItems.map(item => formatCurrencyToNumber(item.itemTotal)).reduce((a, c) => a + c) : 0
    let total = subTotal + formatCurrencyToNumber(selectedShippingFee)
    subTotal = formatNumberToCurrency(subTotal)
    total = formatNumberToCurrency(total)

    return res.render('create', {
      ...options,
      ...cartInfo,
      cartItems,
      counties,
      shippingMethods,
      selectedShippingFee,
      subTotal,
      total
    })
  },

  postOrder: (req, res) => {
    return res.send('post order')
  },

  cancelOrder: (req, res) => {
    return res.send('cancel order')
  },

  getPayment: (req, res) => {
    return res.send('get payment')
  }
}

module.exports = orderController