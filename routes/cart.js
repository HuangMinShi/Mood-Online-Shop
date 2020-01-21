const express = require('express')
const router = express.Router()

const vaildateInput = require('../middlewares/validator').vaildateInput
const cartController = require('../controllers/cartController')

router.get('/', cartController.getCart)

router.post('/',
  vaildateInput,
  cartController.postCart
)

router.post('/cartItems/:id/add', cartController.addCartItemQuantity)
router.post('/cartItems/:id/sub', cartController.subCartItemQuantity)
router.delete('/cartItems/:id', cartController.deleteCartItme)

module.exports = router