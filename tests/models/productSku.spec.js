process.env.NODE_ENV = 'test'

const { ProductSku } = require('../../models')
const ProductSkuModel = require('../../models/productSku')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'sku',
  'retailPrice',
  'salePrice',
  'cost',
  'stock',
  'productId'
]
const associations = [
  ['belongsTo', 'Product'],
  ['hasMany', 'ProductSkuAttribute'],
  ['belongsToMany', 'User'],
  ['belongsToMany', 'Order']
]

describe('# ProductSku Model', () => {
  compareModelName(ProductSkuModel, 'ProductSku')
  checkModelProperties(ProductSkuModel, properties)
  checkModelAssociations(ProductSkuModel, associations)
  checkModelCRUD(ProductSku)
})