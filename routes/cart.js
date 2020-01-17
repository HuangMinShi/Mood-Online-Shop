const express = require('express')
const router = express.Router()

const vaildateInput = require('../middlewares/validator').vaildateInput
const cartController = require('../controllers/cartController')

router.get('/',
  cartController.getCart
)

router.post('/',
  vaildateInput,
  cartController.postCart
)

module.exports = router