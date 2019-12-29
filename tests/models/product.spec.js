process.env.NODE_ENV = 'test'

const { Product } = require('../../models')
const ProductModel = require('../../models/product')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'name',
  'description',
  'categoryId',
]
const associations = [
  ['belongsTo', 'Category'],
  ['hasMany', 'Image'],
  ['hasMany', 'Product_sku']
]

describe('# Category Model', () => {
  compareModelName(ProductModel, 'Product')
  checkModelProperties(ProductModel, properties)
  checkModelAssociations(ProductModel, associations)
  checkModelCRUD(Product)
})