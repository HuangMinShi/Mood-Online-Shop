process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { Category } = require('../../models')
const CategoryModel = require('../../models/category')

const name = 'Category'
const properties = [
  'mainCategory',
  'subCategory',
  'subSubCategory'
]
const associations = [
  ['hasMany', 'Product']
]

describe('# Category Model', () => {
  compareModelName(CategoryModel, name)
  checkModelProperties(CategoryModel, properties)
  checkModelAssociations(CategoryModel, associations)
  checkModelCRUD(Category)
})