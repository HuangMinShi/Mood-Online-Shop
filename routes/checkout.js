const router = require('express').Router()

const { vaildateInput } = require('../middlewares/validator')
const checkoutController = require('../controllers/checkoutController')

// 配送確認
router.get('/shipping', checkoutController.getShipping)
router.post('/shipping', vaildateInput, checkoutController.postShipping)

// 付款確認
router.get('/payment', checkoutController.getPayment)
router.post('/payment', vaildateInput, checkoutController.postPayment)

// 訂單確認
router.get('/order', checkoutController.getOrder)

module.exports = router