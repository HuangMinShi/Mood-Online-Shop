const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')

router.get('/', orderController.getOrders)
router.get('/create', orderController.createOrder)
router.post('/', orderController.postOrder)

router.get('/:id', orderController.getOrder)
router.post('/:id/cancel', orderController.cancelOrder)
router.get('/:id/payment', orderController.getPayment)

module.exports = router