process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { Order } = require('../../models')
const OrderModel = require('../../models/order')

const name = 'Order'
const properties = [
  'sn',
  'status',
  'amount',
  'orderName',
  'orderAddress',
  'orderEmail',
  'orderPhone',
  'invoice',
  'note',
  'receiveName',
  'receiveAddress',
  'receiveEmail',
  'receivePhone',
  'UserId',
  'ShippingMethodId'
]
const associations = [
  ['belongsToMany', 'ProductSku'],
  ['belongsTo', 'User'],
  ['hasMany', 'PaymentLog'],
  ['belongsTo', 'ShippingMethod']
]

describe('# Order Model', () => {
  compareModelName(OrderModel, name)
  checkModelProperties(OrderModel, properties)
  checkModelAssociations(OrderModel, associations)
  checkModelCRUD(Order)
})