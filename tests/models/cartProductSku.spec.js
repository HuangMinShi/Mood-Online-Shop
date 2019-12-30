process.env.NODE_ENV = 'test'

const { CartProductSku } = require('../../models')
const CartProductSkuModel = require('../../models/cartProductSku')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'quantity',
  'userId',
  'productSkuId'
]

describe('# CartProductSku Model', () => {
  compareModelName(CartProductSkuModel, 'CartProductSku')
  checkModelProperties(CartProductSkuModel, properties)
  checkModelCRUD(CartProductSku)
})