process.env.NODE_ENV = 'test'

const { Cart_product_sku } = require('../../models')
const CartProductSkuModel = require('../../models/car_product_sku')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'quantity',
  'userId',
  'product_skuId'
]

describe('# cart_product_sku Model', () => {
  compareModelName(CartProductSkuModel, 'Cart_product_sku')
  checkModelProperties(CartProductSkuModel, properties)
  checkModelCRUD(Cart_product_sku)
})