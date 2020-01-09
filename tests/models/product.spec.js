process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { Product } = require('../../models')
const ProductModel = require('../../models/product')

const name = 'Product'
const properties = [
  'sn',
  'name',
  'description',
  'retailPrice',
  'salePrice',
  'cost',
  'ColorId',
  'CategoryId',
]
const associations = [
  ['belongsTo', 'Category'],
  ['belongsTo', 'Color'],
  ['hasMany', 'Image'],
  ['hasMany', 'ProductSku']
]

describe('# Product Model', () => {
  compareModelName(ProductModel, name)
  checkModelProperties(ProductModel, properties)
  checkModelAssociations(ProductModel, associations)
  checkModelCRUD(Product)
})