process.env.NODE_ENV = 'test'

const { Image } = require('../../models')
const ImageModel = require('../../models/image')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'url',
  'productId'
]
const associations = [
  ['belongsTo', 'Product']
]

describe('# Image Model', () => {
  compareModelName(ImageModel, 'Image')
  checkModelProperties(ImageModel, properties)
  checkModelAssociations(ImageModel, associations)
  checkModelCRUD(Image)
})