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
  ['hasMany', 'ProductSku']
]

describe('# Product Model', () => {
  compareModelName(ProductModel, 'Product')
  checkModelProperties(ProductModel, properties)
  checkModelAssociations(ProductModel, associations)
  checkModelCRUD(Product)
})