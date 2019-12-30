process.env.NODE_ENV = 'test'

const { ProductSkuAttribute } = require('../../models')
const ProductSkuAttributeModel = require('../../models/productSkuAttribute')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'attribute',
  'value',
  'productSkuId'
]
const associations = [
  ['belongsTo', 'ProductSku']
]

describe('# ProductSkuAttribute Model', () => {
  compareModelName(ProductSkuAttributeModel, 'ProductSkuAttribute')
  checkModelProperties(ProductSkuAttributeModel, properties)
  checkModelAssociations(ProductSkuAttributeModel, associations)
  checkModelCRUD(ProductSkuAttribute)
})