process.env.NODE_ENV = 'test'

const { Product_sku_attribute } = require('../../models')
const ProductSkuAttributeModel = require('../../models/product_sku_attribute')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'attribute',
  'value',
  'product_skuId'
]
const associations = [
  ['belongsTo', 'Product_sku']
]

describe('# product_sku_attribute Model', () => {
  compareModelName(ProductSkuAttributeModel, 'Product_sku_attribute')
  checkModelProperties(ProductSkuAttributeModel, properties)
  checkModelAssociations(ProductSkuAttributeModel, associations)
  checkModelCRUD(Product_sku_attribute)
})