process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { CartProductSku } = require('../../models')
const CartProductSkuModel = require('../../models/cartProductSku')

const name = 'CartProductSku'
const properties = [
  'quantity',
  'CartId',
  'ProductSkuId'
]
const associations = [
  ['belongsTo', 'Cart']
]

describe('# CartProductSku Model', () => {
  compareModelName(CartProductSkuModel, name)
  checkModelProperties(CartProductSkuModel, properties)
  checkModelAssociations(CartProductSkuModel, associations)
  checkModelCRUD(CartProductSku)
})