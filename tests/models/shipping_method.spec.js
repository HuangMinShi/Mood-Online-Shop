process.env.NODE_ENV = 'test'

const { Shipping_method } = require('../../models')
const ShippingMethodModel = require('../../models/shipping_method')

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

describe('# Shipping_method Model', () => {
  compareModelName(ShippingMethodModel, 'Shipping_method')
  checkModelProperties(ShippingMethodModel, properties)
  checkModelAssociations(ShippingMethodModel, associations)
  checkModelCRUD(Shipping_method)
})