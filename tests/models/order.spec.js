process.env.NODE_ENV = 'test'

const { Order } = require('../../models')
const OrderModel = require('../../models/order')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

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
  'userId',
  'shippingMethodId'
]
const associations = [
  ['belongsToMany', 'ProductSku'],
  ['belongsTo', 'User'],
  ['hasMany', 'PaymentLog'],
  ['belongsTo', 'ShippingMethod']
]

describe('# Order Model', () => {
  compareModelName(OrderModel, 'Order')
  checkModelProperties(OrderModel, properties)
  checkModelAssociations(OrderModel, associations)
  checkModelCRUD(Order)
})