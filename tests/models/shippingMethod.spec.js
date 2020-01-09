process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { ShippingMethod } = require('../../models')
const ShippingMethodModel = require('../../models/shippingMethod')

const name = 'ShippingMethod'
const properties = [
  'name',
  'fee'
]
const associations = [
  ['hasMany', 'Order']
]

describe('# ShippingMethod Model', () => {
  compareModelName(ShippingMethodModel, name)
  checkModelProperties(ShippingMethodModel, properties)
  checkModelAssociations(ShippingMethodModel, associations)
  checkModelCRUD(ShippingMethod)
})