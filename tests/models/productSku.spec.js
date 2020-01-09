process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { ProductSku } = require('../../models')
const ProductSkuModel = require('../../models/productSku')

const name = 'ProductSku'
const properties = [
  'sku',
  'stock',
  'size',
  'ProductId'
]
const associations = [
  ['belongsTo', 'Product'],
  ['belongsToMany', 'Cart'],
  ['belongsToMany', 'Order']
]

describe('# ProductSku Model', () => {
  compareModelName(ProductSkuModel, name)
  checkModelProperties(ProductSkuModel, properties)
  checkModelAssociations(ProductSkuModel, associations)
  checkModelCRUD(ProductSku)
})