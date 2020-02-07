const express = require('express')
const router = express.Router()

const { vaildateInput } = require('../middlewares/validator')
const orderController = require('../controllers/orderController')

// 瀏覽所有訂單
router.get('/', orderController.getOrders)

// 配送資訊
router.get('/checkout/shipping', orderController.getCheckoutShipping)
router.post('/checkout/shipping', vaildateInput, orderController.postCheckoutShipping)

// 付款資訊
router.get('/checkout/payment', orderController.getCheckoutPayment)
router.post('/checkout/payment', vaildateInput, orderController.postCheckoutPayment)

// 訂單確認
router.get('/checkout/order', orderController.getCheckoutOrder)
router.post('/', orderController.postOrder)

// 訂單成立
router.get('/success', orderController.getSuccessOrder)

// 單一訂單操作
router.get('/:id', orderController.getOrder)
router.post('/:id/cancel', orderController.cancelOrder)

// 金流
router.get('/:id/payment', orderController.getPayment)

module.exports = router