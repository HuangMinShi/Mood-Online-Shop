const router = require('express').Router()
const orderController = require('../controllers/orderController')

// 訂單
router.get('/', orderController.getOrders)
router.post('/', orderController.postOrder)
router.get('/success', orderController.getSuccessOrder)

// 查看單一訂單
router.get('/:id', orderController.getOrder)

// 金流
router.get('/:id/payment', orderController.getPayment)
router.post('/newebpay/callback', orderController.newebpayCallback)

module.exports = router