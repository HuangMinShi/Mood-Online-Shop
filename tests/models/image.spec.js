process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { Image } = require('../../models')
const ImageModel = require('../../models/image')

const name = 'Image'
const properties = [
  'url',
  'isMain',
  'ProductId'
]
const associations = [
  ['belongsTo', 'Product']
]

describe('# Image Model', () => {
  compareModelName(ImageModel, name)
  checkModelProperties(ImageModel, properties)
  checkModelAssociations(ImageModel, associations)
  checkModelCRUD(Image)
})