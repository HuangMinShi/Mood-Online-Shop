process.env.NODE_ENV = 'test'

const { Category } = require('../../models')
const CategoryModel = require('../../models/category')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'mainCategory',
  'subCategory',
  'subSubCategory'
]
const associations = [
  ['hasMany', 'Product']
]

describe('# Category Model', () => {
  compareModelName(CategoryModel, 'Category')
  checkModelProperties(CategoryModel, properties)
  checkModelAssociations(CategoryModel, associations)
  checkModelCRUD(Category)
})