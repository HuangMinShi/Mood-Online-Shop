const cartRepository = require('../repositories/cartRepository')

const getCartItemQty = async (req, res, next) => {
  try {

    const cartId = req.session.cartId
    let itemQty = cartId ? await cartRepository.sumCartProductSkuQty({ CartId: cartId }) : 0

    res.locals.itemQty = itemQty || 0
    next()

  } catch (err) {
    return res.status(500).json(err.stack)
  }
}

module.exports = getCartItemQty