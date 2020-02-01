const express = require('express')
const router = express.Router()

const { vaildateInput } = require('../middlewares/validator')
const orderController = require('../controllers/orderController')

router.get('/', orderController.getOrders)
router.get('/checkout/shipping', orderController.getCheckoutShipping)

router.post('/checkout/shipping',
  vaildateInput,
  orderController.postCheckoutShipping
)

router.get('/checkout/payment', orderController.getCheckoutPayment)

router.post('/', orderController.postOrder)
router.get('/:id', orderController.getOrder)
router.post('/:id/cancel', orderController.cancelOrder)
router.get('/:id/payment', orderController.getPayment)

module.exports = router