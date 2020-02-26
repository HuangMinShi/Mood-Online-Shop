process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { Color } = require('../../models')
const ColorModel = require('../../models/color')

const name = 'Color'
const properties = [
  'type',
  'url'
]
const associations = [
  ['hasMany', 'Product']
]

describe('# Color Model', () => {
  compareModelName(ColorModel, name)
  checkModelProperties(ColorModel, properties)
  checkModelAssociations(ColorModel, associations)
  checkModelCRUD(Color)
})