process.env.NODE_ENV = 'test'

const { ShippingMethod } = require('../../models')
const ShippingMethodModel = require('../../models/shippingMethod')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'name',
  'fee'
]
const associations = [
  ['hasMany', 'Order']
]

describe('# ShippingMethod Model', () => {
  compareModelName(ShippingMethodModel, 'ShippingMethod')
  checkModelProperties(ShippingMethodModel, properties)
  checkModelAssociations(ShippingMethodModel, associations)
  checkModelCRUD(ShippingMethod)
})