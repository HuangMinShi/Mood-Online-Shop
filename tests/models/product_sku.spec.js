process.env.NODE_ENV = 'test'

const { Product_sku } = require('../../models')
const ProductSkuModel = require('../../models/product_sku')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'sku',
  'retail_price',
  'sale_price',
  'cost',
  'stock',
  'productId'
]
const associations = [
  ['belongsTo', 'Product'],
  ['hasMany', 'Product_sku_attribute'],
  ['belongsToMany', 'User'],
  ['belongsToMany', 'Order']
]

describe('# Product_sku Model', () => {
  compareModelName(ProductSkuModel, 'Product_sku')
  checkModelProperties(ProductSkuModel, properties)
  checkModelAssociations(ProductSkuModel, associations)
  checkModelCRUD(Product_sku)
})